import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    quizList: [],
    answerList: [],
  },

  mutations: {
    pushQuestion(state, { value }) {
      state.quizList.push(value);
    },
    pushAnswer(state, { value }) {
      state.answerList.push(value);
    },
    clearQuestion(state) {
      state.quizList = [];
    },
    clearAnswer(state) {
      state.answerList = [];
    },
  },

  actions: {
    pushQuestion({ commit }, value) {
      commit("pushQuestion", { value });
    },
    pushAnswer({ commit }, value) {
      commit("pushAnswer", { value });
    },
    clearQuestion({ commit }) {
      commit("clearQuestion");
    },
    clearAnswer({ commit }) {
      commit("clearAnswer");
    },
  },

  getters: {
    quizList: state => state.quizList,
    answerList: state => state.answerList,
  }
});