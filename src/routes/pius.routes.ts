import { Router } from "express";
import {startOfHour, parseISO} from "date-fns";
import Piu from "../models/pius";

const piuRouter = Router();

const pius : Piu[] = [];

piuRouter.post('/', (request, response) => {
    const { id, iduser, txt, dtc, dta} = request.body;
    const parsedtc = startOfHour(parseISO(dtc));
    const parsedta = parseISO(dta);

    const piu = new Piu (iduser, txt, parsedtc, parsedta);
    
    if (piu.txt == null){
        return response.status(400).json({ message: "Digite o texto do Piu"});
    }
    
    pius.push(piu);
    return response.json(piu);
});

piuRouter.get('/', (resquest, response) => {
    return response.json(pius);
});

piuRouter.get('/:id', (request, response) => {
    const { id } = request.params;
    const piu = pius.find(piu => piu.id === id);
    if (!piu) // caso não encontre, retorna esse erro 
        return response.status(404).json({message : "Piu não encontrado"}); 
    response.json(piu);
});

export default piuRouter;