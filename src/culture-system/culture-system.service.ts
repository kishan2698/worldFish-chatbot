import { Injectable } from '@nestjs/common';
import { UserSessionService } from 'src/user-session/user-session.service';

@Injectable()
export class CultureSystemService {
    constructor(private readonly userSessionService:UserSessionService){}
    async cultureSystemManagement(number:string, message:any,userData:any){
        let regex = /^[1-4](,[1-4])*$/
        if(regex.test(message.Body)){
            if(!userData.cultureSystemData){
                let data:any = {
                    locationChoice:userData.locationChoice,
                    locationData:userData.locationData,
                    reporterData:userData.reporterData,
                    waterTypeData: userData.waterTypeData,
                    mainWaterSourceData:userData.mainWaterSourceData,
                    cultureSystemData:this.mapKeyValue(message.Body)
                }
                await this.userSessionService.userSessionManagement(number, data)
                return `Thanks For Your Information
                        \nPlease Type OK for your data`
                     }
                    }
        else{
            return `Please type options by comma separated..`
        }
}
    
    mapKeyValue(type:any){
        let message = type.split(",")
        let result = []
        let mainWaterSource:object = {
            '1':'Pond',
            '2':'Tank',
            '3':'Cage',
            '4':'Raceway'
        }
            message.forEach(element => {
                result.push(mainWaterSource[element])
            });
            return result
    }
}
    

