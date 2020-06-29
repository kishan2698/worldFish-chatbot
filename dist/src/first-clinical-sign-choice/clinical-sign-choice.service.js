"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClinicalSignChoiceService = void 0;
const common_1 = require("@nestjs/common");
const user_session_service_1 = require("../user-session/user-session.service");
let ClinicalSignChoiceService = class ClinicalSignChoiceService {
    constructor(userSessionService) {
        this.userSessionService = userSessionService;
    }
    async firstClinicalSignManagement(number, message, userData, twiml) {
        let regex = /[1-12]+(,[1-12]+)+/;
        if (regex.test(message.Body)) {
            if (!userData.firstClinicalSignData) {
                let data = {
                    locationChoice: userData.locationChoice,
                    locationData: userData.locationData,
                    reporterData: userData.reporterData,
                    waterTypeData: userData.waterTypeData,
                    mainWaterSourceData: userData.mainWaterSourceData,
                    cultureSystemData: userData.cultureSystemData,
                    clinicalSignData: this.mapKeyValue(message.Body),
                    swimmingChoice: null
                };
                await this.userSessionService.userSessionManagement(number, data);
                twiml.message(`Swimming behavior: 
                        \nDo your fish show the following behavior (shown in video below, please watch and type options)?
                        \n Please type 1 for yes
                        \n Please type 2 for no`);
                twiml.message().media('https://api.twilio.com/2010-04-01/Accounts/AC01b5311740cfa96b328bbed8b727b387/Messages/MMe0fb12eea3b6f62733b3d676032dfb68/Media/ME1b6277016d87cca275ca078d7c66b72c');
            }
        }
        else {
            twiml.message(`Please type options by comma separated..`);
        }
    }
    mapKeyValue(type) {
        let message = type.split(",");
        let result = [];
        let clinicSignSource = {
            '1': 'Eye exophthalmia/popeye',
            '2': 'Eye endothalmia/eye shrinkage',
            '3': 'Eye opacification',
            '4': 'erosions haemorrhagic lesion',
            '5': 'Skin discoloration',
            '6': 'Open wounds',
            '7': 'Abdominal distension/swelling',
            '8': 'Scale protrusion/detachment',
            '9': 'Gill paleness/anemia',
            '10': 'Gill rot',
            '11': 'Fin rot/tail rot',
            '12': 'Swollen anus',
        };
        message.forEach(element => {
            result.push(clinicSignSource[element]);
        });
        return result;
    }
};
ClinicalSignChoiceService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_session_service_1.UserSessionService])
], ClinicalSignChoiceService);
exports.ClinicalSignChoiceService = ClinicalSignChoiceService;
//# sourceMappingURL=clinical-sign-choice.service.js.map