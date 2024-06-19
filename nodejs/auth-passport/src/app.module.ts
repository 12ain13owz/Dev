import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

const url: string = 'mongodb://localhost:27017';
const mongooseOption: MongooseModuleOptions = {
  user: 'user_mongo',
  pass: 'pass_mongo',
  dbName: 'auth',
};

const configOptions: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: '.env',
};

@Module({
  imports: [
    MongooseModule.forRoot(url, mongooseOption),
    ConfigModule.forRoot(configOptions),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
