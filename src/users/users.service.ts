import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  
  create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto)
    return createdUser.save();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec()
  }

  async findByUserId(req:any) {
    const userId = req['user']['userId'];
    return this.userModel.findOne({userId:userId}).exec();
  }

  findOne(email: string) {
    return this.userModel.findOne({email:email}).exec()
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
