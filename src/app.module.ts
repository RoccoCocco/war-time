/* istanbul ignore file */

import { Module } from '@nestjs/common';

import { WarController } from './controllers/war';
import { IModifier } from './interfaces/modifier';
import { Disaster } from './modifiers/disaster';
import { Wololooo } from './modifiers/wololooo';
import { WageWarService } from './services/wageWar';

@Module({
  imports: [],
  controllers: [WarController],
  providers: [
    WageWarService,
    {
      provide: 'ActiveModifiers',
      useFactory: (): Array<IModifier> => [new Disaster(0.3, 0, 1), new Wololooo(0.2, 3)],
    },
  ],
})
export class AppModule {}
