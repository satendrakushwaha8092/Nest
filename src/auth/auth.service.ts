
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user : any = await this.usersService.findOne(email);
    if(!user){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'User Not Found',
      }, HttpStatus.NOT_FOUND, {
        cause: "not found"
      })
    }
    const isMatch = await bcrypt.compare(pass, user?.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { userId: user.userId, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
