import { Test, TestingModule } from '@nestjs/testing';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';
import { Dog } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateDogDto } from './dto/create-dog.dto';

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

describe('DogsController', () => {
  let controller: DogsController;
  let dogsService: DogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DogsController],
      providers: [DogsService, PrismaService],
    }).compile();

    controller = module.get<DogsController>(DogsController);
    dogsService = module.get<DogsService>(DogsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of dogs', async () => {
      jest
        .spyOn(dogsService, 'findAll')
        .mockImplementation(() => new Promise((resolve) => resolve(dogs)));

      expect(await controller.findAll()).toBe(dogs);
    });
  });

  describe('findOne', () => {
    it('should return a dog', async () => {
      jest
        .spyOn(dogsService, 'findOneById')
        .mockImplementation(() => new Promise((resolve) => resolve(dogs[0])));

      expect(await controller.findOne(1)).toBe(dogs[0]);
    });

    it('should throw an error', async () => {
      jest.spyOn(dogsService, 'findOneById').mockImplementation(() => {
        throw new PrismaClientKnownRequestError('Resource not found', {
          code: 'P2025',
          clientVersion: '2.24.1',
          batchRequestIdx: 0,
          meta: {},
        });
      });

      expect(async () => await controller.findOne(1)).rejects.toThrow(
        'Dog with id 1 not found',
      );
    });

    it('should create a dog', async () => {
      const dog: CreateDogDto = {
        name: 'Dog 4',
        description: 'This is dog4',
        imageUrl:
          'https://images.dog.ceo/breeds/terrier-norwich/n02094258_100.jpg',
      };

      const createdDog: Dog = {
        id: 4,
        name: 'Dog 4',
        description: 'This is dog4',
        imageUrl:
          'https://images.dog.ceo/breeds/terrier-norwich/n02094258_100.jpg',
      };

      jest
        .spyOn(dogsService, 'create')
        .mockImplementation(
          () => new Promise((resolve) => resolve(createdDog)),
        );

      expect(await controller.create(dog)).toBe(createdDog);
    });
  });
});
