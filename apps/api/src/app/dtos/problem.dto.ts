import {ApiProperty} from "@nestjs/swagger";

export class ProblemDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  inputDescription: string;

  @ApiProperty()
  inputExample: string;

  @ApiProperty()
  outputDescription: string;

  @ApiProperty()
  outputExample: string;

  @ApiProperty()
  enabled: boolean;
}
