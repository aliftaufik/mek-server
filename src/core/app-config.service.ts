import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService extends ConfigService {
  // constructor(private configService: ConfigService) {}

  get isProduction() {
    return this.get<string>('NODE_ENV') === 'production';
  }
}
