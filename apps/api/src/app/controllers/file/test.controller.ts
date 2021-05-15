import {Express} from "express";

import {
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {FilesInterceptor} from "@nestjs/platform-express";

import {TestService} from "../../services/test/test.service";
import {JwtGuard} from "../../guards/jwt/jwt.guard";

@Controller('tests')
export class TestController {
  constructor(private readonly testService: TestService) {
  }

  @UseGuards(JwtGuard)
  @Post('upload/:id')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFiles(@Param('id') id, @UploadedFiles() files: Array<Express.Multer.File>) {
    return this.testService.uploadFiles(files, id);
  }

  @Get('problem/:id')
  getFilesById(@Param('id') id) {
    return this.testService.findTestsByProblemId(id);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteTest(@Param('id') id) {
    return this.testService.removeTest(id);
  }

  @Get('/download/:filename')
  @Header('Content-type', 'text/plain')
  async downloadTest(@Param('filename') filename, @Res() res) {
    const file = await this.testService.downloadTestFile(filename);
    res.send(file);
  }
}
