import { Module } from '@nestjs/common';
import { HangersModule } from './endpoints/hangers/hangers.module';
import { ReposModule } from './repos/repos.module';
import { MongooseModule } from '@nestjs/mongoose';
import { QrsModule } from './endpoints/qrs/qrs.module';
import { ClubsModule } from './endpoints/clubs/clubs.module';
import { SlotsModule } from './endpoints/slots/slots.module';
import { config } from 'dotenv';
import { LocationsModule } from './endpoints/locations/locations.module';
import { OrdersModule } from './endpoints/orders/orders.module';
import { AuthModule } from './endpoints/auth/auth.module';
config();

const { URI_MONGODB } = process.env;

@Module({
  imports: [
    MongooseModule.forRoot(URI_MONGODB),
    HangersModule,
    ReposModule, QrsModule, ClubsModule, SlotsModule, LocationsModule, OrdersModule, AuthModule
  ],
})
export class AppModule { }
