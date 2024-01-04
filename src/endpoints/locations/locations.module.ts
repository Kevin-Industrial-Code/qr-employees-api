import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { ReposModule } from 'src/repos/repos.module';

@Module({
  imports: [ReposModule],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
