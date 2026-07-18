import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.post.findMany();
  }

  create(user: any, createPostDto: CreatePostDto) {
    return this.prismaService.post.create({
      data: { ...createPostDto, user_id: user.id },
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.prismaService.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  remove(id: number) {
    return this.prismaService.post.delete({ where: { id } });
  }
}
