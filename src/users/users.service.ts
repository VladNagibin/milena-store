import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { User } from 'src/entities/user.entity';
import { NewUser } from './dto/new-user.dto';
import { Enter } from './dto/enter.dto';
import { answer } from 'src/types/answer';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) { }


    async create(data: NewUser) {
        var hash = await bcrypt.hash(data.password, 10)
        var newUser = this.usersRepository.create({
            login: data.login,
            password: hash,
            email: data.email ? data.email : null,
            phone: data.phone ? data.phone : null
        })
        return this.usersRepository.save(newUser)
    }

    async enterInAccount(data: Enter): Promise<answer> {
        return new Promise((responce, reject) => {
            this.usersRepository.findOneBy({ login: data.login }).then(user => {
                if (!user) {
                    reject({
                        success: false,
                        error: 'user not found'
                    })
                } else {
                    bcrypt.compare(data.password, user.password).then(isValid => {
                        if (isValid) {
                            var token = jwt.sign(user.login, process.env.JWT_TOKEN)
                            responce({
                                success: true,
                                data: {
                                    ...user,
                                    token
                                }
                            })
                        } else {
                            reject({
                                success: false,
                                err: 'password isn\'t valid'
                            })
                        }
                    }, err => {
                        reject({
                            success: false,
                            err
                        })

                    })
                }

            }, err => {
                reject({
                    success: false,
                    err
                })
            })
        })
    }

    
    getAllOrders(id:number):Promise<User>{
        return this.usersRepository.createQueryBuilder('users').leftJoinAndSelect('users.orders','user').where(`users.id = ${id}`).getOne()//findOneBy({id})
    }


    findOne(id: number): Promise<User> {
        return this.usersRepository.findOneBy({ id })
    }
    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id)
    }
}
