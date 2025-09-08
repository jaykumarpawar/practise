import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResumeModule } from './resumes/resume.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './config/database/database.module';

@Module({
  imports: [ConfigModule, DatabaseModule, ResumeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
