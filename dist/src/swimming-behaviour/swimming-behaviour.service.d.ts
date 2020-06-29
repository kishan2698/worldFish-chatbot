import { UserSessionService } from 'src/user-session/user-session.service';
export declare class SwimmingBehaviourService {
    private readonly userSessionService;
    constructor(userSessionService: UserSessionService);
    swimmingBehaviourManagement(number: string, message: any, userData: any): Promise<string>;
    mapValue(type: any): any;
}
