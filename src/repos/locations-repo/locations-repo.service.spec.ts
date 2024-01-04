import { Test, TestingModule } from '@nestjs/testing';
import { LocationsRepoService } from './locations-repo.service';

describe('LocationsRepoService', () => {
  let service: LocationsRepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationsRepoService],
    }).compile();

    service = module.get<LocationsRepoService>(LocationsRepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
