import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AwsSdkModule} from "nest-aws-sdk";
import {S3} from "aws-sdk";
import {TypeOrmModule} from "@nestjs/typeorm";
import * as process from "process";

@Module({
  imports: [
      AwsSdkModule.forRoot({
        defaultServiceOptions: {
          endpoint: process.env.S3_URL,
          accessKeyId: process.env.S3_ACCESS_KEY_ID,
          secretAccessKey: process.env.S3_STORAGE_SECRET_KEY,
          httpOptions: {
            timeout: 10000,
            connectTimeout: 10000
          },
          s3ForcePathStyle: true,
        },
        services: [S3]
      }),
      TypeOrmModule.forRoot({
        type: 'mysql',
        logging: false,
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE || 'pc-dev',
        entities: ['./entities/*.{js.ts}'],
        autoLoadEntities: true,
        //synchronize: true,
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class  AppModule {}
