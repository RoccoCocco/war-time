import { Test, TestingModule } from '@nestjs/testing';

import { WarController } from './controllers/war';
import { WarOutcome } from './enums/warOutcome';
import { Battle } from './modifiers/battle';
import { WageWarService } from './services/wageWar';

const roll = jest.fn<ReturnType<Battle['roll']>, any>();
const mockBattle = { roll };

jest.mock('./modifiers/battle', () => ({
  Battle: jest.fn().mockImplementation(() => mockBattle),
}));

describe('WarController', () => {
  let controller: WarController;
  let service: WageWarService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WarController],
      providers: [WageWarService],
    }).compile();

    controller = app.get<WarController>(WarController);
    service = app.get<WageWarService>(WageWarService);

    mockBattle.roll.mockClear();
  });

  it('should be draw on 0,0', () => {
    mockBattle.roll
      .mockReturnValueOnce({ armyOne: 0, armyTwo: 0, wasTriggered: false })
      .mockReturnValueOnce({ armyOne: -2, armyTwo: -2, wasTriggered: true });

    const result = service.fight(1, 1, []);
    expect(result.outcome).toBe(WarOutcome.Draw);
    expect(result.history[0].armyOneCount).toBe(0);
    expect(result.history[0].armyTwoCount).toBe(0);
  });

  it('should be Army Two victory', () => {
    mockBattle.roll.mockReturnValueOnce({ armyOne: -1, armyTwo: 0, wasTriggered: true });
    const response = controller.start({ armyOne: 1, armyTwo: 1 });
    expect(response.outcome).toBe(WarOutcome.ArmyTwo);
    expect(response.history.length).toBe(1);
  });

  it('should be Army One victory', () => {
    mockBattle.roll.mockReturnValueOnce({ armyOne: 0, armyTwo: -1, wasTriggered: true });
    const response = controller.start({ armyOne: 1, armyTwo: 1 });
    expect(response.outcome).toBe(WarOutcome.ArmyOne);
    expect(response.history.length).toBe(1);
  });
});
