import { FeedDto } from './dto/feed.dto';
import { ResponseStatusDto } from './../../common/dto/response-status';
import { ResponseFeedDto } from './dto/response-feed.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { FeedService } from './services/feed.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { UsersDto } from '../users/dto/users.dto';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { FilterFeedOptionsDto } from './dto/filter-feed-options.dto';

@ApiTags('feeds')
@Controller('feeds')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @ApiOperation({ summary: '현재 로그인되어있는 유저가 피드작성' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post()
  async create(
    @CurrentUser() currentUser: UsersDto,
    @Body() createFeedDto: CreateFeedDto,
  ) {
    const result = await this.feedService.createFeed(
      currentUser,
      createFeedDto,
    );
    return new ResponseStatusDto(result);
  }

  @ApiOperation({
    summary: '현재 로그인되어있는 유저가 챌린지피드작성',
    description:
      '챌린지의 id를 넣으면 해당 id를 가진 챌린지의 approval에 feed id를 넣어 신청중인 상태를 나타냄',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post('/challenges/:id')
  async createChallenge(
    @Param('id') id: string,
    @CurrentUser() currentUser: UsersDto,
    @Body() createFeedDto: CreateFeedDto,
  ) {
    const result = await this.feedService.createChallengeFeed(
      id,
      currentUser,
      createFeedDto,
    );
    return new ResponseStatusDto(result);
  }

  @ApiOperation({ summary: '피드 전부 가져오기(댓글+유저정보까지)' })
  @Get()
  async findPage(
    @Query() filter: FilterFeedOptionsDto,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<FeedDto>> {
    return await this.feedService.findPage(filter, pageOptionsDto);
  }

  @ApiOperation({ summary: '해당 피드 가져오기' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const feed = await this.feedService.findOneById(id);
    return new ResponseFeedDto(feed);
  }

  @ApiOperation({ summary: '좋아요' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Put(':id/like')
  async updateLike(
    @CurrentUser() currentUser: UsersDto,
    @Param('id') id: string,
  ) {
    return await this.feedService.updateLike(id, currentUser);
  }

  @ApiOperation({ summary: 'id로 업데이트' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateFeedDto: UpdateFeedDto) {
    return await this.feedService.update(id, updateFeedDto);
  }

  @ApiOperation({ summary: 'id로 삭제' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<ResponseStatusDto> {
    return this.feedService.remove(id);
  }
}
