import { Controller, Get, Param, Post } from '@nestjs/common';
import { Order } from '@prisma/client';
import { DefaultCartResponse } from 'src/dtos/responses';
import { EntityDoesNotExists } from 'src/errors/entityDoesNotExists.error';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { deoptional } from 'zod';

@Controller('shoppCart')
export class ShoppinCartController {
    constructor(private Service:ShoppingCartService){}

    @Get("/Id/:Id")
    async GetCartById(@Param("Id") Id:string):Promise<DefaultCartResponse>{
        try{
            const base = await this.Service.GetById(Id)
            return {
                Description:"Succesfully returned the user",
                response:base,
                StatusCode:200
            }
        }catch(err){
            if(err instanceof EntityDoesNotExists){
                return{
                    Description:err.message,
                    response:undefined,
                    StatusCode:404
                }
            }
        }
    }

    @Get("/User/:UserId")
    async GetCartByUserOwner(@Param("UserId") UserId:string):Promise<DefaultCartResponse>{
        try{
            const base = await this.Service.GetByUser(UserId)
            return {
                Description:"Succesfully returned the user's cart",
                response:base,
                StatusCode:200
            }
        }catch(err){
            if(err instanceof EntityDoesNotExists){
                return{
                    Description:err.message,
                    response:undefined,
                    StatusCode:404
                }
            }
        }
    }

    @Get("/Prod/list/:Id")
    async GetOrderListByCart(@Param("Id") Id:string):Promise<{Description:string,StatusCode:number,response:Order[]}>{
        try{
            const pe = await this.Service.GetProdList(Id)
            if(pe[0]){
                return{
                    Description:"Successfully returned cart shopping list",
                    response:pe,
                    StatusCode:200
                }
            }
        }catch(err){
            if(err instanceof EntityDoesNotExists){
                return{
                    Description:err.message,
                    response:undefined,
                    StatusCode:404
                }
            }
        }
    }
}
