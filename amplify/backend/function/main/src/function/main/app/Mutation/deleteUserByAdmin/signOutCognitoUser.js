"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const cognitoIdentityServiceProvider = new aws_sdk_1.default.CognitoIdentityServiceProvider();
function signOutCognitoUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!process.env.AUTH_TRAVAF4F82E77_USERPOOLID) {
            throw new Error('Cognito user pool not configured');
        }
        yield cognitoIdentityServiceProvider
            .adminUserGlobalSignOut({
            UserPoolId: process.env.AUTH_TRAVAF4F82E77_USERPOOLID,
            Username: username,
        })
            .promise();
    });
}
exports.default = signOutCognitoUser;
