import { Injectable } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Dog } from '@prisma/client';

@Injectable()
export class DogsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createDogDto: CreateDogDto): Promise<Dog> {
    return this.prisma.dog.create({
      data: createDogDto,
    });
  }

  findAll(): Promise<Dog[]> {
    return this.prisma.dog.findMany();
  }

  findOneById(id: number): Promise<Dog> {
    return this.prisma.dog.findUniqueOrThrow({
      where: { id },
    });
  }
}
