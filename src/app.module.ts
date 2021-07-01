/* istanbul ignore file */

import { Module } from '@nestjs/common';

import { WarController } from './controllers/war';
import { WageWarService } from './services/wageWar';

@Module({
  imports: [],
  controllers: [WarController],
  providers: [WageWarService],
})
export class AppModule {}
