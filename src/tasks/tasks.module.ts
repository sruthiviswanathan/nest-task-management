import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TaskRepository } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Utils } from './utils/utils';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]),
    AuthModule
  ],
  controllers: [TasksController],
  providers: [TasksService, Utils],
})
export class TasksModule {}
