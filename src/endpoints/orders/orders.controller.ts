import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { Message } from 'src/core/shared/message';
import { Exception } from 'src/core/shared/exception';
import { AuthGuard } from 'src/core/guards/auth/auth.guard';

@UseGuards(AuthGuard)
@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return new Promise<Message>((resolve, reject) => {
      this.ordersService.create(createOrderDto)
      .then((result) => {
        resolve(result);
      }).catch((err : Exception) => {
        reject(err.getException());
      });
    });
  }

}
