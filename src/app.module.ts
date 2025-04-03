import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cat/cat.module';
import { ItemsModule } from './items/items.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CatsModule, ItemsModule, MongooseModule.forRoot('mongodb+srv://satendra:9HvzULR2cMGCr7dq@cluster0.ad4z5qw.mongodb.net/crud?retryWrites=true&w=majority&appName=Cluster0',
    {onConnectionCreate: (connection: Connection) => {
      connection.on('connected', () => console.log('mongodb connected'));
      connection.on('open', () => console.log('open'));
      connection.on('disconnected', () => console.log('disconnected'));
      connection.on('reconnected', () => console.log('reconnected'));
      connection.on('disconnecting', () => console.log('disconnecting'));
  
      return connection;}
    },
  ), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
