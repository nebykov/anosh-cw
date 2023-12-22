import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { LikeModule } from './like/like.module';
import { FollowersModule } from './followers/followers.module';
import { User } from './user/models/user.model';
import { Posts } from './post/models/post.model';
import { FileModule } from './file/file.module';
import { Followers } from './followers/models/followers.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'cyberDodik2077',
      database: 'genesis_db',
      models: [User, Posts, Followers],
      autoLoadModels: true
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    UserModule,
    PostModule,
    LikeModule,
    FollowersModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
