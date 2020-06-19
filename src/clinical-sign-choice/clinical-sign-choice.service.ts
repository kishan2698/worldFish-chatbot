import { Injectable } from '@nestjs/common';
import { UserSessionService } from 'src/user-session/user-session.service';

@Injectable()
export class ClinicalSignChoiceService {
    constructor(private readonly userSessionService:UserSessionService){}
    async clinicalSignManagement(number:string, message:any,userData:any):Promise<String>{
        let regex = /^[1-12](,[1-12])*$/
        if(regex.test(message.Body)){
            if(!userData.clinicalSignData){
                let data:any = {
                    locationChoice:userData.locationChoice,
                    locationData:userData.locationData,
                    reporterData:userData.reporterData,
                    waterTypeData: userData.waterTypeData,
                    mainWaterSourceData:userData.mainWaterSourceData,
                    cultureSystemData:userData.cultureSystemData,
                    clinicalSignData:this.mapKeyValue(message.Body)
                }
                await this.userSessionService.userSessionManagement(number, data)
                return `Swimming behavior: 
                        \nDo your fish show the following behavior (shown in video below, please watch and type options)?`
                }
        }
        else{
            return `Please type options by comma separated..`
        }
    }
    mapKeyValue(type:any){
        let message = type.split(",")
        let result = []
        let clinicSignSource:object = {
            '1':'Eye exophthalmia/popeye',
            '2':'Eye endothalmia/eye shrinkage',
            '3':'Eye opacification',
            '4':'erosions haemorrhagic lesion',
            '5':'Skin discoloration',
            '6':'Open wounds',
            '7':'Abdominal distension/swelling',
            '8':'Scale protrusion/detachment',
            '9':'Gill paleness/anemia',
            '10':'Gill rot',
            '11':'Fin rot/tail rot',
            '12':'Swollen anus',
        }
        message.forEach(element => {
            result.push(clinicSignSource[element])
        });
        return result
    }
}
