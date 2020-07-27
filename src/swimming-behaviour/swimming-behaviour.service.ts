import { Injectable } from '@nestjs/common';
import { UserSessionService } from 'src/user-session/user-session.service';

@Injectable()
export class SwimmingBehaviourService {
    constructor(private readonly userSessionService:UserSessionService){}
    async swimmingBehaviourManagement(number:string, message:any,userData:any){
        if(!userData.swimmingChoice){
            switch(message.Body){
                case "1":case "2":
                    let data:any = {
                        locationChoice:userData.locationChoice,
                        locationData:userData.locationData,
                        reporterData:userData.reporterData,
                        waterTypeData: userData.waterTypeData,
                        mainWaterSourceData:userData.mainWaterSourceData,
                        cultureSystemData:userData.cultureSystemData,
                        firstClinicalSignData:userData.firstClinicalSignData,
                        secondClinicalSignData:userData.secondClinicalSignData,
                        swimmingChoice: this.mapValue(message.Body)
                    }
                    await this.userSessionService.userSessionManagement(number, data)
                    return `Thanks for your information
                            \nPlease type anything for your data..`
                default:
                    return `Please Type 1 or 2
                    \nYou can type _*#*_ any time for start the conversation from beginning(It will erase all your data)`
            }
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
