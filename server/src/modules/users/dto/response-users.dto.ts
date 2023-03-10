import { OmitType } from '@nestjs/swagger';
import { UsersDto } from './users.dto';

export class ResponseUsersDto extends OmitType(UsersDto, [
  'password',
] as const) {
  constructor(user: ResponseUsersDto) {
    super();
    this._id = user._id;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.username = user.username;
    this.email = user.email;
    this.profileImg = user.profileImg;
    this.region = user.region;
    this.phoneNumber = user.phoneNumber;
    this.gender = user.gender;
    this.tier = user.tier;
    this.intro = user.intro;
    this.age = user.age;
    this.choiceList = user.choiceList;
    this.completedList = user.completedList;
    this.badgeList = user.badgeList;
    this.mountainList = user.mountainList;
    this.point = user.point;
  }
}
