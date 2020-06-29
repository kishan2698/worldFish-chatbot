import { UserSessionService } from 'src/user-session/user-session.service';
export declare class GpsLocationService {
    private readonly userSessionService;
    constructor(userSessionService: UserSessionService);
    locationManagement(number: string, userData: any, message: any): Promise<String>;
}
