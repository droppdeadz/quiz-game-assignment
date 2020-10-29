<template>
  <div class="main-container">
    <Loader :loaders="loaders"></Loader>
    <div class="container">
      <div class="row justify-content-center">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "./store/store";
import Loader from "./components/Loader";

export default {
  name: 'App',
  data() {
    return {
      loaders: true
    }
  },
  components: {
    Loader
  },
  created() {
    this.loaders = false;
    document.querySelector(':root').style.setProperty('--vh', window.innerHeight/100 + 'px');
  },
  store
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@300;400;500;600&display=swap');
  $font_family_default: 'Bai Jamjuree', sans-serif;
  $color_primary: #FF9A28;

  .font-Bold {
    font-weight: 600;
  }

  .main-container {
    font-family: $font_family_default;
    display: flex;
    align-items: center;
    // min-height: 100vh;
    min-height: calc(var(--vh, 1vh) * 100);
  }

  .md-button.md-theme-default.md-raised.md-custom {
    text-transform: uppercase;
    border-radius: 5px;
    height: 50px;
    min-width: 150px;
    margin: 0;

    .btn-icon-animation-control {
      transition: all .3s;
    }

    @media (max-width: 350px) {
      min-width: 125px;
    }

    &:hover {

      .btn-icon-animation-control {
        animation-name: slide-fade-out;
        animation-duration: 1s;
        animation-direction: alternate;
        animation-fill-mode: forwards;

        &.left {
          animation-name: slide-fade-out-left;
        }
      }
    }

    &:focus {
      outline: 0;
    }
  }

  .md-button.md-theme-default.md-raised.md-primary {
    background-color: $color_primary !important;
    border-color: $color_primary !important;
  }

  @keyframes slide-fade-out {
    0% {
      transform: translateX(0px);
      opacity: 1;
    }

    50% {
      transform: translateX(10px);
      opacity: 1;
    }

    100% {
      transform: translateX(10px);
      opacity: 0;
    }
  }

  @keyframes slide-fade-out-left {
    0% {
      transform: translateX(0px);
      opacity: 1;
    }

    50% {
      transform: translateX(-10px);
      opacity: 1;
    }

    100% {
      transform: translateX(-10px);
      opacity: 0;
    }
  }
</style>
