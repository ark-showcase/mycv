import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
export declare class UsersController {
    private userService;
    private authService;
    constructor(userService: UsersService, authService: AuthService);
    createUser(body: CreateUserDto): Promise<void>;
    findUser(id: string): Promise<import("./user.entity").User>;
    updateUser(id: string, body: UpdateUserDto): Promise<import("./user.entity").User>;
    findAllUsers(email: string): Promise<import("./user.entity").User[]>;
    removeUser(id: string): Promise<void>;
}
