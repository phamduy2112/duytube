import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    JwtModule.register({
      secret: "Bi_MAT", // Get the secret from environment variables
      signOptions: { expiresIn: '1d' }, // Optional: set token expiration
  }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
