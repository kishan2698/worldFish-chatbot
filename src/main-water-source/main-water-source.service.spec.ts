import { Test, TestingModule } from '@nestjs/testing';
import { MainWaterSourceService } from './main-water-source.service';

describe('MainWaterSourceService', () => {
  let service: MainWaterSourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MainWaterSourceService],
    }).compile();

    service = module.get<MainWaterSourceService>(MainWaterSourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
