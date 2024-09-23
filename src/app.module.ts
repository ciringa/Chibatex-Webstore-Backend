import { Module } from '@nestjs/common';
import { PrismaService } from './lib/prisma.service';
import { UserService } from './services/user.service';
import { inMemoryUserRepositorie } from './repositories/inMemory/user.repositorie';
import { UserController } from './controllers/user.controller';
import { ProductService } from './services/product.service';


@Module({
  imports: [],
  controllers: [UserController],
  providers: [PrismaService, UserService,inMemoryUserRepositorie, ProductService],
})
export class AppModule {}
