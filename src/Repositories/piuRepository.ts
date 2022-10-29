import Piu from "../models/pius";
import {uuid} from "uuidv4";

class PiuRepository {
    public pius : Piu[];

    constructor() {
        this.pius = [];
    }

    public create(iduser: string, txt: string, dtc: Date, dta: Date) : Piu {
        const piu = new Piu (iduser, txt, dtc, dta);
        this.pius.push(piu);
        return piu;
    }
}
export default PiuRepository;