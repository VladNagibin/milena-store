import { HttpException, Injectable } from '@nestjs/common';
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
        var [, user] = await this.usersRepository.findAndCountBy({ login: data.login })
        if (user > 0) {
            throw new HttpException('такой пользователь уже существует', 401)
        }
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
            this.usersRepository.findOne({
                where: [
                    { login: data.login },
                    { email: data.login }
                ]
            }).then(user => {
                if (!user) {
                    reject({
                        success: false,
                        error: 'Пользователь не найден'
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
                                error: 'Пароль неверный'
                            })
                        }
                    }, error => {
                        reject({
                            success: false,
                            error
                        })

                    })
                }

            }, error => {
                reject({
                    success: false,
                    error
                })
            })
        })
    }


    getAllOrders(login: string): Promise<User> {
        return this.usersRepository.createQueryBuilder('users').leftJoinAndSelect('users.orders', 'order').where(`users.login = :login`, { login }).addOrderBy('date', 'DESC').getOne()//findOneBy({id})
    }

    async setContactInfo(login: string, email: string | undefined, phone: string | undefined) {
        var user = await this.usersRepository.findOneBy({ login })
        if (email) {
            user.email = email
        }
        if (phone) {
            user.phone = phone
        }
        return this.usersRepository.save(user)

    }

    findOne(login: string): Promise<User> {
        return this.usersRepository.findOneBy({ login: login })
    }
    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id)
    }
}
