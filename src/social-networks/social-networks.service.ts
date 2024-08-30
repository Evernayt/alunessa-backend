import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SocialNetwork } from './social-networks.model';
import { CreateSocialNetworkDto } from './dto/create-social-network.dto';
import { UpdateSocialNetworkDto } from './dto/update-social-network.dto copy';
import { ISort } from 'src/common/types/ISort';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class SocialNetworksService {
  constructor(
    @InjectModel(SocialNetwork)
    private socialNetworkModel: typeof SocialNetwork,
    private filesService: FilesService,
  ) {}

  async createSocialNetwork(createSocialNetworkDto: CreateSocialNetworkDto) {
    const lastSocialNetwork = await this.socialNetworkModel.findAll({
      limit: 1,
      order: [['id', 'DESC']],
    });
    const orderIndex =
      lastSocialNetwork.length > 0 ? lastSocialNetwork[0].id : 0;

    const socialNetwork = await this.socialNetworkModel.create({
      ...createSocialNetworkDto,
      orderIndex,
    });
    return socialNetwork;
  }

  async getSocialNetworks() {
    const socialNetworks = await this.socialNetworkModel.findAll({
      order: [['orderIndex', 'ASC']],
    });
    return socialNetworks;
  }

  async updateSocialNetwork(updateSocialNetworkDto: UpdateSocialNetworkDto) {
    const { id } = updateSocialNetworkDto;
    const socialNetwork = await this.socialNetworkModel.update(
      updateSocialNetworkDto,
      { where: { id } },
    );

    return socialNetwork;
  }

  async sortSocialNetworks(sort: ISort[]) {
    const socialNetworks = await this.socialNetworkModel.bulkCreate(sort, {
      updateOnDuplicate: ['orderIndex'],
    });
    return socialNetworks;
  }

  async deleteSocialNetwork(id: number) {
    try {
      const socialNetwork = await this.socialNetworkModel.findByPk(id);
      await this.socialNetworkModel.destroy({
        where: { id },
      });
      this.filesService.deleteFile({
        folder: 'icons',
        fileNames: [socialNetwork.icon],
      });

      return true;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
