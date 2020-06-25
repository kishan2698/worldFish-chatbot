import { Test, TestingModule } from '@nestjs/testing';
import { SwimmingBehaviourService } from './swimming-behaviour.service';

describe('SwimmingBehaviourService', () => {
  let service: SwimmingBehaviourService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SwimmingBehaviourService],
    }).compile();

    service = module.get<SwimmingBehaviourService>(SwimmingBehaviourService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
