import { messageConstruct } from '../../src/utils/messageConstruct';
import { rollDice, rollDices } from '../../src/utils/rollDice';
import { transformToNumber } from '../../src/utils/transformToNumber';

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

describe('Util - Transform to number', () => {
  it('should transform to number or NaN', () => {
    expect(transformToNumber({ value: '3' })).toBe(3);
    expect(transformToNumber({ value: 'asad343' })).toBeNaN();
    expect(transformToNumber({ value: '-1' })).toBe(-1);
  });
});

describe('Util - RollDice', () => {
  it('should return message ', () => {
    expect(messageConstruct('Dummy.', 1, 2)).toBe('Dummy. Army One gained 1 soldier. Army Two gained 2 soldiers.');
    expect(messageConstruct('Dummy.', -2, -1)).toBe('Dummy. Army One lost 2 soldiers. Army Two lost 1 soldier.');
    expect(messageConstruct('Dummy.', 0, 0)).toBe('Dummy. Army One had no casualties. Army Two had no casualties.');
  });
});
