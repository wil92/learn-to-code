import {Express} from "express";

import {Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {FilesInterceptor} from "@nestjs/platform-express";

import {TestService} from "../../services/test/test.service";

@Controller('tests')
export class TestController {
  constructor(private readonly testService: TestService) {
  }

  @Post('upload/:id')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFiles(@Param() {id}, @UploadedFiles() files: Array<Express.Multer.File>) {
    return this.testService.uploadFiles(files, id);
  }

  @Get('problem/:id')
  getFilesById(@Param() {id}) {
    return this.testService.findTestsByProblemId(id);
  }

  @Delete(':id')
  deleteTest(@Param() {id}) {
    return this.testService.removeTest(id);
  }
}
