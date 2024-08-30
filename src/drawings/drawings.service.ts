import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Drawing } from './drawings.model';
import { CreateDrawingsDto } from './dto/create-drawings.dto';
import { GetDrawingsDto } from './dto/get-drawings.dto';
import { UpdateDrawingDto } from './dto/update-drawing.dto';
import { ISort } from 'src/common/types/ISort';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class DrawingsService {
  constructor(
    @InjectModel(Drawing) private drawingModel: typeof Drawing,
    private filesService: FilesService,
  ) {}

  async createDrawings(createDrawingsDto: CreateDrawingsDto[]) {
    const lastDrawing = await this.drawingModel.findAll({
      limit: 1,
      order: [['id', 'DESC']],
    });
    const nextOrderIndex = lastDrawing.length > 0 ? lastDrawing[0].id : 0;
    const createdDrawings = [];
    createDrawingsDto.forEach((drawing, index) => {
      createdDrawings.push({ ...drawing, orderIndex: nextOrderIndex + index });
    });

    const drawings = await this.drawingModel.bulkCreate(createdDrawings);
    return drawings;
  }

  async getDrawings(getDrawingsDto: GetDrawingsDto) {
    let { limit, page } = getDrawingsDto;
    limit = Number(limit) || 1000;
    page = Number(page) || 1;
    const offset = page * limit - limit;

    const drawings = await this.drawingModel.findAndCountAll({
      limit,
      offset,
      distinct: true,
      order: [['orderIndex', 'ASC']],
    });
    return drawings;
  }

  async updateDrawing(updateDrawingDto: UpdateDrawingDto) {
    const { id } = updateDrawingDto;
    const drawing = await this.drawingModel.update(updateDrawingDto, {
      where: { id },
    });

    return drawing;
  }

  async sortDrawings(sort: ISort[]) {
    const drawings = await this.drawingModel.bulkCreate(sort, {
      updateOnDuplicate: ['orderIndex'],
    });
    return drawings;
  }

  async deleteDrawing(id: number) {
    try {
      const drawing = await this.drawingModel.findByPk(id);
      await this.drawingModel.destroy({
        where: { id },
      });
      this.filesService.deleteFile({
        folder: 'images',
        fileNames: [drawing.mediumImage, drawing.smallImage],
      });

      return true;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
