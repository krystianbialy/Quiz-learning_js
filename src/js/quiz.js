var quizQuestion = document.getElementById('quiz__question');
var quizAnswer1 = document.getElementById('quiz__answers-list-item-1');
var quizAnswer2 = document.getElementById('quiz__answers-list-item-2');
var quizAnswer3 = document.getElementById('quiz__answers-list-item-3');
var quizAnswer4 = document.getElementById('quiz__answers-list-item-4');
var quizAllAnswers = [quizAnswer1, quizAnswer2, quizAnswer3, quizAnswer4];
var quizNextQuestionButton = document.getElementById(
  'quiz__next-question-button'
);
var quizScore = document.getElementById('quiz__score-text-value');

var quiz = {
  quizIntroduction: function() {
    quizQuestion.innerHTML =
      'Welcome in my Quiz! Click button below and starting.';
    this.quizAnswersDisplayNone();
    quizNextQuestionButton.innerHTML = 'START';
    this.setIndex -= 1;
  },
  sets: [],
  setIndex: 0,
  score: 0,
  loadQuizSet: function() {
    quizAnswer1.style.display = 'block';
    quizAnswer2.style.display = 'block';
    quizAnswer3.style.display = 'block';
    quizAnswer4.style.display = 'block';
    if (this.setIndex <= this.sets.length - 1) {
      quizQuestion.innerHTML =
        this.setIndex + 1 + '. ' + this.sets[this.setIndex].question;
      quizAnswer1.innerHTML = this.sets[this.setIndex].options[0];
      quizAnswer2.innerHTML = this.sets[this.setIndex].options[1];
      quizAnswer3.innerHTML = this.sets[this.setIndex].options[2];
      quizAnswer4.innerHTML = this.sets[this.setIndex].options[3];
      quizNextQuestionButton.innerHTML = 'Next question';
    } else {
      quizQuestion.innerHTML = 'Quiz over!';
      this.quizAnswersDisplayNone();
      quizNextQuestionButton.style.display = 'none';
      quizScore.innerHTML = 'Score: ' + this.score + ' / ' + this.sets.length;
    }
    if (this.setIndex === this.sets.length - 1) {
      quizNextQuestionButton.innerHTML = 'Look score';
    }
  },
  checkAnswer: function(answerId) {
    var id = answerId.split('');
    var test1 = id[id.length - 1];
    var test2 = this.sets[this.setIndex].answer;
    console.log(test1);
    console.log(test2);
    if (id[id.length - 1] == this.sets[this.setIndex].answer) {
      console.log('GOOD');
      this.score += 1;
      console.log('Score +' + this.score);
    } else {
      console.log('BAD');
    }
  },
  nextQuestion: function() {
    this.setIndex += 1;
    this.loadQuizSet();
  },
  answerNotClickable: function() {
    var quizAnswers = quizAllAnswers;
    for (var number = 0; number < quizAnswers.length; number += 1) {
      quizAnswers[number].style.pointerEvents = 'none';
    }
  },
  answerClickable: function() {
    var quizAnswers = quizAllAnswers;
    for (var number = 0; number < quizAnswers.length; number += 1) {
      quizAnswers[number].style.pointerEvents = 'auto';
    }
  },
  quizAnswersDisplayNone: function() {
    quizAnswer1.style.display = 'none';
    quizAnswer2.style.display = 'none';
    quizAnswer3.style.display = 'none';
    quizAnswer4.style.display = 'none';
  }
};
window.onload = quiz.quizIntroduction();

import { set1, set2, set3, set4 } from './quiz-sets';

quiz.sets.push(set1, set2, set3, set4);

var quizAnswers = quizAllAnswers;
for (var number = 0; number < quizAnswers.length; number += 1) {
  quizAnswers[number].onclick = function() {
    var answerIdName = this.id;
    quiz.checkAnswer(answerIdName);
    quiz.answerNotClickable();
  };
}

quizNextQuestionButton.onclick = function() {
  quiz.nextQuestion();
  quiz.answerClickable();
};
