import { Usuario } from "./usuario";

export class Puntos{

    private id !: string;
    private nombreJuego !: string;
    private usuario !: Usuario;
    private puntaje !: number;

    constructor(id : string, nombreJuego : string, usuario : Usuario, puntaje : number){
        this.id = id,
        this.nombreJuego = nombreJuego,
        this.usuario = usuario,
        this.puntaje = puntaje
    }

    toJson():any{
        const json={
            id : this.id,
            nombreJuego : this.nombreJuego,
            usuario : this.usuario,
            puntaje : this.puntaje
        }
        return json;
    }

}