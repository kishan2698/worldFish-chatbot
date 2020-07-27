import { UserSessionService } from 'src/user-session/user-session.service';
export declare class SecondClinicalSignChoiceService {
    private readonly userSessionService;
    constructor(userSessionService: UserSessionService);
    secondClinicalSignManagement(number: string, message: any, userData: any, twiml: any): Promise<void>;
    mapKeyValue(type: any): any[];
    checkBetweenData(data: any): boolean;
}
