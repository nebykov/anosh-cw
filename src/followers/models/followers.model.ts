// user-subscriber.model.ts
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/user/models/user.model';

@Table({
  tableName: "followers",
})
export class Followers extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  user_id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  follower_id: number;
}
