import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";

 export interface userRepositorie{
    create(data:Prisma.UserCreateInput):Promise<User>
    findById(userId:string):Promise<User | null>
    findByEmail(Email:string):Promise<User | null> 
 }