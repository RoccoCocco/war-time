type RollOutput = {
  armyOne: number;
  armyTwo: number;
  wasTriggered: boolean;
};

export interface IModifier {
  readonly message: string;

  roll(): RollOutput;
}
