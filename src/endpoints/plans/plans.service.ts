import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PlansRepoService } from 'src/repos/plans-repo/plans-repo.service';

@Injectable()
export class PlansService {

  constructor(
    private planRepo : PlansRepoService
  ) {}

  async create(createPlanDto: CreatePlanDto) {
    try {
      await this.planRepo.create(createPlanDto)
      return { message: 'plan added' };
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.planRepo.findAll()
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      return await this.planRepo.findOne(id);
    } catch (error) {
      
    }
  }

  async update(id: string, updatePlanDto: UpdatePlanDto) {
    try {
      await this.planRepo.update(id, updatePlanDto)
      return { message: 'object updated' }
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.planRepo.remove(id);
      return { message: 'object removed' };
    } catch (error) {
      throw error;
    }
  }
}
