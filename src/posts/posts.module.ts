import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PrismaModule } from '../prisma/prisma.module';
import { RedisModule } from '../redis/redis.module';
import { RedisService } from '../redis/redis.service';

@Module({
  imports: [PrismaModule, RedisModule],
  controllers: [PostsController],
  providers: [PostsService, RedisService]
})
export class PostsModule {}
