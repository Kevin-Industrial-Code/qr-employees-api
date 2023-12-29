import { Test, TestingModule } from '@nestjs/testing';
import { QrsController } from './qrs.controller';
import { QrsService } from './qrs.service';

describe('QrsController', () => {
  let controller: QrsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QrsController],
      providers: [QrsService],
    }).compile();

    controller = module.get<QrsController>(QrsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
