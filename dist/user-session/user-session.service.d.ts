export declare class UserSessionService {
    userSessionManagement(number: string, data: any): any;
    userSessionCreate(number: string, data: object): void;
    userSessionDelete(number: string): void;
    contactSessionManagement(number: string, preData: string, latData: string): void;
    fsPromiseManagement(contact: string, data: object): Promise<any>;
}
