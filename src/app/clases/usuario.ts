export class Usuario{

    id !: string;
    email !: string;
    tag ?: string;
    online ?: boolean;
    foto ?: string;

    constructor(id : string, email : string,tag ?: string, online ?: boolean,foto ?: string){
        this.id = id;
        this.email = email;
        this.tag = tag;
        this.online = online;
        this.foto = foto;
    }

    toJson():any{
        const json ={
            id : this.id,
            email : this.email,
            tag : this.tag,
            online : this.online,
            foto : this.foto
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