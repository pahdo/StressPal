'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = undefined;

var languageStrings = {
    "en-US": {
        "translation": {
            "FACTS": [
                "Slowly count to ten with me. 1 <break time=\"1s\"/> 2 <break time=\"1s\"/> 3 <break time=\"1s\"/> 4 <break time=\"1s\"/> 5 <break time=\"1s\"/> 6 <break time=\"1s\"/> 7 <break time=\"1s\"/> 8 <break time=\"1s\"/> 9 <break time=\"1s\"/> 10.",
                "Imagine yourself in a peaceful, grassy valley. <audio src=\"https://s3.amazonaws.com/hack-the-dorm/ascending_the_vale_trimmed_48.mp3\"/>",
                "Focus on your breath. Slowly breathe in and out for the next fifteen seconds. Count in your head, and don't let your mind wander.",
                "Tense your body. <break time=\"1s\"/> Release your body. <break time=\"1s\"/> Tense your body. <break time=\"1s\"/> Release your body. <break time=\"1s\"/> Repeat this 8 more times.",
                "Imagine yourself walking on the beachside under a bright blue sky. <audio src=\"https://s3.amazonaws.com/hack-the-dorm/beach_vibes_short_48.mp3\"/>",
                "Imagine yourself in a field of flowers, skipping from place to place. <audio src=\https://s3.amazonaws.com/hack-the-dorm/light_orchestra_short_48.mp3\"/>"
            ],
            "SKILL_NAME" : "StressPal",
            "GET_FACT_MESSAGE" : "Close your eyes. Breathe in. <break time=\"2s\"/> Breathe out. <break time=\"2s\"/>",
            "HELP_MESSAGE" : "You can say I'm stressed or anxious, you can say exit... What can I help you with?",
            "HELP_REPROMPT" : "What can I help you with?",
            "STOP_MESSAGE" : "Goodbye!"
        }
    },
};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        var factArr = this.t('FACTS');
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];

        var speechOutput = this.t("GET_FACT_MESSAGE") + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t("SKILL_NAME"), randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t("HELP_MESSAGE");
        var reprompt = this.t("HELP_MESSAGE");
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    }
};