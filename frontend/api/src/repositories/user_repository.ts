import { MainDataSource } from "../../../src/database/data-source";
import { Repository } from "typeorm";
import { User } from "../../../../backend/src/entities/User";
import { createUserDto } from "../../../shared/interfaces/create_user_dto_interface";

export class UserRepository {
    private repository: Repository<User>;
    constructor() {
        this.repository = MainDataSource.getRepository(User);
    }
    async createNewUser(user: createUserDto): Promise<User | undefined> {
        const newUser = await this.repository.save(user);
        if(user) return newUser;
    }

    async getAllUsers(): Promise<User[]> {
        return await this.repository.find();
    }

    async findById(id: number): Promise<User | null> {
        return await this.repository.findOneBy({ id });
    }

    async deleteUser(id: number) {
        return await this.repository.delete({ id });
    }

    async updateUser(id: number, userColumns: Partial<User>) {
        return await this.repository.update(id, userColumns);
    }
    
    async findByEmail(email: string ): Promise<User | null> {
        const register = await this.repository.findOneBy({ email });
        return register;
    }

    async existsByEmail (email: string) {
        const existsUsername = await this.repository.findOneBy({ email });
        return !!existsUsername;
    }
    async existsByUsername (username: string){
        const existsEmail = this.repository.findOneBy({ username });
        const exists = !!existsEmail;
        return !exists;
    }
}