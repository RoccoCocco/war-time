import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export enum WarOutcome {
  ArmyOne = 'Army One',
  ArmyTwo = 'Army Two',
  Draw = 'Draw',
}
import { transformToNumber } from '../utils/transformToNumber';

export class WarFightHistory {
  @ApiProperty()
  armyOneCount: number;

  @ApiProperty()
  armyTwoCount: number;

  @ApiProperty()
  message: string;
}

export class WageWarQuery {
  @ApiProperty()
  @IsInt()
  @Min(1)
  @Transform(transformToNumber)
  armyOne: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Transform(transformToNumber)
  armyTwo: number;
}

export class WageWarResponse {
  @ApiProperty({ enum: WarOutcome, name: 'outcome' })
  outcome: WarOutcome;

  @ApiProperty({ name: 'history', type: [WarFightHistory] })
  history: Array<WarFightHistory>;
}
