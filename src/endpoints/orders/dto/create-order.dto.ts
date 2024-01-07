import { Order } from "src/core/entities/order";
import { Qr } from "src/core/entities/qr";


export class CreateOrderDto {
    order : Order;
    qr : Qr
}
