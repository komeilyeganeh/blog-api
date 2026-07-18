import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  async findAll() {
    const cachePosts = await this.redisService.get('posts:all');
    if (cachePosts) {
      return cachePosts;
    }
    const posts = await this.prismaService.post.findMany();
    await this.redisService.set('posts:all', posts);
    return posts;
  }

  async create(user: any, createPostDto: CreatePostDto) {
    const post = await this.prismaService.post.create({
      data: { ...createPostDto, user_id: user.id },
    });
    await this.redisService.del('posts:all');
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.prismaService.post.update({
      where: { id },
      data: updatePostDto,
    });
    await this.redisService.del('posts:all');
    return post;
  }

  async remove(id: number) {
    const post = await this.prismaService.post.delete({ where: { id } });
    await this.redisService.del('posts:all');
    return post;
  }
}
