import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'clients' })
export class Client extends Model<Client> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  originalImageName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  compressedImageName: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  orderIndex: number;
}
