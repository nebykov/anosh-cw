import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Followers } from 'src/followers/models/followers.model';
import { Posts } from 'src/post/models/post.model';

@Table({
    tableName: "user",
})
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  username: string;


  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email: string;


  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password: string;


  @Column({
    type: DataType.STRING
  })
  avatar: string

  @BelongsToMany(() => User, () => Followers, 'user_id', 'follower_id')
  subscribers: User[];

  @HasMany(() => Posts)
  posts: Posts[];
}