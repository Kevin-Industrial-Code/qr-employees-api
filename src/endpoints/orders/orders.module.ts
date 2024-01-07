import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ReposModule } from 'src/repos/repos.module';

@Module({
  imports: [ReposModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
