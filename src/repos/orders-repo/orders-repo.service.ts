import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order } from 'src/core/entities/order';
import { Qr } from 'src/core/entities/qr';
import { CreateEntityException } from 'src/core/exceptions/create-entity-exception';

@Injectable()
export class OrdersRepoService {

    constructor(
        @InjectModel(Order.name) private orderModel : Model<Order>,
    ) {}

    async postEmployeeGeneratedOrder(order : Order) {
        try {
            order.clubId = new Types.ObjectId(order.clubId) as any;
            let orderModel = await this.orderModel.create(order);
            return orderModel;
        } catch (error) {
            throw new CreateEntityException(error);
        }
    }
}
