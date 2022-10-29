import { Router } from "express";
import {startOfHour, parseISO} from "date-fns";
import User from "../models/users";

const userRouter = Router();

const users : User[] = []; // estamos criando um vetor de usuários 

userRouter.post('/', (request, response) => {
    const { name, nascimento, cpf, telefone, dtc, dta } = request.body;

    if(users.find(user => user.cpf === cpf)) // tratamento de erro, não deixa repetir o email
        return response.status(400).json({message: "Este cpf já está sendo utilizado"});

    const parsedtc = startOfHour(parseISO(dtc));
    const parsedta = parseISO(dta);

    const user = new User(name, nascimento, cpf, telefone, parsedtc, parsedta);

    if(user.name === null){
        return response.status(400).json({message: "Digite o nome"});
    }
    if(user.nascimento === null){
        return response.status(400).json({message: "Digite o nascimento"});
    }
    if(user.cpf === null){
        return response.status(400).json({message: "Digite o cpf"});
    }
    if(user.telefone === null){
        return response.status(400).json({message: "Digite o telefone"});
    }

    users.push(user); // estamos adicionando o novo usuário no vetor 
    return response.json(user);
});

userRouter.get('/', (request, response) => {
    return response.json(users);
});

// aqui vamos procurar um usuário com um id específico
userRouter.get('/:id', (request, response) => { 
    const { id } = request.params;
    const user = users.find(user => user.id === id);
    if (!user) // caso não encontre, retorna esse erro 
        return response.status(404).json({message : "Usuário não encontrado"}); 
    response.json(user);
});

export default userRouter;