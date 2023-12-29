import { Test, TestingModule } from '@nestjs/testing';
import { HangersService } from './hangers.service';

describe('HangersService', () => {
  let service: HangersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HangersService],
    }).compile();

    service = module.get<HangersService>(HangersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
