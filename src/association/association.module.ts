import { Producto } from './../producto/entities/producto.entity/producto.entity';
import { Tienda } from 'src/tienda/entities/tienda.entity/tienda.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssociationService } from './association.service';
import { AssociationController } from './association.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Producto, Tienda])],
  providers: [AssociationService],
  controllers: [AssociationController],
})
export class AssociationModule {}
