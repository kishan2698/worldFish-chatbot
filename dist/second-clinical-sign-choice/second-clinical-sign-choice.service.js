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
exports.SecondClinicalSignChoiceService = void 0;
const common_1 = require("@nestjs/common");
const user_session_service_1 = require("../user-session/user-session.service");
let SecondClinicalSignChoiceService = class SecondClinicalSignChoiceService {
    constructor(userSessionService) {
        this.userSessionService = userSessionService;
    }
    async secondClinicalSignManagement(number, message, userData, twiml) {
        let regex = /^\d(\d)*(,\d(\d)*)*$/;
        if (regex.test(message.Body)) {
            if (!this.checkBetweenData(message.Body)) {
                twiml.message(`Please type options by comma separated between 7 to 12`);
            }
            else {
                if (!userData.secondClinicalSignData) {
                    let data = {
                        locationChoice: userData.locationChoice,
                        locationData: userData.locationData,
                        reporterData: userData.reporterData,
                        waterTypeData: userData.waterTypeData,
                        mainWaterSourceData: userData.mainWaterSourceData,
                        cultureSystemData: userData.cultureSystemData,
                        firstClinicalSignData: userData.firstClinicalSignData,
                        secondClinicalSignData: this.mapKeyValue(message.Body),
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
        }
        else {
            console.log("else");
            twiml.message(`Please type options by comma separated between 7 to 12`);
        }
    }
    mapKeyValue(type) {
        let message = type.split(",");
        let result = [];
        let secondClinicSignSource = {
            '7': 'Abdominal distension/swelling',
            '8': 'Scale protrusion/detachment',
            '9': 'Gill paleness/anemia',
            '10': 'Gill rot',
            '11': 'Fin rot/tail rot',
            '12': 'Swollen anus',
        };
        message.forEach(element => {
            result.push(secondClinicSignSource[element]);
        });
        return result;
    }
    checkBetweenData(data) {
        const response = data.split(',');
        const boolRes = [];
        response.forEach(element => {
            if (element >= 7 && element <= 12) {
                boolRes.push(true);
            }
            else {
                boolRes.push(false);
            }
        });
        if (boolRes.includes(false)) {
            return false;
        }
        else {
            return true;
        }
    }
};
SecondClinicalSignChoiceService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_session_service_1.UserSessionService])
], SecondClinicalSignChoiceService);
exports.SecondClinicalSignChoiceService = SecondClinicalSignChoiceService;
//# sourceMappingURL=second-clinical-sign-choice.service.js.map