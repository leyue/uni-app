import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import {user} from './user';
import {detail} from './detail';

const store = new Vuex.Store({
  modules: {user, detail},
});

export default store;
