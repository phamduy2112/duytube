import { Test, TestingModule } from '@nestjs/testing';
import { SubscripeService } from './subscripe.service';

describe('SubscripeService', () => {
  let service: SubscripeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscripeService],
    }).compile();

    service = module.get<SubscripeService>(SubscripeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
