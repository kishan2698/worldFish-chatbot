import { UserSessionService } from 'src/user-session/user-session.service';
export declare class ClinicalSignChoiceService {
    private readonly userSessionService;
    constructor(userSessionService: UserSessionService);
    firstClinicalSignManagement(number: string, message: any, userData: any, twiml: any): Promise<void>;
    mapKeyValue(type: any): any[];
}
