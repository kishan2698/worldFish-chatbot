import { Test, TestingModule } from '@nestjs/testing';
import { ClinicalSignChoiceService } from './first-clinical-sign-choice.service';

describe('ClinicalSignChoiceService', () => {
  let service: ClinicalSignChoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClinicalSignChoiceService],
    }).compile();

    service = module.get<ClinicalSignChoiceService>(ClinicalSignChoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
