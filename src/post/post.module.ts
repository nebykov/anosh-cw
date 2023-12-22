import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from 'src/user/user.module';
import { Posts } from './models/post.model';
import { FileModule } from 'src/file/file.module';

@Module({
  providers: [PostService],
  controllers: [PostController],
  imports: [
    SequelizeModule.forFeature([Posts]),
    UserModule,
    FileModule
  ],
  exports: [SequelizeModule]
})
export class PostModule {}
