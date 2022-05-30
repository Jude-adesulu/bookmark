import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user/me')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()

  /*
    get request from validator using @Req and Request from express
    getMe(@Req() req: Request) {
    return req.user;
  } 
  */

  //using custom decorator for a cleaner code and user to be of type prisma
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch(':id')
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
