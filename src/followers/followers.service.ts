import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Followers } from './models/followers.model';
import { User } from 'src/user/models/user.model';

@Injectable()
export class FollowersService {
    constructor(
        @InjectModel(Followers) private followersModel: typeof Followers,
        @InjectModel(User) private userModel: typeof User
        ) {}

        async subscribe(userId: number, subscriberId: number) {
            const user = await this.userModel.findByPk(userId);
            const subscriber = await this.userModel.findByPk(subscriberId);
        
            if (!user || !subscriber) {
                console.log(user)
              throw new NotFoundException('User or subscriber not found');
            }
        
            await user.$add('subscribers', [subscriber]);
          }
        
          async unsubscribe(userId: number, subscriberId: number) {
            const user = await this.userModel.findByPk(userId);
            const subscriber = await this.userModel.findByPk(subscriberId);
        
            if (!user || !subscriber) {
              throw new NotFoundException('User or subscriber not found');
            }
        
            await user.$remove('subscribers', [subscriber]);

            return subscriber
          }


          async getSubscribers(userId: number): Promise<User[]> {
            const user = await this.userModel.findByPk(userId, {
              include: { model: User, as: 'subscribers' },
            });
        
            if (!user) {
              throw new NotFoundException('User not found');
            }
        
            return user.subscribers;
          }
}
