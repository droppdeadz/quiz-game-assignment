<template>
  <div class="col-lg-6">
    <div class="result-container">
      <div class="result-congrat-wrap">
        <h4>{{ renderScores }}</h4>
      </div>
      <div class="result-score-wrap">
        <h3>Your Score is</h3>
        <h1>{{ scores }}</h1>
      </div>
      <div class="result-try-again-wrap">
        <md-button type="button" class="md-raised md-custom md-next md-primary btn-block" @click="tryAgain()">
          <div class="align-items-center d-flex justify-content-center">
            <span class="mr-2">Try Again</span>
          </div>
        </md-button>
      </div>
      <div class="result-answer-wrap">
        <h3>Result</h3>
        <div :key="'question' + idx" v-for="(quiz, idx) in quizList" class="question-wrap">
          <h5 v-html="(parseInt(idx) + 1) + '. ' + quiz.question"></h5>
          <div v-if="answerList[idx] == quiz.correct_answer">
            <p class="answer-result-text correct">
              Your Answer : <span class="font-Bold" v-html="answerList[idx]"></span> <font-awesome-icon icon="check-circle" />
            </p>
          </div>
          <div v-else>
            <p class="answer-result-text incorrect">
              Your Answer : <span class="font-Bold" v-html="answerList[idx]"></span> <font-awesome-icon icon="times-circle" />
            </p>
            <p class="answer-result-text">
              Correct Answer : <span class="font-Bold" v-html="quiz.correct_answer"></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Result',
    data() {
      return {
        scores: 0,
        quizList: this.$store.getters.quizList[0],
        answerList: this.$store.getters.answerList,
      }
    },
    computed: {
      renderScores() {
        let responseText = "";
        let correctAnswerList = [];
        
        for (const key in this.quizList) {
          if (this.quizList[key]) {
            const element = this.quizList[key];
            let correctAnswer = String(element.correct_answer);
            correctAnswerList.push(correctAnswer);
          }
        }

        this.checkedAnswer(correctAnswerList, this.answerList);

        if (this.scores >= 9) {
          responseText = "Excellent!";
        } else if (this.scores >= 7) {
          responseText = "Good Job!";
        } else if (this.scores >= 4) {
          responseText = "Not Bad!";
        } else if (this.scores > 0) {
          responseText = "That's fine!";
        } else if (this.scores == 0) {
          responseText = "Try again!";
        }

        return responseText;
      }
    },
    methods: {
      checkedAnswer(arr1,arr2) {
        const finalarray =[];
        arr1.forEach((e1) => arr2.forEach((e2) => {
          if (e1 === e2) {
            finalarray.push(e1);
          }
        }));
        this.scores = finalarray.length;
      },
      tryAgain() {
        this.$parent.loaders = true;
        const axios = require('axios');

        this.$store.dispatch("clearQuestion");
        this.$store.dispatch("clearAnswer");

        axios.get('https://opentdb.com/api.php?amount=10&category=9&type=multiple')
        .then((response) => {         
          this.$store.dispatch("pushQuestion", response.data.results);
        })
        .catch((error) => {
          console.log(error);
        }).then(() => {
          this.$parent.loaders = false;
          this.$router.push({ path: '/game/1'})
        })
      }
    },
    beforeCreate() {
      this.$parent.loaders = true;
    },
    created() {
      this.$parent.loaders = false;
      if (typeof this.quizList == 'undefined') {
        this.$router.push({ path: '/'});
      }
    },
  }
</script>

<style lang="scss" scoped>
  .result-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .result-congrat-wrap {
    text-align: center;
    margin: {
      top: 25px;
      bottom: 25px;
    }

    h4 {
      font-weight: 600;
    }
  }

  .result-score-wrap {
    text-align: center;
    margin: {
      top: 25px;
      bottom: 25px;
    }

    h3 {
      font-weight: 600;
    }

    h1 {
      font-size: 70px;
    }
  }

  .result-try-again-wrap {
    margin: {
      top: 25px;
      bottom: 25px;
    }
  }

  .result-answer-wrap {
    margin: {
      top: 25px;
      bottom: 25px;
    }

    .question-wrap {
      margin: {
        bottom: 15px;
      }
    }

    .answer-result-text {

      &.correct {
        color: rgb(0, 135, 0);
      }

      &.incorrect {
        color: rgb(135, 0, 0);
      }
    }

    h3 {
      font-weight: 700;
      text-decoration: underline;
    }

    p {
      margin: 0;
    }
  }
</style>