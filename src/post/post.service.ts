import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Posts } from './models/post.model';
import { User } from 'src/user/models/user.model';
import { UserService } from 'src/user/user.service';
import { FileService } from 'src/file/file.service';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Posts) private postModel: typeof Posts,
    private userService: UserService,
    private fileService: FileService
  ) { }

  async createPost(userId: number, postText: string, postImage?: Express.Multer.File) {
    try {
      const user: User = await this.userService.getById(userId)
      if (!user) {
        throw new HttpException("User not found", HttpStatus.NOT_FOUND)
      }
      let postImagePath: String;
      if (postImage) {
        postImagePath = await this.fileService.createFile(userId, postImage)
      }

      const post: Posts = await this.postModel.create({
        post_text: postText,
        post_image: postImagePath,
        user_id: userId
      })

      await post.save();

      await post.reload({
        include: [{ model: User, attributes: ['id', 'username', 'avatar'] }],
      });
      return post
    } catch (e) {
      return e
    }
  }

  async deletePost(postId: number, userId: number): Promise<void> {
    try {
      const post = await this.postModel.findOne({ where: { id: postId, user_id: userId } });

      if (!post) {
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
      }

      if (post.post_image) {
        await this.fileService.deleteFile(post.post_image);
      }

      await post.destroy();

    } catch (e) {
      throw new HttpException(e.message || 'Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUsersPosts(userId: number) {
    try {
      const user: User = await this.userService.getById(userId)
      if (!user) {
        throw new HttpException("User not found", HttpStatus.NOT_FOUND)
      }
      const posts: Posts[] = await this.postModel.findAll({ where: { user_id: userId }, include: [{ model: User, attributes: ['id', 'username', 'avatar'] }] })

      return posts
    } catch (e) {

    }
  }

  async getAllPosts() {
    try {
      const posts: Posts[] = await this.postModel.findAll({ include: [{ model: User, attributes: ['id', 'username', 'avatar'] }] })
      return posts
    } catch (e) {

    }
  }
}
