"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTravaDescriptionLongPrompt = exports.getInputToDescriptionLongPrompt = void 0;
const API_1 = require("shared-types/API");
const getInputToDescriptionLongPrompt = (attractionType, relevantDescription) => {
    if (attractionType === API_1.ATTRACTION_TYPE.DO) {
        const DO = [
            {
                role: 'system',
                content: 'Condense the following text into bullet points that retain the original intent as closely as possible.\n\nPlease provide:\n\n10 bullets about the tourist attraction’s historical or cultural significance.\n10 about important things to do or see at the attraction.\n10 about the vibe, ambiance, or atmosphere.\n10 about anything else notable about the overall experience.',
            },
            {
                role: 'user',
                content: `${relevantDescription}`,
            },
        ];
        return DO;
    }
    else {
        const EAT = [
            {
                role: 'system',
                content: "Condense the following text into bullet points that retain the original intent as closely as possible.\n\nPlease provide:\n\n10 bullets about the restaurant's cuisine and signature dishes. Try to include sensory details such as taste, texture, aroma, and visual appeal, only if these details are explicitly mentioned in the text.\n10 about the decor and ambiance.\n10 about special features or unique offerings.\n10 about anything else notable about the overall experience.",
            },
            {
                role: 'user',
                content: `${relevantDescription}`,
            },
        ];
        return EAT;
    }
};
exports.getInputToDescriptionLongPrompt = getInputToDescriptionLongPrompt;
// below is powered by gpt-4, providing it with a ton of facts generated by gpt-3 and asking gpt-4 to write 4 sentence descriptions
const getTravaDescriptionLongPrompt = (attractionName, attractionType, inputToDescriptionLong) => {
    if (attractionType === API_1.ATTRACTION_TYPE.DO) {
        const DO = [
            {
                role: 'system',
                content: `Given the details of the attraction, craft an engaging yet concise 3-sentence description in the style of a spirited travel blogger. Begin with the tourist attraction’s historical or cultural significance, then delve into distinctive features such as the key things to do, to see, or the vibe. These elements should spark the reader's imagination and curiosity.\n\nStick to these rules:\n\n1. Use simple, approachable language.\n2. Always stay true to the provided facts.\n3. Avoid starting with uninformative phrases like 'Step into', 'Immerse yourself', 'Steeped in', or 'In the heart of'. Instead, start directly with information about the attraction's significance.\n4. Keep each sentence information-rich, vibrant, and engaging. Do not end with generic phrases like 'must-visit,' 'unforgettable experiences'. Instead, end on a distinctive or intriguing detail about the attraction.`,
            },
            {
                role: 'user',
                content: `${attractionName}\n${inputToDescriptionLong}`,
            },
        ];
        return DO;
    }
    else {
        const EAT = [
            {
                role: 'system',
                content: `Given the details of a restaurant, craft an engaging yet concise 3-sentence description in the style of a spirited travel blogger. Begin with the restaurant's culinary approach or unique theme, then delve into distinctive features such as signature dishes, dining experiences, or intriguing decor. These elements should spark the reader's imagination and curiosity.\n\nStick to these rules:\n\n1. Use simple, approachable language.\n2. Always stay true to the provided facts.\n3. Do not mention the location of the restaurant, including any phrases that could hint at its location or its hidden/known status. Avoid starting with phrases like 'Step into...' or 'Immerse yourself...'. Instead, start directly with information about the restaurant's cuisine, atmosphere, or unique offerings.\n4. Keep each sentence information-rich, vibrant, and engaging. Do not end with generic phrases like 'must-visit,' 'unforgettable dining experiences,' or 'dining adventures.' Instead, end on a distinctive or intriguing detail about the restaurant.`,
            },
            {
                role: 'user',
                content: `${attractionName}\n${inputToDescriptionLong}`,
            },
        ];
        return EAT;
    }
};
exports.getTravaDescriptionLongPrompt = getTravaDescriptionLongPrompt;
