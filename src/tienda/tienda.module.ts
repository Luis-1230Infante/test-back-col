import { Tienda } from 'src/tienda/entities/tienda.entity/tienda.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { Tienda } from './entities/tienda.entity';
// import { TiendaService } from './tienda.service';
// import { TiendaController } from './tienda.controller';
import { TiendaService } from './tienda.service';
import { TiendaController } from './tienda.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tienda])],
  providers: [TiendaService],
  controllers: [TiendaController],
})
export class TiendaModule {}
