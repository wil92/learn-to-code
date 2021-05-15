import {BadRequestException, Injectable} from '@nestjs/common';
import {User, UserDocument} from "../../schemas/user.schema";
import {InjectModel} from "@nestjs/mongoose";

import {Model} from "mongoose";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
  }

  async registerUser({username, email, passwordHash, salt}): Promise<User> {
    const exist = await this.findOne(username);
    if (exist) {
      throw new BadRequestException();
    }
    const newUser = new this.userModel({
      username,
      email,
      password: passwordHash,
      salt,
      role: 'auth',
      active: true
    });
    return newUser.save();
  }

  async findOne(username: string): Promise<User | undefined> {
    const users = await this.userModel.aggregate([{$match: {username}}]).exec();
    return users.length > 0 ? users[0] : null;
  }
}
