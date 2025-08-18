import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExceptionFilterGen } from './global/filter/custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );
    // enable CORS
  // app.enableCors({
  //   origin: 'http://localhost:3000', // frontend Next.js
  //   credentials: true, // kalau pake cookie / session
  // });
  app.enableCors({
    origin: true,
  });

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionFilterGen(httpAdapterHost))

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
