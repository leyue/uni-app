import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import {detail} from './detail';

const store = new Vuex.Store({
  modules: {detail},
});

export default store;
