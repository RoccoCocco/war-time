export type Dice = 1 | 2 | 3 | 4 | 5 | 6;

export const rollDice = (): Dice => (Math.ceil(Math.random() * 6) || 1) as Dice;
export const rollDices = (num: number): Dice[] => new Array(num).fill(0).map(() => rollDice());
