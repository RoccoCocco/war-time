import { Test, TestingModule } from '@nestjs/testing';
import { WarController } from './controllers/war';
import { WageWarService } from './services/wageWar';
import { Battle } from './modifiers/battle';

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
    expect(result.outcome).toBe('Draw');
    expect(result.history[0].redCount).toBe(0);
    expect(result.history[0].blueCount).toBe(0);
  });

  it('should be blue victory', () => {
    mockBattle.roll.mockReturnValueOnce({ armyOne: -1, armyTwo: 0, wasTriggered: true });
    const response = controller.start({ armyOne: 1, armyTwo: 1 });
    expect(response.outcome).toBe('Blue');
    expect(response.history.length).toStrictEqual(1);
  });

  it('should be red victory', () => {
    mockBattle.roll.mockReturnValueOnce({ armyOne: 0, armyTwo: -1, wasTriggered: true });
    const response = controller.start({ armyOne: 1, armyTwo: 1 });
    expect(response.outcome).toBe('Red');
    expect(response.history.length).toStrictEqual(1);
  });
});
