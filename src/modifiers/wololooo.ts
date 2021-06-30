import { IModifier } from '../interfaces/modifier';

export class Wololooo implements IModifier {
  readonly message = `Wololooo occured.`;
  private readonly chance: number;
  private readonly max: number;

  constructor(chance: number, max: number) {
    this.chance = chance;
    this.max = max;
  }

  roll(): ReturnType<IModifier['roll']> {
    if (Math.random() > this.chance) {
      return { armyOne: 0, armyTwo: 0, wasTriggered: false };
    }

    const wonOver = Math.ceil(Math.random() * this.max);
    const sideSwitch = Math.random() >= 0.5 ? 1 : -1;

    return {
      armyOne: wonOver * sideSwitch * -1,
      armyTwo: wonOver * sideSwitch,
      wasTriggered: true,
    };
  }
}
