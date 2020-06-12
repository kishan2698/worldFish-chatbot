import { Test, TestingModule } from '@nestjs/testing';
import { GpsLocationService } from './gps-location.service';

describe('GpsLocationService', () => {
  let service: GpsLocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GpsLocationService],
    }).compile();

    service = module.get<GpsLocationService>(GpsLocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
