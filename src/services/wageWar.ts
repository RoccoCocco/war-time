import { Injectable } from '@nestjs/common';
import { WarFightHistory, WageWarResponse } from '../models/war';
import { messageConstruct } from '../utils/messageConstruct';
import { IModifier } from '../interfaces/modifier';
import { WarOutcome } from '../enums/warOutcome';
import { Wololooo } from '../modifiers/wololooo';
import { Disaster } from '../modifiers/disaster';
import { Battle } from '../modifiers/battle';

@Injectable()
export class WageWarService {
  start(one: number, two: number): WageWarResponse {
    const modifiers = [new Disaster(0.3, 0, 1), new Wololooo(0.2, 3)];
    return this.fight(one, two, modifiers);
  }

  fight(armyOne: number, armyTwo: number, modifiers: Array<IModifier>): WageWarResponse {
    modifiers = [new Battle(), ...modifiers];

    let whoAttacks = true;
    const history: Array<WarFightHistory> = [];

    while (armyOne > 0 && armyTwo > 0) {
      for (const i in modifiers) {
        const { armyOne: one, armyTwo: two, wasTriggered } = modifiers[i].roll();

        const oneStatus = whoAttacks ? one : two;
        const twoStatus = whoAttacks ? two : one;

        armyOne += oneStatus;
        armyTwo += twoStatus;

        if (armyOne < 0) armyOne = 0;
        if (armyTwo < 0) armyTwo = 0;

        if (wasTriggered) {
          const message = messageConstruct(modifiers[i].message, oneStatus, twoStatus);
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
