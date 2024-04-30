import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';

const UserDefinition: ModelDefinition = {
  name: User.name,
  schema: UserSchema,
};

@Module({
  imports: [MongooseModule.forFeature([UserDefinition])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
