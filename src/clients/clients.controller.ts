import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ClientsService } from './clients.service';
import { CreateClientsDto } from './dto/create-clients.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ISort } from 'src/common/types/ISort';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createClientsDto: CreateClientsDto[]) {
    return this.clientsService.createClients(createClientsDto);
  }

  @Get()
  getAll() {
    return this.clientsService.getClients();
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.updateClient(updateClientDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('sort')
  sort(@Body() sort: ISort[]) {
    return this.clientsService.sortClients(sort);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.clientsService.deleteClient(id);
  }
}
