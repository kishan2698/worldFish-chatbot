import { Injectable } from '@nestjs/common';
import * as fs from 'fs'
import { UserSessionService } from 'src/user-session/user-session.service';

@Injectable()
export class ReporterDetailsService {
    constructor(private readonly userSessionService:UserSessionService){}
    async reporterDataManagement(number:string, message:any, userData:any):Promise<String>{
        if(!userData.reporterName){
            let data:any = {
                locationChoice:userData.locationChoice,
                locationData:userData.locationData,
                reporterName:message.Body,
                reporterMobile:null
            }
            this.userSessionService.userSessionManagement(number, data)
            return `Please Enter Your MobileNumber`
        }
        else if(!userData.reporterMobile){
            let data:any = {
                locationChoice:userData.locationChoice,
                locationData:userData.locationData,
                reporterName:userData.reporterName,
                reporterMobile:message.Body,
                reporterEmail:null
            }
            this.userSessionService.userSessionManagement(number, data)
            return `Please Enter Your Valid Email`
        }
        else if(!userData.reporterEmail){
            let data:any = {
                locationChoice:userData.locationChoice,
                locationData:userData.locationData,
                reporterData:{reporterName:userData.reporterName, reporterMobile:userData.reporterMobile, reporterEmail:message.Body},
                waterTypeChoice:null
            }
            this.userSessionService.userSessionManagement(number, data)
            return `Please Share Water Type:
                    \n1)Sea Water
                    \n2)Fresh Water
                    \n3)Brackish Water`
        }
    }
}
