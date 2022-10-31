import { Router } from "express";
import Piu from "../models/pius";
import userRouter, { users } from "./user.routes";

const piuRouter = Router();

const pius : Piu[] = [];

piuRouter.post('/', (request, response) => {
    const { id, iduser, txt} = request.body;

    const user = users.find(user => user.id === iduser);
    if (!user){
        return response.status(404).json({message: "Não existe usuário com esse ID"});
    }

    const piu = new Piu (iduser, txt, new Date(), new Date());
    if (piu.txt == null){
        return response.status(400).json({message: "Digite um texto para o Piu!"});
    }

    if (piu.txt.length > 140){
        return response.status(400).json({message: "Os Pius só podem ter até 140 caracteres!"});
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

    if (!piu){
        return response.status(404).json({message : "Piu não encontrado"}); 
    }
    response.json(piu);
});

piuRouter.put('/:id', (request, response) => {
    const { id } = request.params;
    const { iduser, txt } = request.body;
    const piuIndex = pius.findIndex(piu => piu.id === id);

    if (piuIndex === -1){
        return response.status(404).json({message : "Usuário não encontrado"}); 
    }

    pius[piuIndex].iduser = iduser;
    if(pius.find(piu => piu.iduser === iduser && piu.id !== id)){
        return response.status(400).json({message: "Id de usuário não existe"});
    }
    
    pius[piuIndex].txt = txt;
    if(pius[piuIndex].txt.length > 140){
        return response.status(400).json({message: "Os Pius só podem ter até 140 caracteres!"})
    }
    pius[piuIndex].dta = new Date();

    return response.status(200).json({message: "Piu atualizado com sucesso"});
})

piuRouter.delete('/:id', (request, response) => {
    const { id } = request.params;
    const piuIndex = pius.findIndex(piu => piu.id === id);
    
    if (piuIndex === -1){
        return response.status(404).json({message : "Piu não encontrado"}); 
    }
    pius.splice(piuIndex, 1);
    return response.status(200).json({message: "Piu deletado!"});
});

export default piuRouter;