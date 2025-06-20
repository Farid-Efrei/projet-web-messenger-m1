import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'jwtsecret',
    }),
    UserModule,
  ],
  providers: [AuthService, AuthResolver],

import { AuthService } from './auth.service';

@Module({
  providers: [AuthService],

  exports: [AuthService],
})
export class AuthModule {}
