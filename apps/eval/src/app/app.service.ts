import {spawn} from "child_process";
import * as fs from 'fs';
import * as path from 'path';

import {Injectable} from '@nestjs/common';
import {Client, ClientRedis, Transport} from "@nestjs/microservices";

const fsp = fs.promises;

const resourcesPath = process.env.RESOURCES_PATH;

@Injectable()
export class AppService {

  @Client({ transport: Transport.REDIS })
  redisClient: ClientRedis;

  constructor() {
  }

  async evalCode(solutionId: string, code: string, tests: string[], language: string) {
    const codePath = this.createCodeFile(code);
    let result = true;
    for (let i = 0; i < tests.length; i++) {
      result = await this.evalSolution(code, tests[i], language, codePath);
      if (!result) {
        break;
      }
    }
    this.redisClient.send('EVAL_RESULT', {
      result,
      solutionId
    });
    this.deleteCodeFile(codePath);
  }

  async evalSolution(code: string, testName: string, language: string, codePath: string): Promise<boolean> {

    const testInputPath = path.join(resourcesPath, testName + '.input');
    const testOutputPath = path.join(resourcesPath, testName + '.output');

    // toDo 08.05.21: this should change for use more than one language
    const python = spawn('python3', [codePath]);

    const streamInput = fs.createReadStream(testInputPath);
    streamInput.pipe(python.stdin);

    const tmpResultPath = path.join(resourcesPath, this.getRandomId() + '.output');
    const streamOutput = fs.createWriteStream(tmpResultPath);
    python.stdout.pipe(streamOutput);

    const equals = await this.compareFiles(testOutputPath, tmpResultPath);

    this.deleteCodeFile(tmpResultPath);

    return equals;
  }

  async compareFiles(file1: string, file2: string): Promise<boolean> {
    const kReadSize = 1024 * 8;
    let h1, h2;
    try {
      h1 = await fsp.open(file1, 'r');
      h2 = await fsp.open(file2, 'r');
      const [stat1, stat2] = await Promise.all([h1.stat(), h2.stat()]);
      if (stat1.size !== stat2.size) {
        return false;
      }
      const buf1 = Buffer.alloc(kReadSize);
      const buf2 = Buffer.alloc(kReadSize);
      let pos = 0;
      let remainingSize = stat1.size;
      while (remainingSize > 0) {
        let readSize = Math.min(kReadSize, remainingSize);
        let [r1, r2] = await Promise.all([h1.read(buf1, 0, readSize, pos), h2.read(buf2, 0, readSize, pos)]);
        if (r1.bytesRead !== readSize || r2.bytesRead !== readSize) {
          throw new Error("Failed to read desired number of bytes");
        }
        if (buf1.compare(buf2, 0, readSize, 0, readSize) !== 0) {
          return false;
        }
        remainingSize -= readSize;
        pos += readSize;
      }
      return true;
    } finally {
      if (h1) {
        await h1.close();
      }
      if (h2) {
        await h2.close();
      }
    }
    return false;
  }

  createCodeFile(code: string): string {
    const codeId = this.getRandomId();
    const codePath = path.join(resourcesPath, codeId + 'py');
    fs.writeFileSync(codePath, code);
    return codePath;
  }

  deleteCodeFile(codePath: string) {
    fs.unlinkSync(codePath);
  }

  getRandomId(): string {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + '';
  }
}
