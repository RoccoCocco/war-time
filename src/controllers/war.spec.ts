import { Test, TestingModule } from '@nestjs/testing';

import { WarController } from '../controllers/war';
import { WarOutcome } from '../enums/warOutcome';
import { Battle } from '../modifiers/battle';
import { WageWarService } from '../services/wageWar';

const roll = jest.fn<ReturnType<Battle['roll']>, any>();
const mockBattle = { roll };

jest.mock('../modifiers/battle', () => ({
  Battle: jest.fn().mockImplementation(() => mockBattle),
}));

describe('WarController', () => {
  let controller: WarController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WarController],
      providers: [WageWarService],
    }).compile();

    controller = app.get<WarController>(WarController);

    mockBattle.roll.mockClear();
  });

  it('should be draw', () => {
    mockBattle.roll.mockReturnValueOnce({ armyOne: -10, armyTwo: -10, wasTriggered: true });
    const response = controller.wageWarWithHistory({ armyOne: 10, armyTwo: 10 });
    expect(response.outcome).toBe(WarOutcome.Draw);
    expect(response.history.length).toBe(1);
  });

  it('should be draw', () => {
    mockBattle.roll.mockReturnValueOnce({ armyOne: -10, armyTwo: -10, wasTriggered: true });
    const response = controller.wageWar({ armyOne: 10, armyTwo: 10 });
    expect(response).toBe(WarOutcome.Draw);
  });
});
