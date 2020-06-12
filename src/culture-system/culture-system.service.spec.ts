import { Test, TestingModule } from '@nestjs/testing';
import { CultureSystemService } from './culture-system.service';

describe('CultureSystemService', () => {
  let service: CultureSystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CultureSystemService],
    }).compile();

    service = module.get<CultureSystemService>(CultureSystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
