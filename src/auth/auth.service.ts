import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private async generateToken(user: User) {
    const payload = { ...user.dataValues, password: undefined };
    return { token: this.jwtService.sign(payload) };
  }

  private async validate(loginUserDto: LoginUserDto) {
    const { password } = loginUserDto;

    const user = await this.usersService.getUserById(1);
    if (!user) {
      throw new UnauthorizedException({
        message: 'Некорректный пароль',
      });
    }
    const passwordEquals = await bcrypt.compare(password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некорректный логин или пароль',
    });
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.validate(loginUserDto);
    return this.generateToken(user);
  }

  async checkAuth() {
    const user = await this.usersService.getUserById(1);
    return this.generateToken(user);
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const { oldPassword, newPassword } = changePasswordDto;

    const user = await this.usersService.getUserById(1);
    const passwordEquals = await bcrypt.compare(oldPassword, user.password);
    if (!passwordEquals) {
      throw new HttpException(
        'Введен неверный старый пароль',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(newPassword, 5);
    await this.usersService.updateUserPassword(hashPassword);

    return true;
  }
}
