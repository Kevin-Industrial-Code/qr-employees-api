import { Injectable } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { UsersRepoService } from 'src/repos/users-repo/users-repo.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/core/entities/user';
import { IncorrectCredentialsExceptoin } from 'src/core/exceptions/incorrect-credentials-exception';
import { JwtService } from '@nestjs/jwt';
import { SessionDto } from './dtos/session.dto';

@Injectable()
export class LoginService {

    constructor(
        private usersRepo : UsersRepoService,
        private jwtService : JwtService
    ) {}

    async login( { username, password } : LoginDto) {
        try {
            let user : User = (await this.usersRepo.findUserByUsername(username))[0];
            console.log(user);
            let isEqual = bcrypt.compareSync(password, user.password);
            if(!isEqual) throw new IncorrectCredentialsExceptoin(new Error("username or password incorrect"));
            if(user.rol == "customer")
                throw new IncorrectCredentialsExceptoin(new Error("username or password incorrect"));
            let payload = { name : user.name, rol: user.rol, email : user.email };
            let access_token = this.jwtService.sign(payload)
            let session : SessionDto = {
                access_token: access_token,
                email: user.email,
                id: user['_id'],
                name: user.name,
                rol: user.rol,
                username: user.username
            }
            return session;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}
