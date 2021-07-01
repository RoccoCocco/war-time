import { WarOutcome } from '../models/war';

export const messageConstruct = (message: string, armyOne: number, armyTwo: number) =>
  [message, messagePerArmy(WarOutcome.ArmyOne, armyOne), messagePerArmy(WarOutcome.ArmyTwo, armyTwo)].join(' ');

const messagePerArmy = (name: WarOutcome, status: number) => {
  if (status === 0) {
    return `${name} had no casualties.`;
  }
  const countAbs = Math.abs(status);
  return `${name} ${status > 0 ? 'gained' : 'lost'} ${countAbs} soldier${countAbs !== 1 ? 's' : ''}.`;
};
