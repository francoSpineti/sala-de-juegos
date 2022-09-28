export class Usuario{

    id !: string;
    email !: string;
    tag ?: string;
    online ?: boolean;
    foto ?: string;
    perfil ?: string;

    constructor(id : string, email : string,tag ?: string, online ?: boolean,foto ?: string, perfil ?: string){
        this.id = id;
        this.email = email;
        this.tag = tag;
        this.online = online;
        this.foto = foto;
        this.perfil = perfil;
    }

    toJson():any{
        const json ={
            id : this.id,
            email : this.email,
            tag : this.tag,
            online : this.online,
            foto : this.foto,
            perfil : this.perfil
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