import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';

@Module({
  imports: [TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'geomais',
      synchronize: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
    PersonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
