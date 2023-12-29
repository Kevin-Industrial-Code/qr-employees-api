import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Club } from 'src/core/entities/club';
import { ListEntityException } from 'src/core/exceptions/list-entity-exception';
import { clubData } from 'src/endpoints/clubs/dtos/club-data';
import { Location } from "../../core/entities/location";


@Injectable()
export class ClubsRepoService {

    constructor(
        @InjectModel(Club.name) private model : Model<Club>,
        @InjectModel(Location.name) private locationModel : Model<Location>
    ) {}

    async listClubsByAdminId(adminId : string) {
        try {
            let clubs = await this.model.find({ adminId: new Types.ObjectId(adminId) });
            let clubsData : Array<clubData> = [];
            for(let club of clubs) {
                let locations = await this.locationModel.find({ clubId: new Types.ObjectId(club.id), status: true })
                clubsData.push({ club, locations })
            }
            return clubsData;
        } catch (error) {
            throw new ListEntityException(error);
        }
    }
}
