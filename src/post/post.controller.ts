import { Body, Controller, Delete, Get, Param, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('post')
export class PostController {
    constructor(private postService: PostService){}

    @Get()
    getAllPosts() {
        return this.postService.getAllPosts()
    }

    @Post('create')
    @UseInterceptors(FileInterceptor('postImage'))
    setAvatar(@Body() data: {userId: number, postText: string}, @UploadedFile() postImage: Express.Multer.File) {
         const {userId, postText} = data
         return this.postService.createPost(userId, postText, postImage)
    }

    @Get('user/:userId')
    getUserPosts(@Param('userId') userId: number) {
         return this.postService.getUsersPosts(userId)
    }

    @Delete(':postId/:userId')
    async deletePost(@Param('postId') postId: number, @Param('userId') userId: number) {
      return this.postService.deletePost(postId, userId);
    }
}
