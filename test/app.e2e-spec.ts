import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { Dog } from '@prisma/client';
import { CreateDogDto } from 'src/dogs/dto/create-dog.dto';

const dogs: Dog[] = [
  {
    id: 1,
    name: 'Dog 1',
    description: 'This is dog1',
    imageUrl: 'https://images.dog.ceo/breeds/terrier-norwich/n02094258_100.jpg',
  },
  {
    id: 2,
    name: 'Dog 2',
    description: 'This is dog2',
    imageUrl: 'https://images.dog.ceo/breeds/terrier-norwich/n02094258_100.jpg',
  },
  {
    id: 3,
    name: 'Dog 3',
    description: 'This is dog3',
    imageUrl: 'https://images.dog.ceo/breeds/terrier-norwich/n02094258_100.jpg',
  },
];

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();

    prismaService = app.get<PrismaService>(PrismaService);
  });

  describe('GET /dogs', () => {
    beforeEach(async () => {
      await prismaService.dog.createMany({
        data: dogs.map((dog) => {
          return {
            name: dog.name,
            description: dog.description,
            imageUrl: dog.imageUrl,
          };
        }),
      });
    });

    afterEach(async () => {
      await prismaService.dog.deleteMany();
      await prismaService.$queryRaw`ALTER SEQUENCE "dogs_id_seq" RESTART WITH 1;`;
    });

    it('should return an array of dogs', () => {
      return request(app.getHttpServer()).get('/dogs').expect(200).expect(dogs);
    });
  });

  describe('GET /dogs/{id}', () => {
    beforeAll(async () => {
      await prismaService.dog.create({
        data: dogs[0],
      });
    });

    afterAll(async () => {
      await prismaService.dog.deleteMany();
      await prismaService.$queryRaw`ALTER SEQUENCE "dogs_id_seq" RESTART WITH 1;`;
    });

    it('should return a dog', () => {
      return request(app.getHttpServer())
        .get('/dogs/1')
        .expect(200)
        .expect(dogs[0]);
    });

    it('should return a 404 error', () => {
      return request(app.getHttpServer()).get('/dogs/2').expect(404);
    });
  });

  describe('POST /dogs', () => {
    const createdDog = dogs[0];
    const createDogDto: CreateDogDto = {
      name: createdDog.name,
      description: createdDog.description,
      imageUrl: createdDog.imageUrl,
    };

    afterEach(async () => {
      await prismaService.dog.deleteMany();
      await prismaService.$queryRaw`ALTER SEQUENCE "dogs_id_seq" RESTART WITH 1;`;
    });

    it('should create a dog', () => {
      return request(app.getHttpServer())
        .post('/dogs')
        .send(createDogDto)
        .expect(201)
        .expect(createdDog);
    });
  });
});
