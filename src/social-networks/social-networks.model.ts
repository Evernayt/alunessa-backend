import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'social_networks' })
export class SocialNetwork extends Model<SocialNetwork> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  icon: string;

  @Column({ type: DataType.STRING, allowNull: false })
  url: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  orderIndex: number;
}
