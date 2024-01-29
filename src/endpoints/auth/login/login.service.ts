import { Injectable } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { UsersRepoService } from 'src/repos/users-repo/users-repo.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/core/entities/user';
import { IncorrectCredentialsException } from 'src/core/exceptions/incorrect-credentials-exception';
import { JwtService } from '@nestjs/jwt';
import { SessionDto } from './dtos/session.dto';
import { UserNotFoundException } from 'src/core/exceptions/user-not-found.exception';
import { IncorrectAdminException } from 'src/core/exceptions/incorrect-admin.exception';
import { UnauthorizedLoginException } from 'src/core/exceptions/unauthorized-login.exception';

@Injectable()
export class LoginService {

    constructor(
        private usersRepo: UsersRepoService,
        private jwtService: JwtService
    ) { }

    async loginWithUserPassword({ username, password, adminId }: LoginDto) {
        try {
            let user: User = (await this.usersRepo.findByUsername(username));
            if(!user)
                throw new UserNotFoundException(new Error("no user provided"))
            let isEqual = bcrypt.compareSync(password, user.password);
            
            if (!isEqual) 
                throw new IncorrectCredentialsException(new Error("username or password incorrect"));
            if(user.adminId){
                if(user.adminId != adminId)
                    throw new IncorrectAdminException(new Error('incorrect  credentials'));
            }else{
                if(user['_id'] != adminId)
                    throw new IncorrectAdminException(new Error('incorrect  credentials'));
            }
                
                    
            if (user.rol == "customer")
                throw new UnauthorizedLoginException(new Error("username or password incorrect"));

            let payload = { name: user.name, rol: user.rol, email: user.email };
            let access_token = this.jwtService.sign(payload)
            let session: SessionDto = {
                access_token: access_token,
                email: user.email,
                id: user['_id'],
                name: user.name,
                rol: user.rol,
                username: user.username
            }
            return session;
        } catch (error) {
            throw error;
        }
    }

}
