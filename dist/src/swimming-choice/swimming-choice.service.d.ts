import { UserSessionService } from 'src/user-session/user-session.service';
export declare class SwimmingChoiceService {
    private readonly userSessionService;
    constructor(userSessionService: UserSessionService);
    swimmingBehaviourManagement(number: string, message: any, userData: any): Promise<string>;
    mapKeyValue(type: any): any[];
}
