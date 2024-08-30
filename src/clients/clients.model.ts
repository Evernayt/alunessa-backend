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
  mediumImage: string;

  @Column({ type: DataType.STRING, allowNull: false })
  smallImage: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  mediumWidth: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  mediumHeight: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  smallWidth: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  smallHeight: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  orderIndex: number;
}
