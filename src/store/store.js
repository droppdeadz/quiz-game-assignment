import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    gameStatus: '',
    quizParams: {},
    quizList: [],
    answerList: [],
  },

  mutations: {
    gameStatusChange(state, { value }) {
      state.gameStatus = value;
    },
    pushQuestion(state, { value }) {
      state.quizList = value;
    },
    pushAnswer(state, { value }) {
      state.answerList.push(value);
    },
    pushQueryParams(state, { value }) {
      state.quizParams = value;
    },
    clearQuestion(state) {
      state.quizList = [];
    },
    clearAnswer(state) {
      state.answerList = [];
    },
    clearQueryParams(state) {
      state.quizParams = {};
    },
  },

  actions: {
    gameStatusChange({ commit }, value) {
      commit("gameStatusChange", { value });
    },
    pushQuestion({ commit }, value) {
      commit("pushQuestion", { value });
    },
    pushAnswer({ commit }, value) {
      commit("pushAnswer", { value });
    },
    pushQueryParams({ commit }, value) {
      commit("pushQueryParams", { value });
    },
    clearQuestion({ commit }) {
      commit("clearQuestion");
    },
    clearAnswer({ commit }) {
      commit("clearAnswer");
    },
    clearQueryParams({ commit }) {
      commit("clearQueryParams");
    },
  },

  getters: {
    gameStatus: state => state.gameStatus,
    quizList: state => state.quizList,
    answerList: state => state.answerList,
    quizParams: state => state.quizParams,
  }
});