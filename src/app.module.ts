import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/task.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '6ujn9iUHkfopoMrG',
      database: 'task-management',
      // autoLoadEntities: true,
      synchronize: true,
      entities: [Task],
    }),
    AuthModule,
  ],
})
export class AppModule {}
