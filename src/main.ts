import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request,Response, application,static as ExStatic } from 'express';
import * as path from 'path'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/',ExStatic(path.join(__dirname,'public')))
  console.log(path.join(__dirname,'public'))
  // app.get('*',(req:Request,res:Response)=>{
  //   res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
  // })
  await app.listen(3000);

}
bootstrap();
