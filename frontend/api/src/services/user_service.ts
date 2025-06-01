import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user_repository";
import { createUserDto } from "../../../shared/interfaces/create_user_dto_interface";
import { UserAlreadyExistsError } from "../../Errors/AlreadyExistsUser";
import { exists } from "fs";

type User = {
    username: string;
    email: string;
    phone: string;
    password: string;
}

export class UserService {
    private userRepository = new UserRepository();

    async getAll() {
        const allUsers = await this.userRepository.getAllUsers();
        return allUsers;
    }

    async findById(id: number) {
        const registerById = await this.userRepository.findById(id);
        return registerById;
    }

    async findByEmail(email: string): Promise<User>{
        const user = await this.userRepository.findByEmail(email);
        if(!user) throw new Error(`Not found the following user: [ ${email} ]`)
        return user;
    }

    async createUser(dataUser: createUserDto)  {
        const emailExists = await this.userRepository.existsByEmail(dataUser.email);
        const usernameExists = await this.userRepository.existsByUsername(dataUser.username);
    
        if(emailExists || usernameExists) {
            const existsList = [];
            if(emailExists) existsList.push('email');
            if(usernameExists) existsList.push('username');
            
            throw new Error (`User already exists: ${existsList.join(', ')}`);
        } 
        try {
            const hashPassword = await bcrypt.hash(dataUser.password, 8);
            const userToSave = {
                ...dataUser,
                password: hashPassword
            };
            const newUser = await this.userRepository.createNewUser(userToSave);
            return newUser;
        }
        catch (error) {
            throw new Error(`Error server side: ${error}`)
        }
    }
}