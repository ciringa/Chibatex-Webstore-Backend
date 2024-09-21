import { Prisma, Role, User } from "@prisma/client";
import { userRepositorie } from "../UserRepositorie";
import { randomUUID } from "crypto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class inMemoryUserRepositorie implements userRepositorie{
    public users:User[] = []
    async create(data: Prisma.UserCreateInput){
        const _data= {
            Email:String(data.Email),
            Password:String(data.Password),
            Id:data.Id == undefined? randomUUID():String(data.Id),
            Name:String(data.Name),
            Role: data.Role as Role,
        }
        this.users.push(_data)
        return _data
    }
    async findByEmail(Email: string){
        return this.users.find(item=> item.Email == Email)
    }
    async findById(userId: string){
        return this.users.find(item=> item.Id == userId)
    }
}