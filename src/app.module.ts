import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from 'src/core/env/env.validation';
import { AppConfigService } from './core/app-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'src/core/env/.env.' + process.env.NODE_ENV,
      validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('NODE_ENV') === 'production',
      }),
    }),
    UserModule,
  ],
  providers: [AppConfigService],
})
export class AppModule {}
