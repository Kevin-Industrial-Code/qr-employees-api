import { Test, TestingModule } from '@nestjs/testing';
import { QrsService } from './qrs.service';

describe('QrsService', () => {
  let service: QrsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QrsService],
    }).compile();

    service = module.get<QrsService>(QrsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("listQrs", () => {
    it("", () => {

    })
  });
});
