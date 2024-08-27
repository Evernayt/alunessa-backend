import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async getUserById(id: number) {
    const user = await this.userModel.findByPk(id);
    return user;
  }

  async updateUserPassword(password: string) {
    await this.userModel.update({ password }, { where: { id: 1 } });
  }
}
