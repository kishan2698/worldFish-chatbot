import { UserSessionService } from 'src/user-session/user-session.service';
export declare class SwimmingBehaviourService {
    private readonly userSessionService;
    constructor(userSessionService: UserSessionService);
    swimmingBehaviourManagement(number: string, message: any, userData: any): Promise<"Thanks for your information\n                            \nPlease type _*ok*_ for your data.." | "Please Type 1 or 2\n                    \nYou can type _*#*_ any time for start the conversation from beginning(It will erase all your data)">;
    mapValue(type: any): any;
}
