import { rollDice, rollDices } from '../../src/utils/rollDice';

describe('Util - RollDice', () => {
  it('should throw dice', () => {
    jest.spyOn(global.Math, 'random').mockReturnValueOnce(0.1666);
    expect(rollDice()).toBe(1);

    jest.spyOn(global.Math, 'random').mockReturnValueOnce(0.9999);
    expect(rollDice()).toBe(6);

    jest.spyOn(global.Math, 'random').mockReturnValueOnce(1);
    expect(rollDice()).toBe(6);
  });

  it('should throw 6 dices', () => {
    jest
      .spyOn(global.Math, 'random')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.2)
      .mockReturnValueOnce(0.4)
      .mockReturnValueOnce(0.6)
      .mockReturnValueOnce(0.8)
      .mockReturnValueOnce(1);
    expect(rollDices(6)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
