import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QueryDto } from '../common/query.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  private readonly userSelect = {
    id: true,
    name: true,
    age: true,
    email: true,
    role: true,
  } as const;

  // get all users with queries (search, page, limit and ...)
  findAll(queryDto: QueryDto) {
    const { search, order, sort } = queryDto;
    const page = queryDto.page ?? 1;
    const limit = queryDto.limit ?? 10;
    return this.prismaService.user.findMany({
      where: {
        ...(search && {
          OR: [
            {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              email: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        }),
      },
      orderBy: order ? { [sort!]: order } : {},
      skip: (page - 1) * limit,
      take: limit,
      select: { ...this.userSelect, posts: true },
    });
  }

  // get user by ID
  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: this.userSelect,
    });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  // get user by email
  findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  // create new user
  async create(createUserDto: CreateUserDto) {
    const user = await this.findByEmail(createUserDto.email);
    if (user) {
      throw new ConflictException('Email is already.');
    }
    return this.prismaService.user.create({
      data: createUserDto,
      select: this.userSelect,
    });
  }

  // remove user
  remove(id: number) {
    return this.prismaService.user.delete({
      where: { id },
      select: this.userSelect,
    });
  }

  // update user
  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
      select: this.userSelect,
    });
  }
}
