import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { ValidateUser } from './models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<ValidateUser> {
    const user = await this.userService.findByEmail(email);
    if (user && (await compare(password, user.password))) {
      const result = user.toJSON();
      return { id: result._id, email: result.email };
    }
    return null;
  }

  async login(user: any) {
    const payload = { id: user.id, email: user.email };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
