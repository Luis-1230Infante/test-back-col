import { Tienda } from 'src/tienda/entities/tienda.entity/tienda.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class TiendaService {
  constructor(
    @InjectRepository(Tienda)
    private tiendaRepository: Repository<Tienda>,
  ) {}

  findAll(): Promise<Tienda[]> {
    return this.tiendaRepository.find();
  }

  findOne(id: number): Promise<Tienda> {
    return this.tiendaRepository.findOne({ where: { id } });
  }

  async create(tienda: Tienda): Promise<Tienda> {
    if (!/^[A-Z]{3}$/.test(tienda.ciudad)) {
      throw new Error('Código de ciudad no válido');
    }
    return this.tiendaRepository.save(tienda);
  }

  async update(id: number, tienda: Tienda): Promise<Tienda> {
    const existingTienda = await this.tiendaRepository.findOne({ where: { id } });
    if (!existingTienda) {
      throw new NotFoundException(`Tienda con ID ${id} no encontrada`);
    }
    if (!/^[A-Z]{3}$/.test(tienda.ciudad)) {
      throw new Error('Código de ciudad no válido');
    }
    await this.tiendaRepository.update(id, tienda);
    return this.tiendaRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    const result = await this.tiendaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tienda con ID ${id} no encontrada`);
    }
  }
}
