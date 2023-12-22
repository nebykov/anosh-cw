import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/user/models/user.model';

@Table({
    tableName: "post",
})
export class Posts extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  post_text: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER
  })
  user_id: number

  @BelongsTo(() => User)
  user: User

  @Column({
    type: DataType.STRING
  })
  post_image: string
}