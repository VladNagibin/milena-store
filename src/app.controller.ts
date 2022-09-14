import { Controller, Get,Req,Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request,Response, application,static as ExStatic } from 'express';
import * as path from 'path'
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  get(@Res() response:Response) {
    // application.use('/',ExStatic(path.join(__dirname,'public')))
    // console.log(path.join(__dirname,'public'))
    return response.sendFile(path.resolve(__dirname,'public','index.html'))
  }
}
