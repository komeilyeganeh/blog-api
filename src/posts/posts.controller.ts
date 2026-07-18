import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CurrentUser } from '../auth/decorators/current-user';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@CurrentUser() user: any, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(user, createPostDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(":id")
  remove(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.postsService.remove(id);
  }
}
