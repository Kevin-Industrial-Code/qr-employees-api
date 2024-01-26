import { Module } from '@nestjs/common';
import { QrsService } from './qrs.service';
import { QrsController } from './qrs.controller';
import { ReposModule } from 'src/repos/repos.module';
import { HangersModule } from '../hangers/hangers.module';

@Module({
  imports: [ReposModule, HangersModule],
  controllers: [QrsController],
  providers: [QrsService],
})
export class QrsModule { }
