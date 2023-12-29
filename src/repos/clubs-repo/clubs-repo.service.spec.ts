import { Test, TestingModule } from '@nestjs/testing';
import { ClubsRepoService } from './clubs-repo.service';

describe('ClubsRepoService', () => {
  let service: ClubsRepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClubsRepoService],
    }).compile();

    service = module.get<ClubsRepoService>(ClubsRepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
