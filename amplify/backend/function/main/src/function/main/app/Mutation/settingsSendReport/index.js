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
const ApiClient_1 = __importDefault(require("../../utils/ApiClient/ApiClient"));
const lambda_1 = require("shared-types/graphql/lambda");
const aws = require('aws-sdk');
const ses = new aws.SES({ region: process.env.REGION });
function _privateUpdateUser(variables) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield ApiClient_1.default.get().apiFetch({
            query: lambda_1.lambdaPrivateUpdateUser,
            variables,
        });
        // TODO unified error handler
        if ((_a = res.errors) === null || _a === void 0 ? void 0 : _a.length) {
            // TODO handle error message parsing:
            throw new Error(`Error calling method: ${res.errors.map((error) => error.message)}`);
        }
        return res.data.privateUpdateUser;
    });
}
const settingsSendReport = (event) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(event.identity && 'sub' in event.identity))
        throw new Error('Not authorized');
    if (!event.arguments.input)
        throw new Error('No input params passed in request');
    const supportEmailSource = 'support@hellotrava.com';
    const supportEmailDestination = ['support@hellotrava.com', 'marcin.bojar@teacode.io', 'olivier.purak@teacode.io'];
    const { message, userEmail, userContactEmail } = event.arguments.input;
    // maintaining backwards compatibility
    const userContactEmailToUse = userContactEmail || userEmail;
    const text = `Report environment: ${process.env.ENV}\nReporter's userId: ${event.identity.sub}\nReport message: ${message}${userContactEmailToUse ? `\n\nRespond to this email to contact the reporter: ${userContactEmailToUse}` : ''}`;
    const params = {
        Destination: {
            ToAddresses: supportEmailDestination,
        },
        Message: {
            Body: {
                Text: { Data: text },
            },
            Subject: { Data: 'Trava Report an issue' },
        },
        Source: supportEmailSource,
    };
    const sendEmailPromise = ses.sendEmail(params).promise();
    // update user contactEmail if provided. don't want to persist old userEmail field here, as that might be an apple hidden email, which we can't respond to
    let updateUserPromise;
    if (userContactEmail) {
        updateUserPromise = _privateUpdateUser({
            input: {
                id: event.identity.sub,
                contactEmail: userContactEmail,
            },
        }).catch((error) => {
            console.log('Failed to update user contactEmail', error);
        });
    }
    const [sendEmail] = yield Promise.all([sendEmailPromise, updateUserPromise]);
    if (!sendEmail) {
        throw new Error('Failed to send report');
    }
    return {
        messageId: sendEmail.MessageId,
        __typename: 'SettingsSendReportResponse',
    };
});
exports.default = settingsSendReport;
