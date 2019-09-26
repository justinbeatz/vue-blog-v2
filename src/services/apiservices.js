import api from './api';

export default {
  login(params) {
    return api.post('/signIn', {
      email: params.username,
      password: params.password,
      remember: params.remember,
    });
  },
  logout(params) {
    return api.post('/signOut', {
      remember_token: params.rememberToken,
      token: params.token,
    });
  },
  register(params) {
    return api.post('/signup', {
      email: params.username,
      password: params.password,
      password_confirmation: params.passwordConfirmation,
    });
  },
  getProfile() {
    return api.get('/profiles');
  },
  updateProfile(params) {
    return api.put('/profiles', {
      first_name: params.firstname,
      last_name: params.lastname,
      bio: params.bio,
      type: params.type,
    });
  },
  feed() {
    return api.get('/newsfeed');
  },
  getPost(params) {
    return api.get(`/getpost/${params.id}`);
  },
  newPost(params) {
    /* eslint-disable no-console */
    console.log(params.userid);
    return api.post('/posts', {
      title: params.title,
      content: params.content,
      user_id: params.userid,
      allow_comments: params.allowComments,
    });
  },
};
