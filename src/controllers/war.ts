import { Controller, Get, Query } from '@nestjs/common';
import { WageWarService } from '../services/wageWar';
import { WageWarQuery, WageWarResponse } from '../models/war';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('war')
export class WarController {
  constructor(private readonly warService: WageWarService) {}

  @Get()
  @ApiOkResponse({ type: WageWarResponse })
  start(@Query() query: WageWarQuery): WageWarResponse {
    return this.warService.start(query.armyOne, query.armyTwo);
  }
}
