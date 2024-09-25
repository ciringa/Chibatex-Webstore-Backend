import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma.service';

@Injectable()
export class OrderService {
    constructor(private prisma:PrismaService){}

    async AssingNewOrder(ProdId:string,CartId:string){
        const createRef = await this.prisma.order.create({
            data:{
                CartId,
                
            }
        })
    }
    
}
