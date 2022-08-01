$(function () {
  //Document ready

  //***************************************************************/
  //**               global scope variables                     **//
  //***************************************************************/

  // Questions array   answers  3 / 2 / 4 / 2 / 4 / 3 / 1 / 2 / 3 / 4 / 2 / 4 / 2 / 3 / 3 / 2 / 4 / 3 / 2 / 2

  const questions = [
    {
      question:
        "What vehicles did the Empire use in its assault on the rebels’ Hoth base?",
      choices: ["Snowspeeders", "TIE Fighters ", "AT-ATs", "TIE Bombers"],
      answer: "option3",
    },
    {
      question: "Which one of these bounty hunters was a droid?",
      choices: ["Boba Fett", "IG-88", "Jango Fett", "Bossk"],
      answer: "option2",
    },
    {
      question:
        "Who infiltrated Jabba’s palace dressed as a bounty hunter named Boussh?",
      choices: [
        "Luke Skywalker",
        "Lando Calrissian",
        "Chewbacca",
        "Princess Leia",
      ],
      answer: "option4",
    },
    {
      question:
        "Which creatures helped the rebels to destroy the Imperial shield generator at the forest moon of Endor?",
      choices: ["Gungans", "Ewoks", "Jawas", "Wookiees"],
      answer: "option2",
    },
    {
      question:
        "Who first discovered stormtroopers on Cloud City but couldn’t tell his friends?",
      choices: ["R2-D2", "Chewbacca", "Han Solo", "C-3PO"],
      answer: "option4",
    },
    {
      question:
        "Before Princess Leia is captured she hides the Death Star plans in the memory of R2-D2. To which planet did R2-D2 flees with fellow droid C-3PO?",
      choices: ["Dagobah", "Anoat", "Tatooine", "Bespin"],
      answer: "option3",
    },
    {
      question: "How many forms of communication does C-3PO speak?",
      choices: [
        "Over 6 million",
        "Over 6,000",
        "Over 3 million ",
        "Over 3,000",
      ],
      answer: "option1",
    },
    {
      question: "What is the Rebel Alliance’s fastest starfighter?",
      choices: ["X Wing", "A Wing", "B Wing", "Y Wing "],
      answer: "option2",
    },
    {
      question:
        "What part of the pit droid did Jar Jar have to hit to get it to stop acting up?",
      choices: ["Head", "Belly", "Nose", "Back"],
      answer: "option3",
    },
    {
      question: "What terrible creature attacks Luke Skywalker on Hoth?",
      choices: ["Rancor", "Tauntaun", "Krayt dragon", "Wampa"],
      answer: "option4",
    },
    {
      question:
        "Which Republic Senator was also the leader of the rebellion against the Empire?",
      choices: [
        "Padmé Amidala",
        "Mon Mothma",
        "Toonbuck Toora",
        "Princess Leia",
      ],
      answer: "option2",
    },
    {
      question:
        "What did R2-D2 do that helped the Millennium Falcon escape from Darth Vader at Cloud City?",
      choices: [
        "He fixed the laser cannon",
        "He opened the door",
        "He repaired the shields",
        "He fixed the hyperdrive",
      ],
      answer: "option4",
    },
    {
      question:
        "Who said this quote? “I’m just a simple man, trying to make my way in the universe.”",
      choices: ["Dengar", "Jango Fet", "Boba Fett", "The Mandalorian"],
      answer: "option2",
    },
    {
      question: "What planet is Cad Bane from?",
      choices: ["Tatooine", "Coruscant", "Duro", "Trandoshan"],
      answer: "option3",
    },
    {
      question: "What is Asajj Ventress’s favorite animal?",
      choices: ["Dianoga", "Nexxu", "Snake", "Acklay"],
      answer: "option3",
    },
    {
      question: "What species is Bossk?",
      choices: ["Rodians", "Trandoshans", "Neimoidians", "Gungans"],
      answer: "option2",
    },
    {
      question:
        "Who successfully tracked the Millennium Falcon and brought Han Solo to Jabba the Hutt?",
      choices: ["Cad Bane", "Bossk", "Zam Wesell", "Boba Fett"],
      answer: "option4",
    },
    {
      question: "Bounty Hunter with a sield-hat.",
      choices: ["IG-88", "Aurra Sing", "Embo", "Dengar"],
      answer: "option3",
    },
    {
      question: "Female bounty hunter of same species (Zabrak) as Darth Maul.",
      choices: ["Jas Emari", "Sugi", "Embo", "Cad Bane"],
      answer: "option2",
    },
    {
      question: "Bounty Hunter known for hunting down Wookiees.",
      choices: ["Sugi", "Jas Emar", "Dengar", "Bossk"],
      answer: "option2",
    },
  ];

  // Game variables

  let questionCounter = 0;
  let score = 0;
  let timer = 0;
  let lastAnswer = true;

  // Screens

  const $previewScreenContainer = $(".preview-container");
  const $questionsContainer = $(".question-container");
  const $scoreScreenContainer = $(".score-container");

  // Buttons

  const $goBtn = $(".go-btn");
  const $optionBtns = $(".option");
  const $restartBtn = $(".restart");

  // Text elements

  const $timerDisplay = $(".time-left");
  const $secondsCounter = $(".counter");

  // Audio
  //Note: Jquery creates an object of the audio element, I had to extract the element from that object, which was in [0]

  const $audioBackground = $("audio.background-sound")[0];
  const $audioCorrectAnswer = $("audio.correct-answer")[0];
  const $audioWrongAnswer = $("audio.wrong-answer")[0];
  const $audioControlYourself = $("audio.control-yourself")[0];
  const $audioNext = $("audio.next")[0];
  const $audioAlarm = $("audio.alarm")[0];

  //*********************************/
  //*****    Event Listeners   ******/
  //*********************************/

  //**         Start listening for START button           **//

  $(".start-btn").on("click", () => {
    const $introScreen = $(".intro-modal");
    const $introScreenContent = $(".intro-modal .container");
    $introScreen.removeClass("active-screen"); //Disable intro screen. This class has a timed animation
    $introScreenContent.addClass("disable"); //This class removes the content immediately
    startScreen(); //Call the Start of the game screen function
  });

  //**       Start listening for GO button       **//

  $goBtn.on("click", () => {
    const $audioStart = $("audio.start-sound")[0];
    $audioStart.play();
    $audioStart.onended = () => {
      //Nice MDN find. Do this until audio has ended
      $audioBackground.play();
    };
    $previewScreenContainer.addClass("disable-preview"); //Hide preview screen
    timer = 120; //Restart values
    score = 0;
    questionCounter = 0;
    lastAnswer = true; //This variable is going to be used as a flag to compare current question answer against the last one
    loadQuestion(questions[questionCounter]); //Load questions once everything is set
    $secondsCounter.text(timer); //Update seconds counter
    $questionsContainer.removeClass("disable"); //Finally, show questions screen
  });

  //**         Start listening for OPTION buttons inside quiz             **//

  $optionBtns.on("click", function () {
    //for some reason arrow functions don't work here
    let lastQuestion = false;
    const $userSelectedElementId = $(this).attr("id"); //Get the id of the selected element ('this') to pass it as the argument for the compareSelection function

    if (
      // If this is the last question, set timer to 0 and avoid timer to get to zero again and go to the score screen unwillingly, also set the last question flag true
      questionCounter + 1 ===
      questions.length
    ) {
      timer = 0;
      lastQuestion = true;
    }
    compareSelection($userSelectedElementId, this, lastQuestion); //Then, compare the selected element id vs the selected element stored answer
  });

  //**      Start listening for RESTART button             **//

  $restartBtn.on("click", () => {
    $audioNext.play();
    $scoreScreenContainer.addClass("disable"); //Hide score screen
    startScreen(); // go back
  });

  //************************************************************************/
  //************************** Functions ***********************************/
  //************************************************************************/

  //**            Start timer and timing conditions function                 **//

  const gameTimer = setInterval(function () {
    timer -= 1; //Every Second

    //Start
    //Print seconds, but don't show negative numbers if counter is below zero at the end transition, it looks weird
    if (timer <= 0) {
      $secondsCounter.text("0");
    } else {
      $secondsCounter.text(timer);
    }

    //Then, set the alarm and color for last 20 seconds
    if (timer <= 20 && timer > 0) {
      $audioAlarm.play();
      $timerDisplay.addClass("red-alarm"); //Change color of timer when timer is 20 seconds or less
    } else if (timer === 0) {
      showResults();
    }
  }, 1000); // End of gameTimer function

  //**                       Start screen function                           **//

  const startScreen = () => {
    //Local scope variables
    const $audioIntro = $("audio.intro-sound")[0];

    //Start
    $goBtn.hide(); // hide Go button for a while. Nice find in the jQuery documentation
    $audioIntro.play();
    $previewScreenContainer.removeClass("disable-preview");
    $audioIntro.onended = () => {
      //Great MDN find! It executes when the audio player has ended
      $goBtn.fadeIn(500); //show go button when audio ends
    };
  }; // End of startScreen function

  //**                      Load questions function                     **//

  const loadQuestion = (newQuestionObject) => {
    //Local scope variables
    const $questionNumber = $(".question-number");
    const $questionsQuantity = $(".questions-quantity");
    const $question = $(".question");
    const $optionOne = $("#option1");
    const $optionTwo = $("#option2");
    const $optionThree = $("#option3");
    const $optionFour = $("#option4");

    //Start
    $optionBtns.removeClass("disableClick"); //Enable click on options back
    $questionNumber.text(questionCounter + 1); //Print question number
    $questionsQuantity.text(questions.length); //Print questions quantity. More can be added in the array
    $question.text(newQuestionObject.question); //Actual question text

    //Set all options and reset colors
    $optionOne
      .text(newQuestionObject.choices[0])
      .removeClass("right-answer-color wrong-answer-color");
    $optionTwo
      .text(newQuestionObject.choices[1])
      .removeClass("right-answer-color wrong-answer-color");
    $optionThree
      .text(newQuestionObject.choices[2])
      .removeClass("right-answer-color wrong-answer-color");
    $optionFour
      .text(newQuestionObject.choices[3])
      .removeClass("right-answer-color wrong-answer-color");
  }; // End of loadQuestion function

  //**           Compare choice vs correct answer function                **//

  const compareSelection = (selectorId, elementSelected, lastQuestion) => {
    //Local scope variables
    const correctEmoji = '<i class="fab fa-jedi-order">&nbsp;</i>';
    const wrongEmoji = '<i class="fab fa-galactic-republic">&nbsp;</i>';

    //Start
    $optionBtns.addClass("disableClick"); //First, disable click until next question

    //Compare results against last answer and play corresponding sound
    if (
      selectorId !== questions[questionCounter].answer &&
      lastAnswer === false
    ) {
      lastAnswer = true; // Reset for next iteration
      // print the corresponding emojis
      $("#" + questions[questionCounter].answer).prepend(correctEmoji);
      $(elementSelected).prepend(wrongEmoji).addClass("wrong-answer-color");
      $audioControlYourself.play();
      $audioControlYourself.onended = () => {
        //Check if this is the last question in order to show results screen
        if (lastQuestion) {
          showResults();
        } else {
          questionCounter += 1;
          $audioNext.play();
          loadQuestion(questions[questionCounter]);
        }
      };
    } else if (
      // if answer is right
      selectorId === questions[questionCounter].answer
    ) {
      lastAnswer = true; // Set for next iteration
      score += 1;
      $(elementSelected).prepend(correctEmoji);
      $(elementSelected).addClass("right-answer-color");
      $audioCorrectAnswer.play();
      $audioCorrectAnswer.onended = () => {
        if (lastQuestion) {
          showResults();
        } else {
          questionCounter += 1;
          $audioNext.play();
          loadQuestion(questions[questionCounter]);
        }
      };
    } else {
      // if answer is wrong
      lastAnswer = false; // Set for next iteration
      $("#" + questions[questionCounter].answer).prepend(correctEmoji);
      $(elementSelected).prepend(wrongEmoji).addClass("wrong-answer-color");
      $audioWrongAnswer.play(); //play wrong answer sound
      $audioWrongAnswer.onended = () => {
        if (lastQuestion) {
          showResults();
        } else {
          questionCounter += 1;
          $audioNext.play();
          loadQuestion(questions[questionCounter]);
        }
      };
    }
  }; // End of compareSelection function

  //**                            End Screen function                              **//

  const showResults = () => {
    //Local scope variables
    const $answerWording = $(".word-answer");
    const $correctAnswersCount = $(".correct-answers");
    const $numberOfQs = $(".total-questions");
    const gradePercentage = (score * 100) / questions.length; //Percentage of correct answers
    const $resultsFirstParagraph = $(".result-message1");
    const $resultsSecondParagraph = $(".result-message2");
    const $audioScoreBelow10 = $("audio.below10")[0];
    const $audioScoreBelow30 = $("audio.below30")[0];
    const $audioScoreBelow50 = $("audio.below50")[0];
    const $audioScoreBelow80 = $("audio.below80")[0];
    const $audioScoreBelow100 = $("audio.below100")[0];
    const $audioPerfectScore = $("audio.perfect-score")[0];
    const wording = {
      //wording object
      perfect: {
        firstParagraph: "Master!...Strong is the force with you",
        secondParagraph: "You might even turn to the dark side!",
      },
      plus80: {
        firstParagraph: "Great!, You got",
        secondParagraph: "You can do even better if you let go of fear",
      },
      plus50: {
        firstParagraph: "You have a lot to learn about the force",
        secondParagraph:
          "Keep feeling the force within you and you'll get better",
      },
      plus30: {
        firstParagraph: "You failed!",
        secondParagraph: "You need to keep listening to your master",
      },
      plus10: {
        firstParagraph: "You failed miserably!",
        secondParagraph: "I've got a bad feeling about this",
      },
      plus00: {
        firstParagraph: "You're just a speck in the universe",
        secondParagraph: "Not even a Padawan!",
      },
    };

    //Start
    $timerDisplay.removeClass("red-alarm"); //reset timer color for next game
    $restartBtn.hide(); //Nice find in jQuery documentation.

    //Stop sounds before showing results, otherwise they overlap when time is up
    $audioWrongAnswer.load();
    $audioCorrectAnswer.load();
    $audioControlYourself.load();
    $audioAlarm.load();
    $audioBackground.load();

    $questionsContainer.addClass("disable"); //Hide the questions screen
    $scoreScreenContainer.removeClass("disable"); //Show the score screen

    // Then check if there is only one correct answer for correct wording

    if (score === 1) {
      $answerWording.text("answer ");
    } else {
      $answerWording.text("answers "); //plural
    }
    $correctAnswersCount.text(score); //Print score
    $numberOfQs.text(questions.length); // Total of questions (variable if more questions added)

    //Wording according to results

    if (gradePercentage === 100) {
      $resultsFirstParagraph.text(wording.perfect.firstParagraph);
      $resultsSecondParagraph.text(wording.perfect.secondParagraph);
      $audioPerfectScore.play();
      $audioPerfectScore.onended = () => {
        $restartBtn.fadeIn(500); //Nice find in jQuery documentation. Hide restart button until score audio is played
      };
    } else if (gradePercentage > 80) {
      $resultsFirstParagraph.text(wording.plus80.firstParagraph);
      $resultsSecondParagraph.text(wording.plus80.secondParagraph);
      $audioScoreBelow100.play();
      $audioScoreBelow100.onended = () => {
        $restartBtn.fadeIn(500);
      };
    } else if (gradePercentage > 50) {
      $resultsFirstParagraph.text(wording.plus50.firstParagraph);
      $resultsSecondParagraph.text(wording.plus50.secondParagraph);
      $audioScoreBelow80.play();
      $audioScoreBelow80.onended = () => {
        $restartBtn.fadeIn(500);
      };
    } else if (gradePercentage > 30) {
      $resultsFirstParagraph.text(wording.plus30.firstParagraph);
      $resultsSecondParagraph.text(wording.plus30.secondParagraph);
      $audioScoreBelow50.play();
      $audioScoreBelow50.onended = () => {
        $restartBtn.fadeIn(500);
      };
    } else if (gradePercentage > 10) {
      $resultsFirstParagraph.text(wording.plus10.firstParagraph);
      $resultsSecondParagraph.text(wording.plus10.secondParagraph);
      $audioScoreBelow30.play();
      $audioScoreBelow30.onended = () => {
        $restartBtn.fadeIn(500);
      };
    } else {
      $resultsFirstParagraph.text(wording.plus00.firstParagraph);
      $resultsSecondParagraph.text(wording.plus00.secondParagraph);
      $audioScoreBelow10.play();
      $audioScoreBelow10.onended = () => {
        $restartBtn.fadeIn(500);
      };
    }
  }; // End of showResults function
}); //Document ready end
