import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path'
@Controller()
export class ClientController {
  @Get('*')
  get(@Res() response: Response) {
    if (process.env.NODE_ENV == 'production') {
    //if (true) {
        return response.sendFile(path.resolve(__dirname, '../public', 'index.html'))
    }
  }
}
