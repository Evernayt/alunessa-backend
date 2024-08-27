import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { InfoService } from './info.service';
import { UpdateInfoDto } from './dto/update-info.dto';

@Controller('info')
export class InfoController {
  constructor(private infoService: InfoService) {}

  @Get()
  getOne() {
    return this.infoService.getInfo();
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() updateInfoDto: UpdateInfoDto) {
    return this.infoService.updateInfo(updateInfoDto);
  }
}
