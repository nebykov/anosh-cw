import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FollowersService } from './followers.service';

@Controller('followers')
export class FollowersController {
    constructor(private followersService: FollowersService) {}

    @Get('subscribe/:userId/:subscriberId')
    subscribe(@Param('userId') userId: number,@Param('subscriberId') subscriberId: number) {
            return this.followersService.subscribe(userId, subscriberId)
    }

    @Get('unsubscribe/:userId/:subscriberId')
    unsubscribe(@Param('userId') userId: number,@Param('subscriberId') subscriberId: number) {
            return this.followersService.unsubscribe(userId, subscriberId)
    }

    @Get(':userId')
    getUserFollowers(@Param('userId') userId: number) {
        return this.followersService.getSubscribers(userId)
    }
}
