import {uuid} from "uuidv4";

class User {
    
    id: string;

    name: string;

    nascimento: string;

    cpf: string;

    telefone: string;

    dtc: Date; // data de criação

    dta: Date;// data de atualização

    constructor(name:string, nascimento: string, cpf: string, telefone: string, dtc: Date, dta: Date){
        this.id = uuid();
        this.name = name;
        this.nascimento = nascimento;
        this.cpf = cpf;
        this.telefone = telefone;
        this.dtc = dtc;
        this.dta = dta;
    }
}

export default User;