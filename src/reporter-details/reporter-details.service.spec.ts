import { Test, TestingModule } from '@nestjs/testing';
import { ReporterDetailsService } from './reporter-details.service';

describe('ReporterDetailsService', () => {
  let service: ReporterDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReporterDetailsService],
    }).compile();

    service = module.get<ReporterDetailsService>(ReporterDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
