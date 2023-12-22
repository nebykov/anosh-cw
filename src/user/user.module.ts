import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { FileModule } from 'src/file/file.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '24h' }
    }),
    SequelizeModule.forFeature([User]),
    FileModule
  ],
  exports: [JwtModule, SequelizeModule, UserService]
})
export class UserModule {}
