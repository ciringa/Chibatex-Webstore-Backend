export class EntityDoesNotExists extends Error{
    constructor(private Entity:string){
        super(`the ${Entity} does not exists`)
    }
}