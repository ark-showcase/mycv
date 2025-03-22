import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.repo.create({ email: createUserDto.email, password: createUserDto.password });
        return this.repo.save(user);
    }

    async findOne(id: number): Promise<User> {
        return await this.repo.findOneBy({ id });
    }

    async find(email: string): Promise<User[]> {
        return await this.repo.find({ where: { email } });
    }

    async update(id: number, attrs: Partial<User>): Promise<User> {
        const user = await this.repo.findOneBy({ id });
        if (!user) {
            throw new Error('user not found');
        }
        Object.assign(user, attrs);
        return this.repo.save(user);
    }

    async remove(id: number): Promise<void> {
        const user = await this.repo.findOneBy({ id });
        if (!user) {
            throw new Error('user not found');
        }
        await this.repo.remove(user);
    }
}
