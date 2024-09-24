import { Injectable } from '@nestjs/common';
import { Order, Prisma, ShoppingCart } from '@prisma/client';
import { EntityDoesNotExists } from 'src/errors/entityDoesNotExists.error';
import { PrismaService } from 'src/lib/prisma.service';

@Injectable()
export class ShoppingCartService {
    constructor(private prisma:PrismaService){}
    async create(data:Prisma.ShoppingCartUncheckedCreateInput):Promise<ShoppingCart>{
        const doesTheUserExists = await this.prisma.user.findMany({
            where:{
                Id:data.UserId
            }
        })
        if(!doesTheUserExists){
            throw new EntityDoesNotExists("User")
        }

        const createObject = await this.prisma.shoppingCart.create({
            data
        })
        return createObject
    }

    async GetById(Id:string):Promise<ShoppingCart>{
        const doesTheIdExists = await this.prisma.shoppingCart.findUnique({
            where:{
                Id
            }
        })
        if(!doesTheIdExists){
            throw new EntityDoesNotExists("Shopping cart")
        }

        return doesTheIdExists
    }

    async GetByUser(UserId:string):Promise<ShoppingCart>{
        const doesTheUserExists = await this.prisma.user.findUnique({
            where:{
                Id:UserId
            }
        })
        if(!doesTheUserExists){
            throw new EntityDoesNotExists("user")
        }

        return await this.prisma.shoppingCart.findUnique({
            where:{
                UserId
            }
        })
    }
    
    async GetProdList(Id:string):Promise<Order[]>{
        const doesTheCartExists = await this.prisma.shoppingCart.findUnique({
            where:{
                Id
            }
        })

        if(!doesTheCartExists){
            throw new EntityDoesNotExists("Shopping Cart")
        }

        return await this.prisma.order.findMany({
            where:{
                CartId:Id
            }
        })
    }

}
