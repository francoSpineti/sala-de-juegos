export class Puntos{

    id !: string;
    nombreJuego !: string;
    email !: string;
    tag !: string;
    puntaje !: number;

    constructor(id : string, nombreJuego : string, email : string, tag : string, puntaje : number){
        this.id = id,
        this.nombreJuego = nombreJuego,
        this.email = email,
        this.tag = tag,
        this.puntaje = puntaje
    }

    toJson():any{
        const json={
            id : this.id,
            nombreJuego : this.nombreJuego,
            email : this.email,
            tag : this.tag,
            puntaje : this.puntaje
        }
        return json;
    }

}