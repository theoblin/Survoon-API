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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_survey_dto_1 = require("./dto/create-survey.dto");
const update_survey_dto_1 = require("./dto/update-survey.dto");
const survey_service_1 = require("./survey.service");
const user_decorator_1 = require("../user/user.decorator");
let SurveyController = class SurveyController {
    constructor(surveyService) {
        this.surveyService = surveyService;
    }
    async getOneSurvey(id) {
        return this.surveyService.getOneSurveyById(id);
    }
    async updateOneSurvey(user, newSurveyData) {
        return this.surveyService.updateOneSurvey(user, newSurveyData);
    }
    async createOneSurvey(createSurveyData) {
        return this.surveyService.createOneSurvey(createSurveyData);
    }
    async deleteOneSurvey(id, userId) {
        return this.surveyService.deleteSurveyById(id, userId);
    }
};
exports.SurveyController = SurveyController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Search survey' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return survey' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, common_1.Get)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SurveyController.prototype, "getOneSurvey", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update survey' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The survey has been successfully updated.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, common_1.Put)(),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Body)('survey')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_survey_dto_1.UpdateSurveyDto]),
    __metadata("design:returntype", Promise)
], SurveyController.prototype, "updateOneSurvey", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create survey' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The survey has been successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('survey')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_survey_dto_1.CreateSurveyDto]),
    __metadata("design:returntype", Promise)
], SurveyController.prototype, "createOneSurvey", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete survey' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The survey has been successfully deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)('survey')),
    __param(1, (0, common_1.Body)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SurveyController.prototype, "deleteOneSurvey", null);
exports.SurveyController = SurveyController = __decorate([
    (0, common_1.Controller)('/api/v2/survey'),
    __metadata("design:paramtypes", [survey_service_1.SurveyService])
], SurveyController);
//# sourceMappingURL=survey.controller.js.map