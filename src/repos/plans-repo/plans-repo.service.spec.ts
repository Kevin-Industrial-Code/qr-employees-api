import { Test, TestingModule } from '@nestjs/testing';
import { PlansRepoService } from './plans-repo.service';

describe('PlansRepoService', () => {
  let service: PlansRepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlansRepoService],
    }).compile();

    service = module.get<PlansRepoService>(PlansRepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
