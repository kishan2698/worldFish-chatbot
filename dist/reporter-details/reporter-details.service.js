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
exports.ReporterDetailsService = void 0;
const common_1 = require("@nestjs/common");
const user_session_service_1 = require("../user-session/user-session.service");
let ReporterDetailsService = class ReporterDetailsService {
    constructor(userSessionService) {
        this.userSessionService = userSessionService;
    }
    async reporterDataManagement(number, message, userData) {
        if (!userData.reporterName) {
            let data = {
                locationChoice: userData.locationChoice,
                locationData: userData.locationData,
                reporterName: message.Body,
                reporterMobile: null
            };
            this.userSessionService.userSessionManagement(number, data);
            return `Please Enter Your Mobile Number`;
        }
        else if (!userData.reporterMobile) {
            let phoneNoRegx = /^\d{10}$/;
            if (!(phoneNoRegx.test(message.Body))) {
                return `Please enter a valid mobile number`;
            }
            else {
                let data = {
                    locationChoice: userData.locationChoice,
                    locationData: userData.locationData,
                    reporterName: userData.reporterName,
                    reporterMobile: message.Body,
                    reporterEmail: null
                };
                this.userSessionService.userSessionManagement(number, data);
                return `Please Enter Your Email`;
            }
        }
        else if (!userData.reporterEmail) {
            const emailRegx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!(emailRegx.test(message.Body))) {
                return `Please enter a valid email format`;
            }
            else {
                let data = {
                    locationChoice: userData.locationChoice,
                    locationData: userData.locationData,
                    reporterData: { reporterName: userData.reporterName, reporterMobile: userData.reporterMobile, reporterEmail: message.Body },
                    waterTypeChoice: null
                };
                this.userSessionService.userSessionManagement(number, data);
                return `Please Share Water Type:
                        \nPlease Type _*1*_ for Sea Water
                        \nPlease Type _*2*_ for Fresh Water
                        \nPlease Type _*3*_ for Brackish Water`;
            }
        }
    }
};
ReporterDetailsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_session_service_1.UserSessionService])
], ReporterDetailsService);
exports.ReporterDetailsService = ReporterDetailsService;
//# sourceMappingURL=reporter-details.service.js.map