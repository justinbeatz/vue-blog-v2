/* eslint-disable no-unused-vars */
const mutations = {
  loginRequest(state, username) {
    state.status = { loggingIn: true };
    state.user = username;
  },
  loginSuccess(state, response) {
    state.status = { loggedIn: true };
    console.log(response);
    console.log(state);
    state.user = response.user;
    state.token = response.token;
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
};

const actions = {
};

const user = JSON.parse(localStorage.getItem('user'));
const token = user ? user.token : null;

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
