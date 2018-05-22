import { Query, Resolver, ResolveProperty } from '@nestjs/graphql';
import { find, filter } from 'lodash';
import { PhotoService } from 'photo/photo.service';
import { async } from 'rxjs/internal/scheduler/async';

@Resolver('Photo')
export class PhotoResolver {

  photoService: PhotoService;

  constructor(photoService: PhotoService) {
      this.photoService = photoService;
  }

  @Query('photo')
  getPhoto(obj, args, context, info) {
    return this.photoService.findAll().then(phs => {
        const resp = find(phs, { id: args.id });
        console.log('PhotoResolver#getPhoto', resp);
        return resp;
    });
  }

  // @Query('photo/all')
  // getAllPhotos(obj, args, context, info) {
  //   return this.photoService.findAll().then(phs => {
  //       console.log('PhotoResolver#getPhoto', phs);
  //       return phs;
  //   });
  // }

}