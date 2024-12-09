import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipment } from './equipment.entity';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment)
    private equipmentRepository: Repository<Equipment>,
  ) {}

  create(createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentRepository.save(createEquipmentDto);
  }

  findAll() {
    return this.equipmentRepository.find();
  }

  findOne(id: number) {
    return this.equipmentRepository.findOne({
      where: { id }
    });
  }

  async update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    const equipment = await this.equipmentRepository.findOne({
      where: { id }
    });

    if (!equipment) {
      throw new NotFoundException(`Equipment with ID ${id} not found`);
    }

    return this.equipmentRepository.save({
      ...equipment,
      ...updateEquipmentDto,
    });
  }

  async remove(id: number) {
    const equipment = await this.findOne(id);
    if (!equipment) {
      throw new NotFoundException(`Equipment with ID ${id} not found`);
    }
    return this.equipmentRepository.remove(equipment);
  }
}