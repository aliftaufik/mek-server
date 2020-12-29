import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as connectRedis from 'connect-redis';
import * as session from 'express-session';
import Redis from 'ioredis';
import { AppConfigService } from './core/app-config.service';
import { ValidationPipe } from '@nestjs/common';
import { TypeormExceptionFilter } from './core/exception/typeorm-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new TypeormExceptionFilter());

  const configService = app.get(AppConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: configService.isProduction,
    }),
  );

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  // app.use(cors({ origin: "http://localhost:3000", credentials: true }));

  app.use(
    session({
      name: configService.get<string>('COOKIE_NAME'),
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: configService.isProduction, // if true cookie only works in https
      },
      secret: configService.get<string>('COOKIE_PASSWORD'),
      saveUninitialized: false,
      resave: false,
    }),
  );

  await app.listen(3000);
}
bootstrap();
