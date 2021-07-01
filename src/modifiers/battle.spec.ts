import { Battle } from './battle';
import { Disaster } from './disaster';
import { Wololooo } from './wololooo';

describe('Mod', () => {
  it('should battle ', () => {
    expect(new Battle().roll().wasTriggered).toBe(true);
  });

  it('should battle be equal loss', () => {
    const [one, two] = new Battle().calculateLoss([1, 2, 3], [1, 3]);
    expect(one).toEqual(two);
  });

  it('should battle be two loss', () => {
    const [one, two] = new Battle().calculateLoss([6, 5, 1], [4, 3]);
    expect(one).toEqual(0);
    expect(two).toEqual(-2);
  });

  it('should battle be one loss', () => {
    const [one, two] = new Battle().calculateLoss([6, 6, 6], [6, 6]);
    expect(one).toEqual(-2);
    expect(two).toEqual(0);
  });

  it('should disaster ', () => {
    const disaster = new Disaster(1, 7, 7).roll();
    expect(disaster).toEqual({ armyOne: -7, armyTwo: -7, wasTriggered: true });
  });

  it('should not disaster ', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(1);
    const disaster = new Disaster(0, 10, 10).roll();
    expect(disaster.wasTriggered).toBe(false);
  });

  it('should Wololooo', () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(1);
    const wololooo = new Wololooo(1, 7).roll();
    expect(wololooo.wasTriggered).toEqual(true);
    expect(wololooo.armyOne).toEqual(wololooo.armyTwo * -1);
  });

  it('should Wololooo Two', () => {
    jest.spyOn(global.Math, 'random').mockReturnValueOnce(1).mockReturnValueOnce(1).mockReturnValueOnce(0.1);

    const wololooo = new Wololooo(1, 4).roll();
    expect(wololooo).toEqual({ armyOne: 4, armyTwo: -4, wasTriggered: true });
  });

  it('should not Wololooo', () => {
    expect(new Wololooo(0, 10).roll().wasTriggered).toBe(false);
  });
});
