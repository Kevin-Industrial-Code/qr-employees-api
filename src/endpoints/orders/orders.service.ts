import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersRepoService } from 'src/repos/orders-repo/orders-repo.service';
import { QrRepoService } from 'src/repos/qr-repo/qr-repo.service';

@Injectable()
export class OrdersService {

  constructor(
    private ordersRepo : OrdersRepoService,
    private qrsRepo : QrRepoService
  ) {}

  async create( { order, qr } : CreateOrderDto) {
    try {
      let orderRef = await this.ordersRepo.postEmployeeGeneratedOrder(order);
      qr.orderId = orderRef.id;
      let qrRef = await this.qrsRepo.createQr(qr);
      return { name : "success", message : `${orderRef.id}-${qrRef.id}`}
    } catch (error) {
      throw error;
    }
  }

}
