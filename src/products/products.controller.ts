import { Body, Controller, Delete, Get, Param, Patch, Post, Put, SetMetadata, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { Products } from "./entities/product.entity";
import { updateProductDto } from "./dto/update-product.dto";
import { RolesGuard } from "src/guards/role.guard";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { Permissions, Roles } from "src/decorators/roles.decorator";
import { RequirePermissions } from "src/decorators/permission.decorator";
import { PermissionGuard } from "src/guards/permission.guard";
import { AuthGuard } from "src/guards/auth.guard";

@Controller('products')
// @UseGuards(JwtAuthGuard, AuthGuard, )
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin', 'manager', 'visitor')
  @Permissions('read:product')
  findAll(): Promise<Products[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles('admin', 'manager', 'visitor')
  @Permissions('read:product')
  findOne(@Param('id') id: string): Promise<Products> {
    return this.productsService.findOne(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin', 'manager')
  @RequirePermissions('create:products')
  create(@Body() createProductsDto: CreateProductDto, @Body('categorieId') categorieId: number): Promise<Products> {
    return this.productsService.create(createProductsDto);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('admin', 'manager')
  @RequirePermissions('updateOne:products')
  updateOne(@Param('id') id, @Body() updateProductsDto: updateProductDto): Promise<Products> {
    return this.productsService.update(id, updateProductsDto);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('admin', 'manager')
  @RequirePermissions('update:products')
  update(@Param('id') id: string, @Body() updateProductDto: updateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin', 'manager')
  @RequirePermissions('delete:products')
  remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(id);
  }//✅
}
