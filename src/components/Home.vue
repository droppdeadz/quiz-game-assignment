<template>
  <div class="col-lg-6">
    <div class="quiz-game-assignment-title-wrap">
      <h1>Quiz Game !</h1>
    </div>
    <md-button class="md-raised md-primary md-custom btn-block" @click="start()">
      <div class="align-items-center d-flex justify-content-center">
        <span class="mr-2">Start</span>
        <div class="btn-icon-animation-control">
          <font-awesome-icon icon="play-circle" />
        </div>
      </div>
    </md-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    start() {
      this.$parent.loaders = true;
      const axios = require('axios');

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
