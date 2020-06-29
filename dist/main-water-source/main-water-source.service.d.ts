import { UserSessionService } from 'src/user-session/user-session.service';
export declare class MainWaterSourceService {
    private readonly userSessionService;
    constructor(userSessionService: UserSessionService);
    mainWaterSourceManagement(number: string, message: any, userData: any): Promise<any>;
    mapKeyValue(type: any): any[];
}
