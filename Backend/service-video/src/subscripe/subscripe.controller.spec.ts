import { Test, TestingModule } from '@nestjs/testing';
import { SubscripeController } from './subscripe.controller';
import { SubscripeService } from './subscripe.service';

describe('SubscripeController', () => {
  let controller: SubscripeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscripeController],
      providers: [SubscripeService],
    }).compile();

    controller = module.get<SubscripeController>(SubscripeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
