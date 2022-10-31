import { Router } from "express";
import User from "../models/users";

const userRouter = Router();

 export const users : User[] = []; // estamos criando um vetor de usuários 

userRouter.post('/', (request, response) => {
    const { name, nascimento, cpf, telefone} = request.body;

    if(users.find(user => user.cpf === cpf)){
        return response.status(400).json({message: "Este cpf já está sendo utilizado"});
    }

    const user = new User(name, nascimento, cpf, telefone, new Date(), new Date());
    if(user.name.length === 0){
        return response.status(400).json({message: "Preencha o nome!"});
    }
    if(user.nascimento.length === 0){
        return response.status(400).json({message: "Preencha o nascimento!"});
    }
    if(user.cpf === null ){
        return response.status(400).json({message: "Preencha o cpf!"});
    }
    if(user.cpf.length < 9){
        return response.status(400).json({message: "Cpf não tem caracteres suficientes!"});
    }
    if(user.telefone.length === 0){
        return response.status(400).json({message: "Preencha o telefone!"});
    }
    if(user.telefone.length < 9){
        return response.status(400).json({message: "Telefone não tem caracteres suficientes!"});
    }

    users.push(user); 
    return response.json(user);
});

userRouter.get('/', (request, response) => {
    return response.json(users);
});

userRouter.get('/:id', (request, response) => { 
    const { id } = request.params;
    const user = users.find(user => user.id === id);
    if (!user) 
        return response.status(404).json({message : "Usuário não encontrado"}); 
    response.json(user);
});

userRouter.put('/:id', (request, response) => {
    const { id } = request.params;
    const {name, nascimento, cpf, telefone} = request.body;
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1){
        return response.status(404).json({message : "Usuário não encontrado"}); 
    }

    users[userIndex].name = name;
    users[userIndex].nascimento = nascimento;
    if(users.find(user => user.cpf === cpf && user.id !== id)){
        return response.status(400).json({message: "Cpf já está sendo utilizado"});
    }
    users[userIndex].cpf = cpf;
    users[userIndex].telefone = telefone;
    users[userIndex].dta = new Date();

    return response.status(200).json({massage: "Dados do usuário atualizados com sucesso"});
});

userRouter.delete('/:id', (request, response) => {
    const { id } = request.params;
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1){
        return response.status(404).json({message : "Usuário não encontrado"}); 
    }
    users.splice(userIndex, 1);
    return response.status(200).json({message: "Usuário Deletado"});
});

export default userRouter;