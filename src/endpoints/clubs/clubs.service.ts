import { Injectable } from '@nestjs/common';
import { ClubsRepoService } from 'src/repos/clubs-repo/clubs-repo.service';

@Injectable()
export class ClubsService {

    constructor(
        private clubsRepo: ClubsRepoService,
    ) { }

    async listClubsByAdminId(adminId: string) {
        try {
            let clubs = await this.clubsRepo.listClubsByAdminId(adminId)
            return clubs;
        } catch (error) {
            throw error;
        }
    }

    async getClub(clubId: string) {
        try {
            let club = await this.clubsRepo.findClub(clubId);
            return club;
        } catch (error) {
            throw error;
        }
    }
}
