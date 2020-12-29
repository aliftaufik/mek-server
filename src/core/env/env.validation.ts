import { plainToClass } from 'class-transformer';
import {
  IsBooleanString,
  IsEnum,
  IsIP,
  IsNotEmpty,
  IsNumber,
  IsPort,
  // IsNumber,
  IsString,
  validateSync,
} from 'class-validator';
import { IsNumberPort } from 'src/core/validator/IsNumberPort';

enum Environment {
  Development = 'development',
  Production = 'production',
  // Test = 'test',
  // Provision = 'provision',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNotEmpty()
  COOKIE_NAME: string;
  @IsNotEmpty()
  COOKIE_PASSWORD: string;

  @IsNotEmpty()
  DB_HOST: string;
  @IsNumberPort()
  DB_PORT: number = 5432;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  @IsNotEmpty()
  DB_NAME: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
