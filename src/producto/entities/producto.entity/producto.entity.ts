import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Tienda } from 'src/tienda/entities/tienda.entity/tienda.entity';
//import { Tienda } from '../../tienda/entities/tienda.entity';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('decimal')
  precio: number;

  @Column()
  tipo: string;

  @ManyToMany(() => Tienda, tienda => tienda.productos)
  tiendas: Tienda[];
}

