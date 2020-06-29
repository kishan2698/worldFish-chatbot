import { UserSessionService } from 'src/user-session/user-session.service';
export declare class CultureSystemService {
    private readonly userSessionService;
    constructor(userSessionService: UserSessionService);
    cultureSystemManagement(number: string, message: any, userData: any, twiml: any): Promise<void>;
    mapKeyValue(type: any): any[];
}
