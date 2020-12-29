import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeormExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    if (exception instanceof QueryFailedError) {
      const err = exception as any;
      if (err.code === '23505') {
        const ctx = host.switchToHttp();
        const next = ctx.getNext<NextFunction>();
        next(new BadRequestException('Unique constraint error'));
      }
    }
  }
}
