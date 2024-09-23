import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { query } from 'express';
import { EntityDoesNotExists } from 'src/errors/entityDoesNotExists.error';
import { ResourceIsAlreadyUse } from 'src/errors/ResourceIsAlreadyInuse.error';
import { PrismaService } from 'src/lib/prisma.service';

@Injectable()
export class ProductService {
    constructor(private readonly prismaServices:PrismaService){}

    async create(data:Prisma.ProductCreateInput):Promise<Product>{
        const doesTheProductTitleExists = await this.prismaServices.product.findUnique({
            where:{
                Title:data.Title
            }
        })
        if(doesTheProductTitleExists){
            throw new ResourceIsAlreadyUse("Title")
        }
        const createObject = await this.prismaServices.product.create({
            data
        })

        return createObject
    }

    async GetByTitle(Title:string):Promise<Product|null>{
        const doesTheTitleExists = await this.prismaServices.product.findUnique({
            where:{
                Title,
            }
        })
        if(doesTheTitleExists){
            return doesTheTitleExists
        }else{
            return null
        }
    }

    async GetById(Id:number):Promise<Product|null>{
        const doesTheIdExists = await this.prismaServices.product.findUnique({
            where:{
                Id,
            }
        })
        if(doesTheIdExists){
            return doesTheIdExists
        }else{
            return null
        }
    }

    async updateProduct(prodId:number,data:Partial<Product>):Promise<Product>{
        const doesTheNewTitleExists = data.Title!=null ? await this.prismaServices.product.findUnique({
            where:{
                Title: data.Title
            }
        }) : null
        const doesTheProductExists = await this.prismaServices.product.findUnique({
            where:{
                Id:prodId
            }
        })
        if(!doesTheProductExists){
            throw new EntityDoesNotExists("Product")
        }
        if(doesTheNewTitleExists){
            throw new ResourceIsAlreadyUse("Title")
        }
        const updatedProd = await this.prismaServices.product.update({
            where:{
                Id:prodId
            },
            data
        })

        return updatedProd
    }

    async deleteProduct(prodId:number):Promise<Product>{
        const doesTheProductExists = await this.prismaServices.product.findUnique({
            where:{
                Id:prodId
            }
        })
        if(!doesTheProductExists){
            throw new EntityDoesNotExists("Product")
        }
        const de = await this.prismaServices.product.delete({
            where:{
                Id:prodId
            }        
        })
        return de
    }

    async getProductQuerySearch(Query:string,Page:number):Promise<Product[]>{
        const ReturnQuery = await this.prismaServices.product.findMany({
            where:{
                Title:{
                    contains:Query
                }
            },
            take:Page*20,//pega os resultados de 20 em 20
            skip:(Page-1)*20//pula os primeiros 20 resultados
        })

        return ReturnQuery
    }
    async getProductByCompany(Company:string):Promise<Product[]>{
        const ProdList = await this.prismaServices.product.findMany({
            where:{
                Company
            }
        })
        return ProdList
    }
}
