import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll() {
    return this.productsService.getAll();
  }
  @Get('/favorite')
  getFavorite() {
    return this.productsService.getFavorites();
  }
  @Get('/latest')
  getLatest() {
    return this.productsService.getLatest();
  }
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.productsService.getOne(id);
  }
}
