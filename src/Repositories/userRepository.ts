import User from "../models/users";

class UserRepostory {
    private users : User[];

    constructor() {
        this.users = [];
    }

    public create(name: string, nascimento: string, cpf: string, 
        telefone: string, dtc: Date, dta: Date) : User {
        const user = new User (name, nascimento, cpf, telefone, dtc, dta);
        this.users.push(user);
        return user;
    }
}

export default UserRepostory;