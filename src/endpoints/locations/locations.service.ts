import { Injectable } from '@nestjs/common';

@Injectable()
export class LocationsService {

    async countSlots(locationId: string) {
        throw new Error('Method not implemented.');
    }
}
