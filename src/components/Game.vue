<template>
  <div class="col-lg-6">
    <form @submit.prevent="pushAnswer()" class="quiz-game-assignment-container">
      <div class="quiz-game-assignment-page-list">
        {{ $route.params.page }} of 10
      </div>
      <div class="quiz-game-assignment-content-wrap" v-if="quizData">
        <div class="quiz-question">
          <h4 v-html="quizData.question"></h4>
        </div>
        <div class="quiz-choices-list-group" v-if="quizData.incorrect_answers">
          <div :key="'choices_' + idx" v-for="(choices, idx) in quizData.incorrect_answers">
            <Choices ref="select_answer" :idx="idx" :correctChoicesKey="correctChoicesKey" :choices="choices" :correctChoices="quizData.correct_answer"></Choices>
          </div>
        </div>
      </div>
      <div class="quiz-game-assignment-button-wrap">
        <md-button class="md-raised md-custom" @click="previousPages()" :disabled="this.$route.params.page == 1">
          <div class="align-items-center d-flex justify-content-center">
            <div class="btn-icon-animation-control left">
              <font-awesome-icon icon="arrow-left" />
            </div>
            <span class="ml-2">Previous</span>
          </div>
        </md-button>
        <md-button type="submit" class="md-raised md-custom md-next md-primary">
          <div class="align-items-center d-flex justify-content-center">
            <span class="mr-2">Next</span>
            <div class="btn-icon-animation-control">
              <font-awesome-icon icon="arrow-right" />
            </div>
          </div>
        </md-button>
      </div>
    </form>
  </div>
</template>

<script>
  import Choices from './Choices.vue'

  export default {
    name: 'Game',
    components: {
      Choices
    },
    data() {
      return {
        currentQuizKey: (parseInt(this.$route.params.page) - 1),
        quizList: this.$store.getters.quizList[0],
        quizData: null,
        quizChoices: [],
        correctChoicesKey: Math.floor(Math.random() * Math.floor(3)),
      }
    },
    methods: {
      previousPages() {
        this.$router.go(-1)
      },

      pushAnswer() {
        let formData = new FormData(event.target);
        let getValue = formData.get('selectChoices');
        let nextQuiz = (parseInt(this.$route.params.page) + 1);

        if (getValue) {
          if (nextQuiz > 10) {
            this.$store.getters.answerList[(parseInt(this.$route.params.page) - 1)] = getValue;
            this.$router.push({ path: '/result'});
          } else {
            this.$store.getters.answerList[(parseInt(this.$route.params.page) - 1)] = getValue;
            this.$router.push({ path: '/game/' + nextQuiz});
          }
        }
      },
    },
    created() {
      if (typeof this.quizList != 'undefined') {
        this.quizData = this.quizList[this.currentQuizKey]
      } else {
        this.$router.push({ path: '/'});
      }
    },
    updated() {
      this.currentQuizKey = (parseInt(this.$route.params.page) - 1)
      this.quizData = this.quizList[this.currentQuizKey]
    },
  }
</script>

<style lang="scss" scoped>
  $color_primary: #FF9A28;

  .quiz-game-assignment-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
  }

  .quiz-game-assignment-page-list {
    text-align: center;

    margin: {
      top: 25px;
      bottom: 25px;
    }
  }

  .quiz-game-assignment-content-wrap {

    .quiz-question {
      margin: {
        bottom: 25px;
      }
    }
  }

  .quiz-game-assignment-button-wrap {
    display: flex;
    justify-content: space-between;

    margin: {
      top: 15px;
      bottom: 15px;
    }
  }

  .md-button.md-theme-default.md-raised.md-next {
    // background-color: $color_primary !important;
    // border-color: $color_primary !important;
  }
</style>