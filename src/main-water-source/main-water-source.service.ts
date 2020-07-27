import { Injectable } from '@nestjs/common';
import { UserSessionService } from 'src/user-session/user-session.service';

@Injectable()
export class MainWaterSourceService {
    constructor(private readonly userSessionService:UserSessionService){}
    async mainWaterSourceManagement(number:string, message:any, userData:any):Promise<any>{
        let regex = /^[1-6](,[1-6])*$/
        if(regex.test(message.Body)){
            if(!userData.mainWaterSourceData){
                let data:any = {
                    locationChoice:userData.locationChoice,
                    locationData:userData.locationData,
                    reporterData:userData.reporterData,
                    waterTypeData: userData.waterTypeData,
                    mainWaterSourceData:this.mapKeyValue(message.Body),
                    cultureSystemData:null
                }
                this.userSessionService.userSessionManagement(number, data)
                return `Description of culture system:
                        \nPlease type the options by giving comma separated(eg:1,2,3,4):
                        \n1)Pond
                        \n2)Tank
                        \n3)Cage
                        \n4)Raceway`
            }
        }
        else{
            return `Please type options by comma separated between 1 to 6`
        }
    }
    mapKeyValue(type:any){
        let message = type.split(",")
        let result = []
        let mainWaterSource:object = {
            '1':'Bore Water',
            '2':'River Water',
            '3':'Canal Water',
            '4':'Town Water',
            '5':'Surrounding seawater or brackish water',
            '6':'Rain water'
        }
            message.forEach(element => {
                result.push(mainWaterSource[element])
            });
            return result
    }
}