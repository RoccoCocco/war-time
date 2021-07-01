import { Inject, Injectable, Optional } from '@nestjs/common';

import { WarOutcome } from '../enums/warOutcome';
import { IModifier } from '../interfaces/modifier';
import { WageWarResponse, WarFightHistory } from '../models/war';
import { Battle } from '../modifiers/battle';
import { messageConstruct } from '../utils/messageConstruct';

@Injectable()
export class WageWarService {
  constructor(@Inject('ActiveModifiers') @Optional() private modifiers: Array<IModifier>) {}

  start(armyOne: number, armyTwo: number): WageWarResponse {
    const modifiers = [new Battle(), ...(this.modifiers || [])];

    let whoAttacks = true;
    const history: Array<WarFightHistory> = [];

    while (armyOne > 0 && armyTwo > 0) {
      for (const modifier of modifiers) {
        const { armyOne: one, armyTwo: two, wasTriggered } = modifier.roll();

        const oneStatus = whoAttacks ? one : two;
        const twoStatus = whoAttacks ? two : one;

        armyOne += oneStatus;
        armyTwo += twoStatus;

        if (armyOne < 0) armyOne = 0;
        if (armyTwo < 0) armyTwo = 0;

        if (wasTriggered) {
          const message = messageConstruct(modifier.message, oneStatus, twoStatus);
          history.push({ armyOneCount: armyOne, armyTwoCount: armyTwo, message });
        }

        if (armyOne < 1 || armyTwo < 1) {
          break;
        }
      }

      whoAttacks = !whoAttacks;
    }

    const outcome = armyOne === armyTwo ? WarOutcome.Draw : armyOne ? WarOutcome.ArmyOne : WarOutcome.ArmyTwo;

    return { outcome, history };
  }
}
