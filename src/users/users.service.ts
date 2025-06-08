import { ConflictException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UserSignupDto } from '../auth/dto/user-signup.dto';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserLoginDto } from '../auth/dto/user-login.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  // This service is responsible for handling user-related operations.
  constructor(
    @InjectRepository(UserEntity)
    private usersRepo: Repository<UserEntity>,
  ) {} 

  // Methods for user management
  async findByEmail(email: string, includePassword: boolean): Promise<UserEntity | null> {
    const selectFields: (keyof UserEntity)[] = ['id', 'email', 'name', 'role', 'updated_at'];
    if(includePassword) selectFields.push('password_hash');
    return this.usersRepo.findOne({where: {email}, select:selectFields});
  }

  async create(userData:UserSignupDto): Promise<Omit<UserEntity, 'password_hash'>> {
    try {
      if(userData.email) {
        const existingUser = await this.findByEmail(userData.email, false);
        if(existingUser) throw new ConflictException('Email exists, please login')
      }

      const userPayload: Partial<UserEntity> = {
        email: userData.email,
        name: userData.name,
      }
      if(userData.password) {
        userPayload.password_hash = await bcrypt.hash(userData.password,12)
      }


      const newUser = this.usersRepo.create(userPayload);
      const savedUser = await this.usersRepo.save(newUser);

      const {password_hash, ...returndata} = savedUser;
      return returndata
    } catch (error) {
      if (error instanceof HttpException) throw error
       throw new InternalServerErrorException('Failed to create User')
    }
    
  }

  async fetchInfo(user : {email: string, userId: string}): Promise<UserEntity | null>{
    const userInfo = await this.findByEmail( user.email, false)

    return userInfo
  }


  // async update(email: string, updateData: UpdateUserDto):Promise<Omit<UserEntity, 'password_hash'>>{
  //    const user = await this.findByEmail(email, false);
  //   if (!user) {
  //     throw new NotFoundException(`User with email ${email} not found`);
  //   }

  //   // Check email uniqueness if email is being updated
  //   if (updateData.email && updateData.email !== user.email) {
  //     const existingUser = await this.findByEmail(updateData.email);
  //     if (existingUser) {
  //       throw new ConflictException('User with this email already exists');
  //     }
  //   }

  //   await this.usersRepo.update(user.id, updateData);
  //   return this.findById(user.id);
  // }

  async findById(id:string, includePassword = false): Promise<UserEntity>{
     const selectFields: (keyof UserEntity)[] = ['id', 'email', 'name', 'role', 'created_at', 'updated_at'];
    
    if (includePassword) {
      selectFields.push('password_hash');
    }

    const user = await this.usersRepo.findOne({
      where: { id },
      select: selectFields
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  //   async updatePassword(email: string, hashedPassword: string): Promise<void> {
  //   const user = await this.findByEmail(email, false);
  //   if (!user) {
  //     throw new NotFoundException(`User with email ${email} not found`);
  //   }
  //   await this.usersRepo.update(user.id, { password_hash: hashedPassword });
  // }


}
