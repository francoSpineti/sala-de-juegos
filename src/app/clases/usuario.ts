export class Usuario{

    private id !: string;
    private email !: string;
    private contraseña !: string;

    constructor(id : string, email : string, contraseña : string){
        this.id = id;
        this.email = email;
        this.contraseña = contraseña;
    }

    toJson():any{
        const json ={
            id : this.id,
            email : this.email
        }
        return json;
    }

    public getID():string{
        return this.id;
    }

    public getEmail():string{
        return this.email;
    }
}