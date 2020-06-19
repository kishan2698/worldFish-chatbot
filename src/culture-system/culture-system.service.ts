import { Injectable } from '@nestjs/common';
import { UserSessionService } from 'src/user-session/user-session.service';

@Injectable()
export class CultureSystemService {
    constructor(private readonly userSessionService:UserSessionService){}
    async cultureSystemManagement(number:string, message:any,userData:any):Promise<string>{
        let regex = /^[1-4](,[1-4])*$/
        if(regex.test(message.Body)){
            if(!userData.cultureSystemData){
                let data:any = {
                    locationChoice:userData.locationChoice,
                    locationData:userData.locationData,
                    reporterData:userData.reporterData,
                    waterTypeData: userData.waterTypeData,
                    mainWaterSourceData:userData.mainWaterSourceData,
                    cultureSystemData:this.mapKeyValue(message.Body),
                    clinicalSignData:null
                }
                await this.userSessionService.userSessionManagement(number, data)
                return `Main clinical signs:
                        \nplease choose from the following pictures if you have observed those clinical signs on your sick fish during the abnormal
                        \n please choose by observing the below image and type the option number from picture by comma separated..(eg:1,2,3..)`
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
    

