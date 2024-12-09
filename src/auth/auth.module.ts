import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module'; // Importar o UsersModule
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,  // Adicionar o UsersModule aqui
    JwtModule.register({
      secret: 'estoque_axes',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
