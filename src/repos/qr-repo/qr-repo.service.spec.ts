import { Test, TestingModule } from '@nestjs/testing';
import { QrRepoService } from './qr-repo.service';

describe('QrRepoService', () => {
  let service: QrRepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QrRepoService],
    }).compile();

    service = module.get<QrRepoService>(QrRepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
