import { Tienda } from 'src/tienda/entities/tienda.entity/tienda.entity';
import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { AssociationService } from './association.service';


@Controller('products/:productId/stores')
export class AssociationController {
  constructor(private readonly associationService: AssociationService) {}

  @Post(':storeId')
  addStoreToProduct(@Param('productId') productId: number, @Param('storeId') storeId: number): Promise<void> {
    return this.associationService.addStoreToProduct(productId, storeId);
  }

  @Get()
  findStoresFromProduct(@Param('productId') productId: number): Promise<Tienda[]> {
    return this.associationService.findStoresFromProduct(productId);
  }

  @Get(':storeId')
  findStoreFromProduct(@Param('productId') productId: number, @Param('storeId') storeId: number): Promise<Tienda> {
    return this.associationService.findStoreFromProduct(productId, storeId);
  }

  @Put()
  updateStoresFromProduct(@Param('productId') productId: number, @Body() storeIds: number[]): Promise<void> {
    return this.associationService.updateStoresFromProduct(productId, storeIds);
  }

  @Delete(':storeId')
  deleteStoreFromProduct(@Param('productId') productId: number, @Param('storeId') storeId: number): Promise<void> {
    return this.associationService.deleteStoreFromProduct(productId, storeId);
  }
}
