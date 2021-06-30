import { Injectable } from '@nestjs/common';
import { WarFightHistory, WarOutcome, WageWarResponse } from '../models/war';
import { messageConstruct } from '../utils/messageConstruct';
import { IModifier } from '../interfaces/modifier';
import { Wololooo } from '../modifiers/wololooo';
import { Disaster } from '../modifiers/disaster';
import { Battle } from '../modifiers/battle';

@Injectable()
export class WageWarService {
  start(one: number, two: number): WageWarResponse {
    const modifiers = [new Disaster(0.3, 0, 1), new Wololooo(0.2, 3)];
    return this.fight(one, two, modifiers);
  }

  fight(red: number, blue: number, modifiers: Array<IModifier>): WageWarResponse {
    modifiers = [new Battle(), ...modifiers];

    let whoAttacks = true;
    const history: Array<WarFightHistory> = [];

    while (red > 0 && blue > 0) {
      for (const i in modifiers) {
        const { armyOne: one, armyTwo: two, wasTriggered } = modifiers[i].roll();

        const oneStatus = whoAttacks ? one : two;
        const twoStatus = whoAttacks ? two : one;

        red += oneStatus;
        blue += twoStatus;

        if (red < 0) red = 0;
        if (blue < 0) blue = 0;

        if (wasTriggered) {
          const message = messageConstruct(modifiers[i].message, oneStatus, twoStatus);
          history.push({ redCount: red, blueCount: blue, message });
        }

        if (red < 1 || blue < 1) {
          break;
        }
      }

      whoAttacks = !whoAttacks;
    }

    const outcome = red === blue ? WarOutcome.Draw : red ? WarOutcome.Red : WarOutcome.Blue;

    return { outcome, history };
  }
}
