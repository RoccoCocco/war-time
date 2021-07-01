import { messageConstruct } from '../../src/utils/messageConstruct';

describe('Util - RollDice', () => {
  it('should return message ', () => {
    expect(messageConstruct('Dummy.', 1, 2)).toBe('Dummy. Army One gained 1 soldier. Army Two gained 2 soldiers.');
    expect(messageConstruct('Dummy.', -2, -1)).toBe('Dummy. Army One lost 2 soldiers. Army Two lost 1 soldier.');
    expect(messageConstruct('Dummy.', 0, 0)).toBe('Dummy. Army One had no casualties. Army Two had no casualties.');
  });
});
