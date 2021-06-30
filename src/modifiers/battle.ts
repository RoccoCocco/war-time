import { IModifier } from '../interfaces/modifier';
import { Dice, rollDices } from '../utils/rollDice';

export class Battle implements IModifier {
  readonly message = 'Battle ensued.';

  constructor() {}

  roll(): ReturnType<IModifier['roll']> {
    const [armyOne, armyTwo] = this.calculateLoss(rollDices(3), rollDices(2));

    return {
      armyOne,
      armyTwo,
      wasTriggered: true,
    };
  }

  private calculateLoss(attacker: Dice[], defender: Dice[]): [number, number] {
    const attackerRoll = [...attacker].sort();
    const defenderRoll = [...defender].sort();

    let attackerLoss = 0;
    let defenderLoss = 0;

    while (defenderRoll.length && attackerRoll.length) {
      const attackRoll = attackerRoll.pop();
      const defendRoll = defenderRoll.pop();

      defendRoll >= attackRoll ? attackerLoss-- : defenderLoss--;
    }

    return [attackerLoss, defenderLoss];
  }
}
