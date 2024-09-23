import { Body, Controller, Param, Post, Put, Req } from '@nestjs/common';
import { Product } from '@prisma/client';
import { DefaultProductResponse } from 'src/dtos/responses';
import { EntityDoesNotExists } from 'src/errors/entityDoesNotExists.error';
import { ResourceIsAlreadyUse } from 'src/errors/ResourceIsAlreadyInuse.error';
import { ProductService } from 'src/services/product.service';
import { string, z } from 'zod';

@Controller('product')
export class ProductController {
    constructor(private Service:ProductService){}

    @Post("/create")
    async PostProduct(@Req() req:Request):Promise<DefaultProductResponse>{
        const {Company,Title} = z.object({
            Title: z.string(),
            Company:z.string()
        }).parse(req.body)

        try{
            const m = await this.Service.create({
                Title,Company
            })
            if(m){
                return {
                    Description:"Sucessfully created the user",
                    StatusCode:201,
                    response:m,
     
                }
            }else{
                return{
                    Description:"Cant create the user",
                    StatusCode:400,
                    response:null,

                }
            }
        }catch(err){
            if(err instanceof ResourceIsAlreadyUse){
                return{
                    Description:`${err.message}`,
                    StatusCode:400,
                    response:null
                }
            }
        }
    }

    @Put("/update/:Pid")
    async UpdateProduct(@Param("Pid") Pid:string, @Req() req:Request):Promise<DefaultProductResponse>{
        const {Company,Title} = z.object({
            Title: z.string(),
            Company:z.string()
        }).parse(req.body)
        try{
            const result = await this.Service.updateProduct(Number(Pid),{
                Company,Title
            })
            if(result){
                return {
                    Description:"Successfully updated the user",
                    response:result,
                    StatusCode:201
                }
            }else{
                return{
                    Description:"cant update the user",
                    response:null,
                    StatusCode:400
                }
            }
        }catch(err){
            if(err instanceof EntityDoesNotExists){
                return{
                    Description:`${err.message}`,
                    response:null,
                    StatusCode:404
                }
            }
            if(err instanceof ResourceIsAlreadyUse){
                return{
                    Description:`${err.message}`,
                    response:null,
                    StatusCode:403
                }
            }
        }
    }
}
