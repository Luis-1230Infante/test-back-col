import { Tienda } from 'src/tienda/entities/tienda.entity/tienda.entity';
import { Producto } from './../producto/entities/producto.entity/producto.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class AssociationService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
    @InjectRepository(Tienda)
    private tiendaRepository: Repository<Tienda>,
  ) {}

  async addStoreToProduct(productoId: number, tiendaId: number): Promise<void> {
    const producto = await this.productoRepository.findOne({ where: { id: productoId }, relations: ['tiendas'] });
    const tienda = await this.tiendaRepository.findOne({ where: { id: tiendaId } });
    if (!producto || !tienda) {
      throw new NotFoundException('Producto o Tienda no encontrados');
    }
    producto.tiendas.push(tienda);
    await this.productoRepository.save(producto);
  }

  async findStoresFromProduct(productoId: number): Promise<Tienda[]> {
    const producto = await this.productoRepository.findOne({ where: { id: productoId }, relations: ['tiendas'] });
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }
    return producto.tiendas;
  }

  async findStoreFromProduct(productoId: number, tiendaId: number): Promise<Tienda> {
    const producto = await this.productoRepository.findOne({ where: { id: productoId }, relations: ['tiendas'] });
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }
    const tienda = producto.tiendas.find(t => t.id === tiendaId);
    if (!tienda) {
      throw new NotFoundException('Tienda no encontrada');
    }
    return tienda;
  }

  async updateStoresFromProduct(productoId: number, tiendaIds: number[]): Promise<void> {
    const producto = await this.productoRepository.findOne({ where: { id: productoId }, relations: ['tiendas'] });
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }
    const tiendas = await this.tiendaRepository.findByIds(tiendaIds);
    producto.tiendas = tiendas;
    await this.productoRepository.save(producto);
  }

  async deleteStoreFromProduct(productoId: number, tiendaId: number): Promise<void> {
    const producto = await this.productoRepository.findOne({ where: { id: productoId }, relations: ['tiendas'] });
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }
    producto.tiendas = producto.tiendas.filter(t => t.id !== tiendaId);
    await this.productoRepository.save(producto);
  }
}
