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
  originalImageName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  compressedImageName: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  orderIndex: number;
}
