import { Injectable } from '@nestjs/common';
import { UserSessionService } from 'src/user-session/user-session.service';

@Injectable()
export class ClinicalSignChoiceService {
    constructor(private readonly userSessionService:UserSessionService){}
    async clinicalSignManagement(number:string, message:any,userData:any, twiml:any){
        let regex = /[1-12]+(,[1-12]+)+/
        if(regex.test(message.Body)){
            if(!userData.clinicalSignData){
                let data:any = {
                    locationChoice:userData.locationChoice,
                    locationData:userData.locationData,
                    reporterData:userData.reporterData,
                    waterTypeData: userData.waterTypeData,
                    mainWaterSourceData:userData.mainWaterSourceData,
                    cultureSystemData:userData.cultureSystemData,
                    clinicalSignData:this.mapKeyValue(message.Body),
                    swimmingChoice:null
                }
                await this.userSessionService.userSessionManagement(number, data)
                twiml.message(`Swimming behavior: 
                        \nDo your fish show the following behavior (shown in video below, please watch and type options)?
                        \n Please type 1 for yes
                        \n Please type 2 for no`)
                twiml.message().media('https://api.twilio.com/2010-04-01/Accounts/AC01b5311740cfa96b328bbed8b727b387/Messages/MMe0fb12eea3b6f62733b3d676032dfb68/Media/ME1b6277016d87cca275ca078d7c66b72c')
                }
        }
        else{
            twiml.message(`Please type options by comma separated..`)
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
