import { Module } from '@nestjs/common';
import { AppController } from '../app.controller';
import { MulterModule } from '@nestjs/platform-express';
import { extname } from 'path';

@Module({
  imports: [MulterModule.register({
    dest: './files',
  })],
  controllers: [AppController],
})
export class AppModule {}

export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};

export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};