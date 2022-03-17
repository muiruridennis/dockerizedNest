import { NestFactory } from '@nestjs/core';
// import {ValidationPipe } from "@nestjs/common"
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const port = process.env.PORT || 3000
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe()); // global use of pipes
  app.use(cookieParser());
  await app.listen(port);
}
bootstrap();
