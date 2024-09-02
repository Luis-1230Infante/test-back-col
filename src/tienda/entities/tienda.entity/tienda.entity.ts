import { Producto } from './../../../producto/entities/producto.entity/producto.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
//import { Producto } from '../../producto/entities/producto.entity';

@Entity()
export class Tienda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  ciudad: string;

  @Column()
  direccion: string;

  @ManyToMany(() => Producto, producto => producto.tiendas)
  @JoinTable()
  productos: Producto[];
}

