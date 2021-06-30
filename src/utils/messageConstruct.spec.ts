import { messageConstruct } from '../../src/utils/messageConstruct';

describe('Util - RollDice', () => {
  it('should return message ', () => {
    expect(messageConstruct('Dummy.', 1, 2)).toBe('Dummy. Red gained 1 soldier. Blue gained 2 soldiers.');
    expect(messageConstruct('Dummy.', -2, -1)).toBe('Dummy. Red lost 2 soldiers. Blue lost 1 soldier.');
    expect(messageConstruct('Dummy.', 0, 0)).toBe('Dummy. Red army had no casualties. Blue army had no casualties.');
  });
});
