import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { Exception } from 'src/core/shared/exception';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dtos/login.dto';

@ApiTags('Auth')
@Controller('login')
export class LoginController {

    constructor(
        private loginService : LoginService
    ) {}

    @Post('')
    login(@Body() loginDto : LoginDto) {
        return new Promise<any>((resolve, reject) => {
            this.loginService.loginWithUserPassword(loginDto)
            .then((result) => {
                resolve(result)
            }).catch((err : Exception) => {
                reject(err)
            });
        })
    }
}
