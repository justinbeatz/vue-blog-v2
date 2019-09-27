import axios from '../config/axios';

export default {
  login(params) {
    return axios.post('/signin', {
      email: params.username,
      password: params.password,
      remember: params.remember,
    });
  },
  logout(params) {
    return axios.post('/signOut', {
      remember_token: params.rememberToken,
      token: params.token,
    });
  },
  register(params) {
    return axios.post('/register', {
      email: params.username,
      password: params.password,
    });
  },
  getProfile() {
    return axios.get('/profiles');
  },
  updateProfile(params) {
    return axios.put('/profiles', {
      first_name: params.firstname,
      last_name: params.lastname,
      bio: params.bio,
      type: params.type,
    });
  },
  feed() {
    return axios.get('/newsfeed');
  },
  getPost(params) {
    return axios.get(`/getpost/${params.id}`);
  },
  newPost(params) {
    /* eslint-disable no-console */
    console.log(params.userid);
    return axios.post('/posts', {
      title: params.title,
      content: params.content,
      user_id: params.userid,
      allow_comments: params.allowComments,
    });
  },
};
