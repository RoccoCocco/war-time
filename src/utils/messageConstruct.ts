import { WarOutcome } from '../models/war';

export const messageConstruct = (message: string, red: number, blue: number) =>
  [message, messagePerArmy(WarOutcome.Red, red), messagePerArmy(WarOutcome.Blue, blue)].join(' ');

const messagePerArmy = (name: WarOutcome, status: number) =>
  status === 0
    ? `${name} army had no casualties.`
    : `${name} ${status > 0 ? 'gained' : 'lost'} ${Math.abs(status)} soldier${Math.abs(status) !== 1 ? 's' : ''}.`;
