import { Module } from '@nestjs/common';
import { PrismaService } from './lib/prisma.service';
import { UserService } from './services/user.service';
import { inMemoryUserRepositorie } from './repositories/inMemory/user.repositorie';
import { UserController } from './controllers/user.controller';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { OrderService } from './services/order.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ShoppinCartController } from './controllers/shopping-cart.controller';


@Module({
  imports: [],
  controllers: [UserController, ProductController, ShoppinCartController],
  providers: [PrismaService, UserService,inMemoryUserRepositorie,ProductService, OrderService, ShoppingCartService],

})
export class AppModule {}
