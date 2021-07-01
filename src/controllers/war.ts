import { Controller, Get, Query, InternalServerErrorException } from '@nestjs/common';
import { ApiOkResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';

import { WageWarQuery, WageWarResponse } from '../models/war';
import { WageWarService } from '../services/wageWar';

@Controller()
export class WarController {
  constructor(private readonly warService: WageWarService) {}

  @Get('wageWar')
  @ApiOkResponse({ type: WageWarResponse['outcome'] })
  wageWar(@Query() query: WageWarQuery): WageWarResponse['outcome'] {
    return this.warService.start(query.armyOne, query.armyTwo).outcome;
  }

  @Get('wageWarWithHistory')
  @ApiOkResponse({ type: WageWarResponse })
  wageWarWithHistory(@Query() query: WageWarQuery): WageWarResponse {
    return this.warService.start(query.armyOne, query.armyTwo);
  }

  @Get('wageWarError')
  @ApiInternalServerErrorResponse()
  wageWarError(@Query('message') message: string): WageWarResponse {
    throw new InternalServerErrorException(`Throw error with  message [${message}]`);
  }
}
