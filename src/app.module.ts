import { Module } from '@nestjs/common';
import { DogsModule } from './dogs/dogs.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import configuration from './config/configuration';
import * as Joi from 'joi';

@Module({
  imports: [
    DogsModule,
    PrismaModule,
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
      }),
    }),
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
