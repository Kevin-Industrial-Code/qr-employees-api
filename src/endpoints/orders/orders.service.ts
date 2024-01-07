import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {

  constructor() {}

  async create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order' as any;
    try {
      
    } catch (error) {
      throw error;
    }
  }

}
