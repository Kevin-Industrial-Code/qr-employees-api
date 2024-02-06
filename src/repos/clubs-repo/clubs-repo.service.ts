import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Club } from 'src/core/entities/club';
import { ListEntityException } from 'src/core/exceptions/list-entity-exception';
import { clubData } from 'src/endpoints/clubs/dtos/club-data';
import { Location } from "../../core/entities/location";
import { FetchEntityException } from 'src/core/exceptions/fetch-entity-exception';
import { UpdateEntityException } from 'src/core/exceptions/update-entity-exception';


@Injectable()
export class ClubsRepoService {

    constructor(
        @InjectModel(Club.name) private model: Model<Club>,
        @InjectModel(Location.name) private locationModel: Model<Location>
    ) { }

    async listClubsByAdminId(adminId: string) {
        try {
            let clubs = await this.model.find({ adminId: new Types.ObjectId(adminId) });
            let clubsData: Array<clubData> = [];
            for (let club of clubs) {
                let locations = await this.locationModel.find({ clubId: new Types.ObjectId(club.id), status: true })
                clubsData.push({ club, locations })
            }
            return clubsData;
        } catch (error) {
            throw new ListEntityException(error);
        }
    }

    async findClub(clubId: string) {
        try {
            let club = await this.model.findById(clubId);
            return club;
        } catch (error) {
            throw new FetchEntityException(error);
        }
    }

    async findAllClubs() {
        try {
            let clubs = await this.model.find({emailForgottenItems: false}, ['closingHour', 'name', 'openingHour']);
            return clubs;
        } catch (error) {
            throw new ListEntityException(error);
        }
    }

    async enableEmailForgottenItems(clubId: string): Promise<Club> {
        try {
          const updatedClub = await this.model.findByIdAndUpdate(
            clubId,
            { $set: { emailForgottenItems: true } },
            { new: true }
          );
          
          if (!updatedClub) {
            throw new UpdateEntityException('Club not found or unable to update');
          }
    
          return updatedClub;
        } catch (error) {
          throw new UpdateEntityException(error.message);
        }
      }
}
