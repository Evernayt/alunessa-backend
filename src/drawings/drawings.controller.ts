import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DrawingsService } from './drawings.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateDrawingsDto } from './dto/create-drawings.dto';
import { GetDrawingsDto } from './dto/get-drawings.dto';
import { UpdateDrawingDto } from './dto/update-drawing.dto';
import { ISort } from 'src/common/types/ISort';

@Controller('drawings')
export class DrawingsController {
  constructor(private drawingsService: DrawingsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createDrawingsDto: CreateDrawingsDto[]) {
    return this.drawingsService.createDrawings(createDrawingsDto);
  }

  @Get()
  getAll(@Query() getDrawingsDto: GetDrawingsDto) {
    return this.drawingsService.getDrawings(getDrawingsDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() updateDrawingDto: UpdateDrawingDto) {
    return this.drawingsService.updateDrawing(updateDrawingDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('sort')
  sort(@Body() sort: ISort[]) {
    return this.drawingsService.sortDrawings(sort);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.drawingsService.deleteDrawing(id);
  }
}
