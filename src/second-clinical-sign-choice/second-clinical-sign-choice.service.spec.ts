import { Test, TestingModule } from '@nestjs/testing';
import { SecondClinicalSignChoiceService } from './second-clinical-sign-choice.service';

describe('SecondClinicalSignChoiceService', () => {
  let service: SecondClinicalSignChoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecondClinicalSignChoiceService],
    }).compile();

    service = module.get<SecondClinicalSignChoiceService>(SecondClinicalSignChoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
