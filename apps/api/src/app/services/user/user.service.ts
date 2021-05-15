import {Injectable} from '@nestjs/common';
import {User} from "../../schemas/user.schema";

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'e376badf38d12a49f81350d60d319a1a54ea789f73b3f0beba11ef1caa2d467f',
      salt: '8fe0e1068f',
      role: ''
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      salt: '65d4fg654d',
      role: ''
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

}
