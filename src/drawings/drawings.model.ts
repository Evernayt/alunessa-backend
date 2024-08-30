import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'drawings' })
export class Drawing extends Model<Drawing> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING, defaultValue: '' })
  name: string;

  @Column({ type: DataType.TEXT, defaultValue: '' })
  description: string;

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

  @Column({ type: DataType.STRING, allowNull: false })
  blurHash: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  orderIndex: number;
}
