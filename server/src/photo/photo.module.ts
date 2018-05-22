import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { Photo } from './photo.entity';
import { PhotoResolver } from 'photo/photo.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Photo])],
  providers: [PhotoService, PhotoResolver],
  controllers: [PhotoController],
})
export class PhotoModule {}