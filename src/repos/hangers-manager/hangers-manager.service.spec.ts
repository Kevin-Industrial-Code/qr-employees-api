import { Test, TestingModule } from '@nestjs/testing';
import { HangersManagerService } from './hangers-manager.service';

describe('HangersManagerService', () => {
  let service: HangersManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HangersManagerService],
    }).compile();

    service = module.get<HangersManagerService>(HangersManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
