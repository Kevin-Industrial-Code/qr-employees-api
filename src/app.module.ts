import { Module } from '@nestjs/common';
import { HangersModule } from './endpoints/hangers/hangers.module';
import { ReposModule } from './repos/repos.module';
import { MongooseModule } from '@nestjs/mongoose';
import { QrsModule } from './endpoints/qrs/qrs.module';
import { ClubsModule } from './endpoints/clubs/clubs.module';
import { SlotsModule } from './endpoints/slots/slots.module';
import { config }  from 'dotenv';
config();

const { URI_MONGODB } = process.env;

@Module({
  imports: [
    MongooseModule.forRoot(URI_MONGODB),
    HangersModule, 
    ReposModule, QrsModule, ClubsModule, SlotsModule
  ],
})
export class AppModule {}
