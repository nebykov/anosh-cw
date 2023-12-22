import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcryptjs"
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import { FileService } from 'src/file/file.service';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UserService {
    constructor(
      @InjectModel(User) private userModel: typeof User,
      private jwtService: JwtService,
      private fileService: FileService,
      private sequelize: Sequelize,
      ) {}

      async getUsers() {
        const users = await this.userModel.findAll()

        return users
      }

      async registration(dto: CreateUserDto) {
        try {
           const candidate = await this.userModel.findOne({where: {email: dto.email}})
           if (candidate) {
              throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
           }
           const hashedPassword = await bcrypt.hash(dto.password, 8)
           const user = await this.createUser({...dto, password: hashedPassword })
  
           const token = await this.generateToken(user)
           return {
              token,
              user
           }
        } catch (e) {
           console.log(e)
           throw new HttpException('Registration error', HttpStatus.BAD_REQUEST)
        }
     }


    async createUser(dto: CreateUserDto) {
        const user = await this.userModel.create({...dto})
        return user
   }

   async loginUser(dto: LoginUserDto) {
    try {
        const user = await this.userModel.findOne({ where: { email: dto.email } });
        if (!user) {
           throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
        }
        const isValidPassword = await bcrypt.compare(dto.password, user.password)
        if (!isValidPassword) {
           throw new HttpException('Password is not Valid', HttpStatus.BAD_REQUEST)
        }
  
        const token = await this.generateToken(user)
  
        return {
           token,
           user
        }
    }  catch (e) {
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
   }

   async auth(userId: number) {
    const user = await this.getById(userId)
    const token = await this.generateToken(user)

    return {
       token,
       user
    }
 }

   async getByEmail (email: string): Promise<User> {
         const user = await this.userModel.findOne({where: {email}})
         if (!user) {
           throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
         }
         return user
   }

   async getById (id: number) {
          const user = await this.userModel.findByPk(id)
          if (!user) {
           throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
         }
         return user
   }

   private generateToken(user: User) {
    const payload = { id: user.id }
    const token = this.jwtService.signAsync(payload)
    return token
 }

 async setAvatar(userId: number, avatar: Express.Multer.File) {
   const t = await this.sequelize.transaction();

   try {
     const user = await this.userModel.findByPk(userId);

     if (!user) {
       throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
     }

     const avatarName = uuid.v4() + '.' + avatar.originalname.split('.').pop();
     const avatarPath = path.resolve(__dirname, '..', 'static', String(userId));

     if (!fs.existsSync(avatarPath)) {
       fs.mkdirSync(avatarPath, { recursive: true });
     }

     fs.writeFileSync(path.resolve(avatarPath, avatarName), avatar.buffer);
     user.avatar = avatarName;

     await user.save({ transaction: t });

     await t.commit();

     return user;
   } catch (e) {
     await t.rollback();
     throw new HttpException(e.message || 'Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
   }
 }


 async getUserInfo(userId: number): Promise<any> {
   const user = await this.userModel.findByPk(userId, {
     include: [
       { model: User, as: 'subscribers', attributes: ['id'] }, // Include subscribers
     ],
   });

   if (!user) {
     throw new NotFoundException('User not found');
   }

   const postCount = await user.$count('posts'); // Count posts
   const subscriberCount = user.subscribers.length; // Count subscribers

   return {
     user,
     postCount,
     subscriberCount,
   };
 }

}
