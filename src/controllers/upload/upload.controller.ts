import { imageFileFilter, editFileName } from './../../utils/file-uploading.utils';
import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors, Get, Param, Res } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('upload')
export class UploadController {

    @Post()
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads',
                filename: editFileName,
            }),
          fileFilter: imageFileFilter,
        }),
      )
    async uploadedFile(@UploadedFile() file) {
        const response = {
          originalname: file.originalname,
          filename: file.filename,
        };
        return response;
    }
    
    @Post('multiple')
    @UseInterceptors(
        FilesInterceptor('image', 20, {
            storage: diskStorage({
                destination: './uploads',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async uploadMultipleFiles(@UploadedFiles() files) {
        const response = [];
        files.forEach(file => {
            const fileReponse = {
                originalname: file.originalname,
                filename: file.filename,
            };
            response.push(fileReponse);
        });
        return response;
    }

    @Get(':imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
      return res.sendFile(image, { root: './uploads' });
    }

}
