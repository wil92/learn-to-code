import {ApiProperty} from "@nestjs/swagger";

export class SolveDto {
  @ApiProperty()
  username: string;
}
