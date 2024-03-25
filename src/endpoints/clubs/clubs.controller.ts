import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { Club } from 'src/core/entities/club';
import { Exception } from 'src/core/shared/exception';
import { clubData } from './dtos/club-data';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/guards/auth/auth.guard';

@UseGuards(AuthGuard)
@ApiTags('Clubs')
@Controller('clubs')
export class ClubsController {

  constructor(private readonly clubsService: ClubsService) {}

  @Get()
  async getClubs(@Query('adminId') adminId: string) {
    return new Promise<Array<clubData>>((resolve, reject) => {
      this.clubsService.listClubsByAdminId(adminId)
      .then((result) => {
        resolve(result);
      }).catch((err : Exception) => {
        reject(err);
      });
    });
  }

  @Get(':id')
  async getClubData(@Param('id') clubId : string) {
    return new Promise<Club>((resolve, reject) => {
      this.clubsService.getClub(clubId)
      .then((result) => {
        resolve(result);
      }).catch((err : Exception) => {
        reject(err);
      });
    })
  }
}
