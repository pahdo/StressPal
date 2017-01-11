'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = undefined;

var languageStrings = {
    "en-US": {
        "translation": {
            "FACTS": [
                "We will begin a breath exercise. <break time=\"1s\"/> Relax your body. <break time=\"1s\"/> Make sure your spine is straight. <break time=\"1s\"/> Gently shut your eyes. <break time=\"1s\"/> You will begin noticing your breath. <break time=\"3s\"/> Closely follow the sensations of your breath. <break time=\"5s\"/> Notice how the air is cool as you breathe in. <break time=\"5s\"/> Do not worry if your breath is too deep or shallow. Just notice your breath as it is. <break time=\"5s\"/> If your mind is wandering, gently let the thoughts leave your mind. <break time=\"10s\"/> Be aware of all the sensations around you, the ground or chair below, the air, and so on. <break time=\"10s\"/>  Accept and focus on just this moment.<break time=\"10s\"/> Focus your attention on the sensations of your breath. <break time=\"10s\"/>  If your mind feels agitated, accept it and let the thoughts subside. <break time=\"10s\"/> Now, to conclude, focus on the sensation of hearing this Temple Bell. <break time=\"2s\"/> <audio src=\"https://s3.amazonaws.com/hack-the-dorm/templebell48.mp3\"/>",
                "Relax your body. <break time=\"1s\"/> Make sure your spine is straight. <break time=\"1s\"/> Gently shut your eyes. <break time=\"1s\"/> Hold your heart in your hands. <break time = \"1s\" /> Think of someone you love. <break time=\"2s\"/> Perhaps a parent, or a spouse, or a close friend. <break time=\"3s\"/> Notice how much they care for you. <break time=\"5s\"/> This person wants you to be happy. <break time=\"3s\"/>  This person thinks about you. <break time=\"3s\"/> This person supports you. <break time=\"5s\"/> Now, do the same with them. <break time = \"1s\" /> Wish that they are happy. <break time = \"1s\" /> I wish you to be happy. <break time = \"5s\"/> Wish that they will be safe. <break time = \"1s\"/>I wish you to be safe. <break time = \"5s\"/> Appreciate that they are a presence in your life. <break time = \"1s\"/>I am grateful to have you in my life. <break time = \"5s\"/>I wish you to be happy.<break time = \"1s\"/> I wish you to be safe.<break time = \"1s\"/> I am grateful to have you in my life. <break time = \"5s\"/> I wish you to be happy. <break time = \"1s\"/>I wish you to be safe. <break time = \"1s\"/>I am grateful to have you in my life. <break time = \"5s\"/> It is important to remember the love that you have in your life. <break time = \"3s\"/> Love is in all of us, but sometimes we momentarily forget. <break time = \"5s\"/> Now, to conclude, focus on the sensation of hearing this Temple Bell. <break time=\"2s\"/> <audio src=\"https://s3.amazonaws.com/hack-the-dorm/templebell48.mp3\"/>",
                "Relax your body. <break time=\"1s\"/> Make sure your spine is straight. <break time=\"1s\"/> Gently shut your eyes. <break time=\"1s\"/> Try to imagine that you are in fact a tree. <break time=\"3s\"/> You notice that you are tall oak. <break time=\"3s\"/> You see that you are on a college campus. <break time=\"2s\"/> Students are shuffling up and down the sidewalks to their classes <break time=\"2s\"/> Day turns to night, the temperature cools. <break time=\"2s\"/> And then it is bright again and the temperature is warm <break time=\"2s\"/> You see some students chatting in groups, and you see others walking alone with headphones on. <break time=\"3s\"/> Day turns to night, and it gets colder <break time=\"3s\"/> And it is morning again <break time=\"3s\"/>  A student on a bike suddenly stops and leans his bike on you <break time=\"3s\"/> You start to notice the days are getting shorter, and the nights longer. <break time=\"4s\"/> You see yellow and orange leaves on ground and think they might be yours <break time=\"4s\"/> You do not see as many students, but the library windows seem perpetually lit <break time=\"4s\"/> Soon, the first sight of a student brings you surprise, you have not seen one in a while <break time=\"3s\"/> You see another. <break time=\"1s\"/> And another <break time=\"4s\"/> Now you see students shuffling up and down the sidewalks to their classes again. <break time=\"3s\"/> In fact, a semester has passed, and here you are, unmoving, resilient, in the face of change. <break time=\"3s\"/> You are steady <break time=\"5s\"/> Now, to conclude, focus on the sensation of hearing this Temple Bell. <break time=\"2s\"/> <audio src=\"https://s3.amazonaws.com/hack-the-dorm/templebell48.mp3\"/>",
                "Relax your body. <break time=\"1s\"/> Make sure your spine is straight. <break time=\"1s\"/> Gently shut your eyes. <break time=\"1s\"/> Try to imagine that you are in fact a large boulder. <break time=\"3s\"/> You adorn the rocky side of an otherwise, sandy beach. <break time=\"3s\"/> You see the ocean waves coming in ceaselessly <break time=\"2s\"/> People are moving about the area, eating, and chatting. <break time=\"2s\"/> Day turns to night, the temperature cools. <break time=\"2s\"/> And then it is bright again and the temperature is warm <break time=\"2s\"/> You see a group of young men and women playing volleyball <break time=\"3s\"/> Day turns to night, and it gets colder <break time=\"3s\"/> And it is morning again <break time=\"3s\"/> A child, wandering away from his family nearby, gazes in amazement at your size and at your stillness <break time=\"3s\"/> You start to notice the days are getting shorter, and the nights longer. <break time=\"4s\"/> The winds begins to whistle constantly, and you get used to it <break time=\"4s\"/> Footprints in the sand have long since been washed away by water and wind. <break time=\"4s\"/> Soon, you notice that the sun is shining longer. <break time=\"3s\"/> A group of people comes onto the beach. <break time=\"1s\"/> And then there are more groups. <break time=\"4s\"/> Now you see people moving about the area, eating, and chatting again. <break time=\"3s\"/> In fact, a year has passed, and here you are, unmoving, solid, in the face of change. <break time=\"3s\"/> You are steady <break time=\"5s\"/> Now, to conclude, focus on the sensation of hearing this Temple Bell. <break time=\"2s\"/> <audio src=\"https://s3.amazonaws.com/hack-the-dorm/templebell48.mp3\"/>"
            ],
            "SKILL_NAME" : "StressPal",
            "GET_FACT_MESSAGE" : "This exercise will take just two minutes.",
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
        this.emit(':tell', speechOutput, this.t("SKILL_NAME"), randomFact)
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