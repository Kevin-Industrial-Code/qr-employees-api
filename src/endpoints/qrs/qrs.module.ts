import { Module } from '@nestjs/common';
import { QrsService } from './qrs.service';
import { QrsController } from './qrs.controller';
import { ReposModule } from 'src/repos/repos.module';

@Module({
  imports: [ReposModule],
  controllers: [QrsController],
  providers: [QrsService],
})
export class QrsModule {}
