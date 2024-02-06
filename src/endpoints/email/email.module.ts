import { Module } from '@nestjs/common';
import { ReposModule } from 'src/repos/repos.module';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';

@Module({
  imports: [ReposModule],
  providers: [EmailService],
  controllers: [EmailController]
})
export class EmailModule {}
