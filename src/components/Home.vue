<template>
  <div class="col-lg-6">
    <div class="quiz-game-assignment-title-wrap">
      <h1>Quiz Game ! test</h1>
    </div>
    <form @submit.prevent="start()">
      <div>
        <div class="form-group">
          <label for="quizCategory">Category</label>
          <select v-model="quizCategory" name="quizCategory" id="quizCategory" class="form-control">
            <option :value="{ id: '9', text: 'General Knowledge' }">General Knowledge</option>
            <option :value="{ id: '10', text: 'Entertainment: Books' }">Entertainment: Books</option>
            <option :value="{ id: '11', text: 'Entertainment: Film' }">Entertainment: Film</option>
            <option :value="{ id: '12', text: 'Entertainment: Music' }">Entertainment: Music</option>
            <option :value="{ id: '14', text: 'Entertainment: Television' }">Entertainment: Television</option>
            <option :value="{ id: '15', text: 'Entertainment: Video Games' }">Entertainment: Video Games</option>
            <option :value="{ id: '16', text: 'Entertainment: Board Games' }">Entertainment: Board Games</option>
            <option :value="{ id: '17', text: 'Science & Nature' }">Science & Nature</option>
            <option :value="{ id: '18', text: 'Science: Computers' }">Science: Computers</option>
            <option :value="{ id: '20', text: 'Mythology' }">Mythology</option>
            <option :value="{ id: '21', text: 'Sports' }">Sports</option>
            <option :value="{ id: '22', text: 'Geography' }">Geography</option>
            <option :value="{ id: '23', text: 'History' }">History</option>
            <option :value="{ id: '26', text: 'Celebrities' }">Celebrities</option>
            <option :value="{ id: '27', text: 'Animals' }">Animals</option>
            <option :value="{ id: '28', text: 'Vehicles' }">Vehicles</option>
            <option :value="{ id: '29', text: 'Entertainment: Comics' }">Entertainment: Comics</option>
            <option :value="{ id: '31', text: 'Entertainment: Japanese Anime & Manga' }">Entertainment: Japanese Anime & Manga</option>
            <option :value="{ id: '32', text: 'Entertainment: Cartoon & Animations' }">Entertainment: Cartoon & Animations</option>
          </select>
        </div>
        <div class="form-group">
          <label for="quizDifficulty">Difficulty</label>
          <select v-model="quizDifficulty" name="quizDifficulty" id="quizDifficulty" class="form-control">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>
      <md-button type="submit" class="md-raised md-primary md-custom btn-block">
        <div class="align-items-center d-flex justify-content-center">
          <span class="mr-2">Start</span>
          <div class="btn-icon-animation-control">
            <font-awesome-icon icon="play-circle" />
          </div>
        </div>
      </md-button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        quizCategory: { id: '9', text: 'General Knowledge' },
        quizDifficulty: 'easy'
      }
    },
    methods: {
      start() {
        this.$parent.loaders = true;
        const axios = require('axios');
        
        this.$store.dispatch("clearQuestion");
        this.$store.dispatch("clearAnswer");

        let queryParams = {
          category: this.quizCategory.id,
          category_name: this.quizCategory.text,
          difficulty: this.quizDifficulty,
          amount: 10,
          encode: 'url3986',
          type: 'multiple'
        }

        axios.get('https://opentdb.com/api.php', {
            params: queryParams
          })
          .then((response) => {
            this.$store.dispatch("pushQuestion", response.data.results);
            this.$store.dispatch("pushQueryParams", queryParams);
          })
          .catch((error) => {
            console.log(error);
          }).then(() => {
            this.$store.dispatch("gameStatusChange", 'start');
            this.$parent.loaders = false;
            this.$router.push({
              path: '/game/1'
            })
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .quiz-game-assignment-title-wrap {
    text-align: center;
    border: 5px solid #343a40;
    padding: 15px 0px;
    border-radius: 10px;

    margin: {
      bottom: 50px;
    }

    h1 {
      color: #343a40;
      text-transform: uppercase;
    }
  }
</style>