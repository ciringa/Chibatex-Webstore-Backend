import { Controller, Delete, Get, Param, Post, Put, Req, Res, Response } from '@nestjs/common';
import { User } from '@prisma/client';
import { DefaultUserResponse } from 'src/dtos/responses';
import { EntityDoesNotExists } from 'src/errors/entityDoesNotExists.error';
import { ResourceIsAlreadyUse } from 'src/errors/ResourceIsAlreadyInuse.error';
import { UserService } from 'src/services/user.service';
import { string, z } from 'zod';



@Controller('user')
export class UserController {
    constructor(private UserServices:UserService){}
    
    @Post("/create")
    async create(@Req() req:Request):Promise<DefaultUserResponse>{
        const {Email,Name,Password,Role} = z.object({
            Name:z.string().optional(),
            Email:z.string().email(),
            Password:z.string(),
            Role:z.enum(["ADMIN","MANAGER","CLIENT"]).default('CLIENT')
        }).parse(req.body)  
        
        try{
            const response = await this.UserServices.create({
                Email,Password,Name,Role
            })

            return {
                StatusCode:201,
                Description:"Successfilly created a user",
                response:response.createdUser
            }
        }catch(err){
            if( err instanceof ResourceIsAlreadyUse){
                return {
                    StatusCode: 409,
                    Description:"This email adress is already in use",
                    response:undefined
                }
            }
        }
    }

    @Get("/find/id/:userId")
    async GetUserById(@Param("userId") userId:string,@Req() req:Request, @Res() res: Response):Promise<DefaultUserResponse>{
        const UserId = z.string().parse(userId)

        try{
            const response = await this.UserServices.findById(UserId)
            return {
                Description:"Successfully returned the user",
                response,
                StatusCode:200
            }
        }catch(err){
            if( err instanceof EntityDoesNotExists ){
                return {
                    Description:"Cant find this userId",
                    response:null,
                    StatusCode:404
                }
            }
        }

    }

    @Get("/find/email/:Email")
    async GetUserByEmail(@Param("Email") Email:string,@Req() req:Request, @Res() res: Response):Promise<DefaultUserResponse>{
        const _Email = z.string().parse(Email)

        try{
            const response = await this.UserServices.findByEmail(_Email)
            return {
                Description:"Successfully returned the user",
                response,
                StatusCode:200
            }
        }catch(err){
            if( err instanceof EntityDoesNotExists ){
                return {
                    Description:"Cant find any user with this specified Email adress",
                    response:null,
                    StatusCode:404
                }
            }
        }
    }

    @Delete("/delete/:id")
    async DeleteUserById(@Param("id") userId:string):Promise<DefaultUserResponse>{
        const Id = z.string().parse(userId)
        try{
            const response = (await this.UserServices.deleteUser(Id)).User
            return{
                Description:"Successfully deleted the user",
                response,
                StatusCode:204
            }
        }catch(err){
            if(err instanceof EntityDoesNotExists){
                return {
                    Description:"The specified user does not exists or already has been deleted",
                    response:null,
                    StatusCode:404
                }
            }
        }
    }

    @Put("/update/:id")
    async UpdateUserById(@Param("id") userId:string, @Req() req:Request):Promise<DefaultUserResponse>{
        const {Name,Password,Role} = z.object({
            Name:z.string().optional(),
            Password:z.string().optional(),
            Role:z.enum(["ADMIN","MANAGER","CLIENT"]).default('CLIENT').optional()
        }).parse(req.body)

        try{
            const response = await this.UserServices.updateUser({userId,data:{
                Name,Password,Role
            }})
            return {
                Description:"Successfully updated the user",
                response,
                StatusCode:201
            }
        }catch(err){
            if( err instanceof EntityDoesNotExists ){
                return {
                    Description:"Cant find this userId",
                    response:null,
                    StatusCode:404
                }
            }
        }
    }

}
