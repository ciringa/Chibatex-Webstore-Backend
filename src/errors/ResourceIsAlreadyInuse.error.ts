export class ResourceIsAlreadyUse extends Error{
    constructor(private Resource:string){
        super(`the ${Resource} is already in Use`)
    }
}