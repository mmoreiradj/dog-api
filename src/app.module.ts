import { Module } from '@nestjs/common';
import { DogsModule } from './dogs/dogs.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [DogsModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
