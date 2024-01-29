import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/core/entities/user';
import { FetchEntityException } from 'src/core/exceptions/fetch-entity-exception';

@Injectable()
export class UsersRepoService {

    constructor(
        @InjectModel(User.name) private userModel : Model<User>
    ) {}

    async findByUsername(username : string) {
        try {
            let user = await this.userModel.find({ username });
            return user[0];
        } catch (error) {
            throw new FetchEntityException(error);
        }
    }
}
