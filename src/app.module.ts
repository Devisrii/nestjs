import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose'
import { ProductModule } from './products/product.module';

@Module({
  imports: [ProductModule,MongooseModule.forRoot('mongodb+srv://devi:12345@mydb1.r0aen.mongodb.net/nestjs_demo?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
