import { Injectable } from '@nestjs/common';
import { LocationsRepoService } from 'src/repos/locations-repo/locations-repo.service';

@Injectable()
export class LocationsService {

    constructor(
        private locationsRepo : LocationsRepoService
    ){}

    async countSlots(locationId: string) {
        try {
            let count = await this.locationsRepo.countSlotsInLocation(locationId)
            console.log(count);
            return count
        } catch (error) {
            throw error;
        }
    }
}
