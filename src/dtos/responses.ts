import { Product, User } from "@prisma/client";

export interface DefaultUserResponse{
    StatusCode:number,
    Description:string,
    response:User | undefined
}


export interface DefaultProductResponse{
    StatusCode:number,
    Description:string,
    response:Product | undefined
}