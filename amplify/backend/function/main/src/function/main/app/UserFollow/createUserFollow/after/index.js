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
const incrementUserFollows_1 = __importDefault(require("./incrementUserFollows"));
const hooks = [incrementUserFollows_1.default];
const createTripAfter = (event, ...args) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // IMPORTANT: THIS IS NOT CONNECTED
    /**
     * Hooks can be run parallel or sequentially
     */
    yield Promise.all(hooks.map((hook) => {
        console.log(`Running hook: "${hook.name}"`);
        return hook(event, ...args);
    }));
    return (_a = event.prev) === null || _a === void 0 ? void 0 : _a.result;
});
exports.default = createTripAfter;
