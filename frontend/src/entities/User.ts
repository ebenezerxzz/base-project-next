import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity('user')
export class User {
    constructor(id: number, username: string, email: string, phone: string, password: string) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.password = password;
    }

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    email: string;
    @Column()
    phone: string;
    @Column()
    password: string;
}