import router from '../router';
import ApiServices from '../services/apiservices';
/* eslint-disable no-unused-vars */
const mutations = {
  loginRequest(state, username) {
    state.status = { loggingIn: true };
    state.user = username;
  },
  loginSuccess(state, response) {
    state.status = { loggedIn: true };
    // console.log(response);
    // console.log(state);
    state.user = JSON.parse(atob(response.accessToken.split('.')[1])).email;
    state.token = response.accessToken;
    console.log(state);
    localStorage.setItem('user', JSON.stringify(state.user));
    localStorage.setItem('token', JSON.stringify(state.token));
  },
  loginFailure(state) {
    state.status = {};
    state.user = null;
  },
  logout(state) {
    state.status = {};
    state.user = null;
    localStorage.removeItem('user');
    localStorage.getItem('token');
  },
  registerRequest(state, user) {
    state.status = { registering: true };
  },
  registerSuccess(state, data) {
    state.status = { loggedIn: true };
    state.user = data.user;
    state.token = data.token;
    localStorage.setItem('user', JSON.stringify(state.user));
    localStorage.setItem('token', JSON.stringify(state.token));
    console.log(data);
  },
  registerFailure(state, error) {
    state.status = {};
  },
  setTokenRequest(state, token) {
    state.token = token;
  },
};

const actions = {
  login({ dispatch, commit }, { username, password, remember }) {
    commit('loginRequest', { username });

    ApiServices.login({ username, password, remember })
      .then((response) => {
        commit('loginSuccess', response);
        router.push('/');
      },
      (error) => {
        commit('loginFailure', error);
        dispatch('alert/error', error, { root: true });
      });
  },
  logout({ commit }) {
    const user = JSON.parse(localStorage.getItem('user'));
    const rememberToken = user.remember_token;
    const token = JSON.parse(localStorage.getItem('token'));
    ApiServices.logout({ rememberToken, token });
    commit('logout');
    router.push('/login');
  },
  updateProfile({ dispatch }, userdata) {
    ApiServices.updateProfile(userdata)
      .then((response) => {
        dispatch('alert/success', response, { root: true });
      },
      (error) => {
        dispatch('alert/error', error.response, { root: true });
      });
  },
  register({ dispatch, commit }, userdata) {
    commit('registerRequest', userdata);

    ApiServices.register(userdata)
      .then((response) => {
        console.log(response);
        if (response.length !== 0) {
          const userId = JSON.parse(atob(response.data.accessToken.split('.')[1])).sub;
          const username = JSON.parse(atob(response.data.accessToken.split('.')[1])).email;
          const user = { id: userId, username };
          const token = response.data.accessToken;
          commit('registerSuccess', { user, token });
          router.push(`/profile/${userId}`);
          setTimeout(() => {
            // display success message after route change completes
            dispatch('alert/success', response, { root: true });
          });
        } else {
          router.push('/register');
        }
      },
      (error) => {
        commit('registerFailure', error);
        dispatch('alert/error', error.response, { root: true });
      });
  },
  setToken({ commit }, token) {
    commit('setTokenRequest', token);
  },
};

console.log(localStorage.getItem('user'));

const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;
const token = localStorage.getItem('token') !== 'undefined' ? JSON.parse(localStorage.getItem('token')) : null;

const state = user
  ? { status: { loggedIn: true }, user, token }
  : { status: {}, user: null, token: null };

const getters = {
  getLoggedIn() {
    return state.status.loggedIn;
  },
  getToken() {
    return state.token || JSON.parse(localStorage.getItem('token'));
  },
  getUser() {
    return state.user || JSON.parse(localStorage.getItem('user'));
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
