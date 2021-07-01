import { TransformFnParams } from 'class-transformer';

export const transformToNumber = ({ value }: Pick<TransformFnParams, 'value'>): number => Number(value);
