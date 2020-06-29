import { UserSessionService } from 'src/user-session/user-session.service';
export declare class WaterTypeService {
    private readonly userSessionService;
    constructor(userSessionService: UserSessionService);
    waterTypeManagement(number: string, message: any, userData: any): string;
    mapValue(type: any): any;
}
