import { Test, TestingModule } from '@nestjs/testing';
import { HangersController } from './hangers.controller';
import { HangersService } from './hangers.service';

describe('HangersController', () => {
  let controller: HangersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HangersController],
      providers: [HangersService],
    }).compile();

    controller = module.get<HangersController>(HangersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
