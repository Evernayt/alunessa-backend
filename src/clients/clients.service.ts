import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from './clients.model';
import { CreateClientsDto } from './dto/create-clients.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ISort } from 'src/common/types/ISort';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client) private clientModel: typeof Client,
    private filesService: FilesService,
  ) {}

  async createClients(createClientsDto: CreateClientsDto[]) {
    const lastClient = await this.clientModel.findAll({
      limit: 1,
      order: [['id', 'DESC']],
    });
    const nextOrderIndex = lastClient.length > 0 ? lastClient[0].id : 0;
    const createdClients = [];
    createClientsDto.forEach((client, index) => {
      createdClients.push({ ...client, orderIndex: nextOrderIndex + index });
    });

    const clients = await this.clientModel.bulkCreate(createdClients);
    return clients;
  }

  async getClients() {
    const clients = await this.clientModel.findAll({
      order: [['orderIndex', 'ASC']],
    });
    return clients;
  }

  async updateClient(updateClientDto: UpdateClientDto) {
    const { id } = updateClientDto;
    const client = await this.clientModel.update(updateClientDto, {
      where: { id },
    });

    return client;
  }

  async sortClients(sort: ISort[]) {
    const clients = await this.clientModel.bulkCreate(sort, {
      updateOnDuplicate: ['orderIndex'],
    });
    return clients;
  }

  async deleteClient(id: number) {
    try {
      const client = await this.clientModel.findByPk(id);
      await this.clientModel.destroy({
        where: { id },
      });
      this.filesService.deleteFile({
        folder: 'images',
        fileNames: [client.originalImageName, client.compressedImageName],
      });

      return true;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
