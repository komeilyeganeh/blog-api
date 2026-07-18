import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const { email, password } = registerUserDto;
    const user = await this.usersService.findByEmail(email);
    if (user) {
      throw new ConflictException('Email is already.');
    }
    const passwordHashed = await bcrypt.hash(password, 12);
    const newUser = await this.usersService.create({
      ...registerUserDto,
      password: passwordHashed,
    });
    const payload = {
      sub: newUser.id,
      email: newUser.email,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email or password invalid.');
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      throw new UnauthorizedException('Email or password invalid.');
    }
    const payload = {
      sub: user.id,
      email: user.email,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}
