import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Info } from './info.model';
import { UpdateInfoDto } from './dto/update-info.dto';

@Injectable()
export class InfoService {
  constructor(@InjectModel(Info) private infoModel: typeof Info) {}
  async getInfo() {
    const info = await this.infoModel.findByPk(1);
    return info;
  }

  async updateInfo(updateInfoDto: UpdateInfoDto) {
    const { id } = updateInfoDto;
    const info = await this.infoModel.update(updateInfoDto, {
      where: { id },
    });

    return info;
  }
}
