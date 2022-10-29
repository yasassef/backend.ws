import {uuid} from "uuidv4";

class Piu {
    id: string;

    iduser: string;

    txt: string;

    dtc: Date;

    dta: Date;

    constructor(iduser: string, txt: string, dtc: Date, dta: Date){
        this.id = uuid();
        this.iduser = iduser;
        this.txt = txt;
        this.dtc = dtc;
        this.dta = dta;
    } 
}

export default Piu;