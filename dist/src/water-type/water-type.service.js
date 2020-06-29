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
exports.WaterTypeService = void 0;
const common_1 = require("@nestjs/common");
const user_session_service_1 = require("../user-session/user-session.service");
let WaterTypeService = class WaterTypeService {
    constructor(userSessionService) {
        this.userSessionService = userSessionService;
    }
    waterTypeManagement(number, message, userData) {
        switch (message.Body) {
            case "1":
            case "2":
            case "3":
                let data = {
                    locationChoice: userData.locationChoice,
                    locationData: userData.locationData,
                    reporterData: userData.reporterData,
                    waterTypeData: this.mapValue(message.Body),
                    mainWaterSourceData: null
                };
                this.userSessionService.userSessionManagement(number, data);
                return `Main Water Source:
                            \nPlease type the options by giving comma separated(eg:1,2,3,4):
                            \n1)Bore Water
                            \n2)River Water
                            \n3)Canal Water
                            \n4)Town Water
                            \n5)Surrounding Seawater or Brackish Water
                            \n6)Rain Water`;
            default:
                this.userSessionService.contactSessionManagement(number, null, null);
                return `PLEASE TYPE 1,2 or 3`;
        }
    }
    mapValue(type) {
        let waterType = {
            '1': 'Sea Water',
            '2': 'Fresh Water',
            '3': 'Brackish Water'
        };
        return waterType[type];
    }
};
WaterTypeService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_session_service_1.UserSessionService])
], WaterTypeService);
exports.WaterTypeService = WaterTypeService;
//# sourceMappingURL=water-type.service.js.map