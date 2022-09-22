export class Chat {
    id !: string;
    mensaje : string = "";
    //hora : string = new Date().toLocaleTimeString();
    email : string = "";
    tag : string = "";
    foto : string = "";
    fechaYHora : string = new Date().toUTCString();  
}
  