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
exports.SwimmingChoiceService = void 0;
const common_1 = require("@nestjs/common");
const user_session_service_1 = require("../user-session/user-session.service");
let SwimmingChoiceService = class SwimmingChoiceService {
    constructor(userSessionService) {
        this.userSessionService = userSessionService;
    }
    async swimmingBehaviourManagement(number, message, userData) {
        if (!userData.swimmingChoice) {
            let data = {
                locationChoice: userData.locationChoice,
                locationData: userData.locationData,
                reporterData: userData.reporterData,
                waterTypeData: userData.waterTypeData,
                mainWaterSourceData: userData.mainWaterSourceData,
                cultureSystemData: userData.cultureSystemData,
                clinicalSignData: userData.clinicalSignData,
                swimmingData: this.mapKeyValue(message.Body)
            };
            await this.userSessionService.userSessionManagement(number, data);
            return `Please Type ok for your data`;
        }
    }
    mapKeyValue(type) {
        let message = type.split(",");
        let result = [];
        let swimmingSource = {
            '1': 'yes',
            '2': 'no'
        };
        message.forEach(element => {
            result.push(swimmingSource[element]);
        });
        return result;
    }
};
SwimmingChoiceService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_session_service_1.UserSessionService])
], SwimmingChoiceService);
exports.SwimmingChoiceService = SwimmingChoiceService;
//# sourceMappingURL=swimming-choice.service.js.map