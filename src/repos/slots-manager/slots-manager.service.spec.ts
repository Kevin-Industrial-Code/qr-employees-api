import { Test, TestingModule } from '@nestjs/testing';
import { SlotsManagerService } from './slots-manager.service';

describe('SlotsManagerService', () => {
  let service: SlotsManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlotsManagerService],
    }).compile();

    service = module.get<SlotsManagerService>(SlotsManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
