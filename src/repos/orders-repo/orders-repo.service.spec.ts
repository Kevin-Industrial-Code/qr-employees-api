import { Test, TestingModule } from '@nestjs/testing';
import { OrdersRepoService } from './orders-repo.service';

describe('OrdersRepoService', () => {
  let service: OrdersRepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersRepoService],
    }).compile();

    service = module.get<OrdersRepoService>(OrdersRepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
