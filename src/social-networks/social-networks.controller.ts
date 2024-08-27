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
import { SocialNetworksService } from './social-networks.service';
import { CreateSocialNetworkDto } from './dto/create-social-network.dto';
import { UpdateSocialNetworkDto } from './dto/update-social-network.dto copy';
import { ISort } from 'src/common/types/ISort';

@Controller('social-networks')
export class SocialNetworksController {
  constructor(private socialNetworksService: SocialNetworksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSocialNetworkDto: CreateSocialNetworkDto) {
    return this.socialNetworksService.createSocialNetwork(
      createSocialNetworkDto,
    );
  }

  @Get()
  getAll() {
    return this.socialNetworksService.getSocialNetworks();
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() updateSocialNetworkDto: UpdateSocialNetworkDto) {
    return this.socialNetworksService.updateSocialNetwork(
      updateSocialNetworkDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('sort')
  sort(@Body() sort: ISort[]) {
    return this.socialNetworksService.sortSocialNetworks(sort);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.socialNetworksService.deleteSocialNetwork(id);
  }
}
