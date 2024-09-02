import { Tienda } from 'src/tienda/entities/tienda.entity/tienda.entity';
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TiendaService } from './tienda.service';


@Controller('stores')
export class TiendaController {
  constructor(private readonly tiendaService: TiendaService) {}

  @Get()
  findAll(): Promise<Tienda[]> {
    return this.tiendaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Tienda> {
    return this.tiendaService.findOne(id);
  }

  @Post()
  create(@Body() tienda: Tienda): Promise<Tienda> {
    return this.tiendaService.create(tienda);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() tienda: Tienda): Promise<Tienda> {
    return this.tiendaService.update(id, tienda);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.tiendaService.delete(id);
  }
}
