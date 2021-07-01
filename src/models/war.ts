import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export enum WarOutcome {
  ArmyOne = 'Army One',
  ArmyTwo = 'Army Two',
  Draw = 'Draw',
}

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
  @Transform(({ value }) => Number(value))
  armyOne: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => Number(value))
  armyTwo: number;
}

export class WageWarResponse {
  @ApiProperty({ enum: WarOutcome, name: 'outcome' })
  outcome: WarOutcome;

  @ApiProperty({ name: 'history', type: [WarFightHistory] })
  history: Array<WarFightHistory>;
}
