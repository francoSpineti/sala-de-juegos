export class Encuesta {

    nombre : string = "";
    apellido : string = "";
    email : string = "";
    edad : number = 0;
    telefono : number = 0;
    pregunta1 : string = "";
    pregunta2 : string = "";
    pregunta3 : string = "";

    constructor(nombre : string,apellido : string,email : string,edad : number,telefono : number, pregunta1 : string, pregunta2 : string, pregunta3 : string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.edad = edad;
        this.telefono = telefono;
        this.pregunta1 = pregunta1;
        this.pregunta2 = pregunta2;
        this.pregunta3 = pregunta3;
    }

    toJson() : any{
        const json ={
            nombre : this.nombre,
            apellido : this.apellido,
            edad : this.edad,
            email : this.email,
            telefono : this.telefono,
            pregunta1 : this.pregunta1,
            pregunta2 : this.pregunta2,
            pregunta3 : this.pregunta3
        };
        return json;
    }
}
