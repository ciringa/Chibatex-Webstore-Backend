export class triedToUpdateNonPermithedInformationError extends Error{
    constructor(private information:string[]){
        super(`thied to update sensitive informations, remove the following properties from your request:${information}`)
    }
}