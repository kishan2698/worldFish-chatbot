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
        let regex = /^[1-6](,[1-6])*$/;
        if (regex.test(message.Body)) {
            if (!userData.firstClinicalSignData) {
                let data = {
                    locationChoice: userData.locationChoice,
                    locationData: userData.locationData,
                    reporterData: userData.reporterData,
                    waterTypeData: userData.waterTypeData,
                    mainWaterSourceData: userData.mainWaterSourceData,
                    cultureSystemData: userData.cultureSystemData,
                    firstClinicalSignData: this.mapKeyValue(message.Body),
                    secondClinicalSignData: null
                };
                await this.userSessionService.userSessionManagement(number, data);
                twiml.message(`Please see below remaining images and please type the number shown in figure
                              \nplease choose by observing the below images and type the option number from picture by comma separated.(eg:7,8,9.....)`);
                twiml.message().media('https://api.twilio.com/2010-04-01/Accounts/AC01b5311740cfa96b328bbed8b727b387/Messages/MM9407d0457a8ad9068c1f4dbcabbd827d/Media/MEcd1e3786adec4812c26521be3339c41b');
                twiml.message().media('https://api.twilio.com/2010-04-01/Accounts/AC01b5311740cfa96b328bbed8b727b387/Messages/MMd0bb26da46a9175e598d203d09cc5766/Media/ME6d0035d183280d4825fbaadebb702e31');
                twiml.message().media('https://api.twilio.com/2010-04-01/Accounts/AC01b5311740cfa96b328bbed8b727b387/Messages/MM1fa3d521c0cd803fec1b3bdd21f930aa/Media/ME8fc4357ca1db37b4def8fca1d56250e9');
                twiml.message().media('https://api.twilio.com/2010-04-01/Accounts/AC01b5311740cfa96b328bbed8b727b387/Messages/MMee5ecd11756d8c285a350fa0cf7df998/Media/ME9f893379a69d60750efb07f02e771db0');
                twiml.message().media('https://api.twilio.com/2010-04-01/Accounts/AC01b5311740cfa96b328bbed8b727b387/Messages/MMe3aced6dcc737c7ff8cbaa86d75557ad/Media/ME0bceecc186653618a46e5e793243449f');
                twiml.message().media('https://api.twilio.com/2010-04-01/Accounts/AC01b5311740cfa96b328bbed8b727b387/Messages/MM8d1b62cfcfff6ff90425103bee69d22d/Media/ME264da3518b6b8b1f49e67b09db4dc9d9');
            }
        }
        else {
            twiml.message(`Please type options by comma separated..`);
        }
    }
    mapKeyValue(type) {
        let message = type.split(",");
        let result = [];
        let firstClinicSignSource = {
            '1': 'Eye exophthalmia/popeye',
            '2': 'Eye endothalmia/eye shrinkage',
            '3': 'Eye opacification',
            '4': 'erosions haemorrhagic lesion',
            '5': 'Skin discoloration',
            '6': 'Open wounds',
        };
        message.forEach(element => {
            result.push(firstClinicSignSource[element]);
        });
        return result;
    }
};
ClinicalSignChoiceService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_session_service_1.UserSessionService])
], ClinicalSignChoiceService);
exports.ClinicalSignChoiceService = ClinicalSignChoiceService;
//# sourceMappingURL=first-clinical-sign-choice.service.js.map