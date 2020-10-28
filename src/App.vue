<template>
  <div class="main-container">
    <div class="loader-container" :class="{'show': loaders}">
      <div class="pos-rel">
        <div class="bar-animate-container">
          <div class="bar-animate bar1"></div>
          <div class="bar-animate bar2"></div>
          <div class="bar-animate bar3"></div>
          <div class="bar-animate bar4"></div>
          <div class="bar-animate bar5"></div>
          <div class="bar-animate bar6"></div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row justify-content-center">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "./store/store";

export default {
  name: 'App',
  data() {
    return {
      loaders: true
    }
  },
  mounted() {
    this.loaders = false;
  },
  store
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@300;400;500;600&display=swap');
  $font_family_default: 'Bai Jamjuree', sans-serif;
  $color_primary: #FF9A28;

  .loader-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: -1;
    opacity: 0;
    transition: .3s;

    &.show {
      z-index: 9999;
      opacity: 1;
    }

    .bar-animate-container {
      width: 60px;
      height: 50px;
      display: flex;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      
      .bar-animate {
        height: 100%;
        width: 8px;
        margin-right: 2px;
        animation: delay 0.8s infinite ease-in-out;

        &.bar1 {
          background-color: #754fa0;
        }
      
        &.bar2 {
          background-color: #09b7bf;
          -webkit-animation-delay: -0.7s;
          animation-delay: -0.7s;
        }
      
        &.bar3 {
          background-color: #90d36b;
          -webkit-animation-delay: -0.6s;
          animation-delay: -0.6s;
        }
      
        &.bar4 {
          background-color: #f2d40d;
          -webkit-animation-delay: -0.5s;
          animation-delay: -0.5s;
        }
      
        &.bar5 {
          background-color: #fcb12b;
          -webkit-animation-delay: -0.4s;
          animation-delay: -0.4s;
        }
      
        &.bar6 {
          background-color: #ed1b72;
          -webkit-animation-delay: -0.3s;
          animation-delay: -0.3s;
        }
      }
    }
  }

  @keyframes delay {
    0%,
    40%,
    100% {
      transform: scaleY(0.05);
      -webkit-transform: scaleY(0.05);
    }

    20% {
      transform: scaleY(1.0);
      -webkit-transform: scaleY(1.0);
    }
  }

  .font-Bold {
    font-weight: 600;
  }

  .main-container {
    font-family: $font_family_default;
    min-height: 100vh;
    display: flex;
    align-items: center;
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
