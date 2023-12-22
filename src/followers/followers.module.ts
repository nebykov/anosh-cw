import { Module } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { FollowersController } from './followers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Followers } from './models/followers.model';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [FollowersService],
  controllers: [FollowersController],
  imports: [
    SequelizeModule.forFeature([Followers]),
    UserModule
  ],
  exports: [SequelizeModule]
})
export class FollowersModule {}
