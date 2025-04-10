import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { CreateUserDto } from "./dtos/create-user.dto";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signup(email: string, password: string) {
        // See if email is already in use
        const users = await this.usersService.find(email);
        if (users.length) {
            throw new BadRequestException("Email in use");
        }

        // Hash the password

        // Create a new user and save it
        // Generate a salt
        const salt = randomBytes(8).toString("hex");

        // Hash the salt and the password together
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        // Join the hashed result and the salt together
        const result = salt + "." + hash.toString("hex");

        // Create a new user and save it
        const credentials: CreateUserDto = {
            email,
            password: result
        }
        const user = await this.usersService.create(credentials);

        // Return the user
    }

    signin() {

    }
}