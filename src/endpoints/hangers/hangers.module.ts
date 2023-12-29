import { Module } from '@nestjs/common';
import { HangersService } from './hangers.service';
import { HangersController } from './hangers.controller';
import { ReposModule } from 'src/repos/repos.module';

@Module({
  imports: [ReposModule],
  controllers: [HangersController],
  providers: [HangersService],
})
export class HangersModule {}
