import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthController } from './auth/auth.controller';
import { UserCrudService } from './crud/user-crud.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserCrudService],
  controllers: [AuthController],
})
export class UserModule {}
