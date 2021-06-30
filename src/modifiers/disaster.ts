import { IModifier } from '../interfaces/modifier';

export class Disaster implements IModifier {
  private readonly chance: number;
  private readonly max: number;
  private readonly min: number;
  readonly message = `Disaster struck.`;

  constructor(chance: number, min: number, max: number) {
    this.chance = chance;
    this.max = max;
    this.min = min;
  }

  roll(): ReturnType<IModifier['roll']> {
    if (Math.random() > this.chance) {
      return { armyOne: 0, armyTwo: 0, wasTriggered: false };
    }

    return {
      armyOne: -Math.ceil(Math.random() * (this.max - this.min) + this.min),
      armyTwo: -Math.ceil(Math.random() * (this.max - this.min) + this.min),
      wasTriggered: true,
    };
  }
}
