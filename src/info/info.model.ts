import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'info' })
export class Info extends Model<Info> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING, defaultValue: '' })
  avatarImageName: string;

  @Column({ type: DataType.TEXT, defaultValue: '' })
  description: string;
}
