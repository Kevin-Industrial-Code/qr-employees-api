import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { ReposModule } from 'src/repos/repos.module';

@Module({
  imports: [ReposModule],
  controllers: [PlansController],
  providers: [PlansService],
})
export class PlansModule {}
