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
import { ScheduleModule } from "@nestjs/schedule";
import { AuthModule } from './endpoints/auth/auth.module';
import { EmailModule } from './endpoints/email/email.module';
config();

const { URI_MONGODB } = process.env;

@Module({
  imports: [
    MongooseModule.forRoot(URI_MONGODB),
    ScheduleModule.forRoot(),
    HangersModule,
    ReposModule,
    QrsModule,
    ClubsModule,
    SlotsModule,
    LocationsModule,
    OrdersModule,
    EmailModule,
    AuthModule,
  ],
})
export class AppModule { }
