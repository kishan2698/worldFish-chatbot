import { Injectable } from '@nestjs/common';
import { UserSessionService } from 'src/user-session/user-session.service';

@Injectable()
export class SwimmingBehaviourService {
    constructor(private readonly userSessionService:UserSessionService){}
    async swimmingBehaviourManagement(number:string, message:any,userData:any){
        if(!userData.swimmingChoice){
            let data:any = {
                locationChoice:userData.locationChoice,
                locationData:userData.locationData,
                reporterData:userData.reporterData,
                waterTypeData: userData.waterTypeData,
                mainWaterSourceData:userData.mainWaterSourceData,
                cultureSystemData:userData.cultureSystemData,
                clinicalSignData:userData.clinicalSignData,
                swimmingChoice: this.mapValue(message.Body)
            }
            await this.userSessionService.userSessionManagement(number, data)
            return `Thanks for your informtion
                    \nPlease type ok for your data..`
        }
    }

    mapValue(type:any){
        let swimmingBehaviourType:object = {
            '1':'Yes',
            '2':'No'
        }
        return swimmingBehaviourType[type]
    }
}
