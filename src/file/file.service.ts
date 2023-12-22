import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'

@Injectable()
export class FileService {
      createFile(userId: number, file: Express.Multer.File): string {
        try {
            const fileExtension = file.originalname.split('.').pop()
            const fileName = uuid.v4() + '.' + fileExtension
            const filePath = path.resolve(__dirname, '..', 'static', String(userId))
            if(!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)
            return userId + '/' + fileName
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteFile(fileName: string): Promise<void> {
        try {
          const filePath = path.resolve(__dirname, '..', 'static', fileName);

          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          } else {
            throw new HttpException('File not found', HttpStatus.NOT_FOUND);
          }
        } catch (e) {
          throw new HttpException(e.message || 'Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
}
