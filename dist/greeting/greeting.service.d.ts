import { UserSessionService } from 'src/user-session/user-session.service';
import { GpsLocationService } from 'src/gps-location/gps-location.service';
import { ReporterDetailsService } from 'src/reporter-details/reporter-details.service';
import { WaterTypeService } from 'src/water-type/water-type.service';
import { MainWaterSourceService } from 'src/main-water-source/main-water-source.service';
import { CultureSystemService } from 'src/culture-system/culture-system.service';
import { ClinicalSignChoiceService } from 'src/first-clinical-sign-choice/first-clinical-sign-choice.service';
import { SwimmingBehaviourService } from 'src/swimming-behaviour/swimming-behaviour.service';
import { SecondClinicalSignChoiceService } from 'src/second-clinical-sign-choice/second-clinical-sign-choice.service';
export declare class GreetingService {
    private readonly userSessionService;
    private readonly locationService;
    private readonly reporterService;
    private readonly waterTypeService;
    private readonly mainWaterTypeService;
    private readonly cultureSystemService;
    private readonly firstClinicSignSystemService;
    private readonly secondClinicSignSystemService;
    private readonly swimmingBehaviourService;
    constructor(userSessionService: UserSessionService, locationService: GpsLocationService, reporterService: ReporterDetailsService, waterTypeService: WaterTypeService, mainWaterTypeService: MainWaterSourceService, cultureSystemService: CultureSystemService, firstClinicSignSystemService: ClinicalSignChoiceService, secondClinicSignSystemService: SecondClinicalSignChoiceService, swimmingBehaviourService: SwimmingBehaviourService);
    greeting(req: any, res: any): Promise<void>;
}
