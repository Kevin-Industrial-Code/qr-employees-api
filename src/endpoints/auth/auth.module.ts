import { Module } from '@nestjs/common';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { ReposModule } from 'src/repos/repos.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_DURATION, JWT_SECRET } from './auth.secrets';
import { AuthGuard } from 'src/core/guards/auth/auth.guard';


@Module({
  imports: [
    ReposModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_DURATION }
    })
  ],
  controllers: [LoginController],
  providers: [
    LoginService,
    AuthGuard
  ]
})
export class AuthModule {}
