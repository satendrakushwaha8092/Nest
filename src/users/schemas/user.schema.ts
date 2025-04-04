import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import { Role } from "src/enums/role.enum";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({ type: String, default: uuid.v4 })
    userId: string;

    @Prop({ type: [String], default: [Role.User] })
    roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User)

// Pre-save hook to hash the password
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  });