export class UserAlreadyExistsError extends Error{
    public statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = "UserAlreadyExists";
        this.statusCode = 409;
    }
}