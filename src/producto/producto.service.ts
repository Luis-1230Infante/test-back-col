import { Producto } from './entities/producto.entity/producto.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}

  findAll(): Promise<Producto[]> {
    return this.productoRepository.find();
  }

  findOne(id: number): Promise<Producto> {
    return this.productoRepository.findOne({ where: { id } });
  }

  async create(producto: Producto): Promise<Producto> {
    if (!['Perecedero', 'No perecedero'].includes(producto.tipo)) {
      throw new Error('Tipo de producto no válido');
    }
    return this.productoRepository.save(producto);
  }

  async update(id: number, producto: Producto): Promise<Producto> {
    const existingProducto = await this.productoRepository.findOne({ where: { id } });
    if (!existingProducto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    if (!['Perecedero', 'No perecedero'].includes(producto.tipo)) {
      throw new Error('Tipo de producto no válido');
    }
    await this.productoRepository.update(id, producto);
    return this.productoRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    const result = await this.productoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
  }
}
