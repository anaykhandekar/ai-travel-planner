"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askBingToClassifyLogistics = void 0;
const askBingChat_1 = require("./askBingChat");
const withExponentialBackoff_1 = require("./withExponentialBackoff");
const questions = [
    {
        questionId: 'reservationPolicy',
        questionText: 'Is it necessary to make a reservation in advance?',
    },
    {
        questionId: 'costPerPerson',
        questionText: 'Is a ticket or admission fee required to visit? If so, how much does it cost per person?',
    },
    {
        questionId: 'suitableFor',
        questionText: 'Which groups would this attraction be suitable for? Select all that apply:',
        options: [
            "Rainy days (when it's good to be indoors)",
            'couples',
            'large groups',
            'kids',
            'pets',
            'bachelorette parties (loud groups who enjoy drinking)',
        ],
    },
    {
        questionId: 'categories',
        questionText: 'Select a primary category and if it makes sense, a secondary category, that best describes this attraction:',
        options: [
            'action & physical activity (involving hiking, biking, or other physical activity)',
            'arts & museums',
            'entertainment',
            'leisure',
            'nature',
            'bars drinking & nightlife',
            'shopping',
            'sights & landmarks',
        ],
    },
];
async function askBingToClassifyLogistics({ attractionName, destinationName, descriptionLong, }) {
    try {
        let message = `I need help categorizing attractions on my travel app.Please answer the following questions about the attraction "${attractionName}" in ${destinationName}, which my app describes as "${descriptionLong}".\nQuestions:\n`;
        questions.forEach((question, index) => {
            message += `${index + 1}. ${question.questionText} ${question.options?.join(', ') ?? ''}\n\n`;
        });
        // send a message to Bing, timing out after 75 seconds
        // each time out, we will retry up to 3 times, with delays of 3 seconds, 6 seconds, and 12 seconds
        const response = (await (0, withExponentialBackoff_1.withExponentialBackoff)({
            func: async () => {
                return await (0, askBingChat_1.askBingChat)(message);
            },
            maxRetries: 3,
            delay: 3000,
        }));
        const { text } = response ?? {};
        return text;
    }
    catch (error) {
        throw new Error(`Error asking Bing to classify logistics: ${error}`);
    }
}
exports.askBingToClassifyLogistics = askBingToClassifyLogistics;
