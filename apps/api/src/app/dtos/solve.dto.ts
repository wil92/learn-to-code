import {ApiProperty} from "@nestjs/swagger";

export class SolveDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  language: string;
}
