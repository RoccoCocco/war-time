import { Battle } from './battle';
import { Disaster } from './disaster';
import { Wololooo } from './wololooo';

describe('Mod', () => {
  it('should battle ', () => {
    expect(new Battle().roll().wasTriggered).toBe(true);
  });

  it('should disaster ', () => {
    const disaster = new Disaster(1, 7, 7).roll();
    expect(disaster).toEqual({ armyOne: -7, armyTwo: -7, wasTriggered: true });
  });

  it('should not disaster ', () => {
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
    expect(wololooo).toEqual({ armyOne: 4, armyTwo: 4, wasTriggered: true });
  });

  it('should not Wololooo', () => {
    expect(new Wololooo(0, 10).roll().wasTriggered).toBe(false);
  });
});
