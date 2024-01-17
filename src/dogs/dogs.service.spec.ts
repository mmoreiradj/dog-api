import { Test, TestingModule } from '@nestjs/testing';
import { DogsService } from './dogs.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Dog } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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

describe('DogsService', () => {
  let service: DogsService;
  let createMock: jest.Mock;
  let findManyMock: jest.Mock;
  let findUniqueOrThrowMock: jest.Mock;

  beforeEach(async () => {
    findManyMock = jest.fn();
    findUniqueOrThrowMock = jest.fn();
    createMock = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DogsService,
        {
          provide: PrismaService,
          useValue: {
            dog: {
              findMany: findManyMock,
              findUniqueOrThrow: findUniqueOrThrowMock,
              create: createMock,
            },
          },
        },
      ],
    }).compile();

    service = module.get<DogsService>(DogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    beforeEach(() => {
      findManyMock.mockResolvedValue(dogs);
    });

    it('should return an array of dogs', async () => {
      expect(await service.findAll()).toBe(dogs);
    });
  });

  describe('findOneById', () => {
    describe('when not found', () => {
      beforeEach(() => {
        findUniqueOrThrowMock.mockRejectedValue(() => {
          throw new PrismaClientKnownRequestError('Resource not found', {
            code: 'P2025',
            clientVersion: '2.24.1',
            batchRequestIdx: 0,
            meta: {},
          });
        });
      });

      it('should throw an error', async () => {
        expect(async () => await service.findOneById(1)).rejects.toThrow(
          PrismaClientKnownRequestError,
        );
      });
    });

    describe('when found', () => {
      beforeEach(() => {
        findUniqueOrThrowMock.mockResolvedValue(dogs[0]);
      });

      it('should throw an error', async () => {
        expect(await service.findOneById(1)).toBe(dogs[0]);
      });
    });
  });

  describe('create', () => {
    const dog: Dog = {
      id: 4,
      name: 'Dog 4',
      description: 'This is dog4',
      imageUrl:
        'https://images.dog.ceo/breeds/terrier-norwich/n02094258_100.jpg',
    };
    const createDogDto = {
      name: 'Dog 4',
      description: 'This is dog4',
      imageUrl:
        'https://images.dog.ceo/breeds/terrier-norwich/n02094258_100.jpg',
    };

    beforeEach(() => {
      createMock.mockResolvedValue(dog);
    });

    it('should create a dog', async () => {
      expect(await service.create(createDogDto)).toBe(dog);
    });
  });
});
