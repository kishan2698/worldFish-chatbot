"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const greeting_service_1 = require("./greeting/greeting.service");
const user_session_service_1 = require("./user-session/user-session.service");
const gps_location_service_1 = require("./gps-location/gps-location.service");
const reporter_details_service_1 = require("./reporter-details/reporter-details.service");
const water_type_service_1 = require("./water-type/water-type.service");
const main_water_source_service_1 = require("./main-water-source/main-water-source.service");
const culture_system_service_1 = require("./culture-system/culture-system.service");
const first_clinical_sign_choice_service_1 = require("./first-clinical-sign-choice/first-clinical-sign-choice.service");
const swimming_behaviour_service_1 = require("./swimming-behaviour/swimming-behaviour.service");
const second_clinical_sign_choice_service_1 = require("./second-clinical-sign-choice/second-clinical-sign-choice.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, greeting_service_1.GreetingService, user_session_service_1.UserSessionService, gps_location_service_1.GpsLocationService, reporter_details_service_1.ReporterDetailsService, water_type_service_1.WaterTypeService, main_water_source_service_1.MainWaterSourceService, culture_system_service_1.CultureSystemService, first_clinical_sign_choice_service_1.ClinicalSignChoiceService, swimming_behaviour_service_1.SwimmingBehaviourService, second_clinical_sign_choice_service_1.SecondClinicalSignChoiceService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map