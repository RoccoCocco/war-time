import { transformToNumber } from '../../src/utils/transformToNumber';

describe('Util - Transform to number', () => {
  it('should transform to number or NaN', () => {
    expect(transformToNumber({ value: '3' })).toBe(3);
    expect(transformToNumber({ value: 'asad343' })).toBeNaN();
    expect(transformToNumber({ value: '-1' })).toBe(-1);
  });
});
