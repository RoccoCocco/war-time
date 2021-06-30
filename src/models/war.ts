import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export enum WarOutcome {
  Red = 'Red',
  Blue = 'Blue',
  Draw = 'Draw',
  Stalemate = 'Stalemate',
}

export class WarFightHistory {
  @ApiProperty()
  redCount: number;

  @ApiProperty()
  blueCount: number;

  @ApiProperty()
  message: string;
}

export class WageWarQuery {
  @ApiProperty()
  @IsInt()
  @Transform(({ value }) => Number(value))
  armyOne: number;

  @ApiProperty()
  @IsInt()
  @Transform(({ value }) => Number(value))
  armyTwo: number;
}

export class WageWarResponse {
  @ApiProperty({ enum: WarOutcome, name: 'outcome' })
  outcome: WarOutcome;

  @ApiProperty({ name: 'history', type: [WarFightHistory] })
  history: Array<WarFightHistory>;
}
