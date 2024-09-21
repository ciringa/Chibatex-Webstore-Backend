import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { hash } from 'bcryptjs';
import { promises } from 'dns';
import { EntityDoesNotExists } from 'src/errors/entityDoesNotExists.error';
import { triedToUpdateNonPermithedInformationError } from 'src/errors/triedToUpdateNonPermithedInformation.error';
import { PrismaService } from 'src/lib/prisma.service';

interface UserCreateUseCase{
    createdUser:User
}
interface UserUpdateRequest{
    data:Partial<User>,
    userId:string
}

@Injectable()
export class UserService {
    constructor(private prismaServices:PrismaService){}
    
    async create(data:Prisma.UserCreateInput):Promise<UserCreateUseCase>{
        const doesTheEmailIsAlreadyInUse = await this.prismaServices.user.findUnique({
            where:{
                Email:data.Email
            }
        })
        if(doesTheEmailIsAlreadyInUse){
            throw new Error("The email is already in use");
        }
        var {Email,Password,Name,Role} = data
        Password = await hash(Password,1)
        const createdUser = await this.prismaServices.user.create({
            data:{
                Email,Password,Name,Role
            }
        })
        return {
            createdUser
        }
    }
    async findById(userId:string):Promise<User>{
        const findById = await this.prismaServices.user.findUnique({
            where:{
                Id:userId
            }
        })
        if(!findById){
            throw new EntityDoesNotExists("user")
        }

        return findById
    } 
    async findByEmail(Email:string):Promise<User>{
        const findByEmail = await this.prismaServices.user.findUnique({
            where:{
                Email
            }
        })
        if(!findByEmail){
            throw new EntityDoesNotExists("user")
        }

        return findByEmail
    } 
    
    async updateUser({data,userId}:UserUpdateRequest):Promise<User>{
        //check if you're trying to update important info
        if(data.Email || data.Id){
            throw new triedToUpdateNonPermithedInformationError([data.Email,data.Id])
        }
        //check if the user exists
        const doesTheUserExists = await this.prismaServices.user.findUnique({
            where:{
                Id:userId
            }
        })
        if(!doesTheUserExists){
            throw new EntityDoesNotExists("User")
        }

        const newObject = await this.prismaServices.user.update({
            where:{
                Id:userId
            },
            data
        })

        return newObject
    }

    async deleteUser(userId:string):Promise<{Description:string,User:User}>{
        //check if the user exists
        const doesTheUserExists = await this.prismaServices.user.findUnique({
            where:{
                Id:userId
            }
        })
        if(!doesTheUserExists){
            throw new EntityDoesNotExists("User")
        }

        const deletedUser = await this.prismaServices.user.delete({
            where:{
                Id:userId
            }
        })
        return{
            Description:"successfully deleted the user",
            User:deletedUser
        }
        
    }
}
