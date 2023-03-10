import { Gender } from 'src/common/enums/gender.enum';
import { Tier } from 'src/common/enums/tier.enum';
import { defaultDto } from './../../../common/dto/default-dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Region } from 'src/common/enums/region.enum';
import { Role } from 'src/common/enums/role.enum';
import { Types } from 'mongoose';

export class UsersDto extends defaultDto {
  @ApiProperty({
    example: 'swaggerID@test.com',
    description: '이메일',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'swaggerUser',
    description: '유저네임',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: '12341234a!',
    description: '비밀번호',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '010-1111-1111',
    description: '전화번호',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    example: '경상',
    description: '지역',
    required: true,
  })
  @IsNotEmpty()
  region: Region;

  @ApiProperty({
    example: '남성',
    description: '성별',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  gender: Gender;
  //필수필드
  @IsOptional()
  @ApiProperty({
    example: '골드',
    description: '티어',
    required: true,
    default: Tier.브론즈,
  })
  tier: Tier;

  @ApiProperty({
    example: '0',
    description: '점수',
    required: true,
  })
  point: number;

  @ApiProperty({
    example: '반갑습니다',
    description: '자기소개',
    required: true,
  })
  @IsOptional()
  @IsString()
  intro?: string;

  @IsOptional()
  @ApiProperty({
    example: '24',
    description: '나이',
    required: true,
  })
  @IsNumber()
  age: number;

  @IsOptional()
  @ApiProperty({
    example: 'http//example.com',
    description: '프로필 사진 주소',
    required: true,
  })
  profileImg: string;

  @IsOptional()
  @ApiProperty({
    example: '[9283923,123123,123213,232323]',
    description: '찜리스트',
    required: false,
  })
  choiceList: Array<string>;

  @IsOptional()
  @ApiProperty({
    example: '[{챌린지1, 하},{챌린지2, 중}]',
    description: '챌린지 완료 리스트',
    required: false,
  })
  completedList: Array<Types.ObjectId>;

  @IsNotEmpty()
  @ApiProperty({
    example: '[뱃지1,뱃지2]',
    description: '뱃지 리스트',
    required: false,
  })
  badgeList: Array<Types.ObjectId>;

  @ApiProperty({
    example: '[산1,산2]',
    description: '완료한 산 리스트',
    required: true,
  })
  @IsNotEmpty()
  mountainList: Array<Types.ObjectId>;

  @ApiProperty({
    example: 'user',
    description: '권한',
    required: true,
    default: Role.User,
  })
  roles: Role[];
}
