<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container">
        <a class="navbar-brand" href="/">Vue Blog</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse"
        data-target="#navbarResponsive" aria-controls="navbarResponsive"
        aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item" v-show="blogpost">
                <router-link class="nav-link" to="/" @click="goList('post')">
                Volver al listado</router-link>
              </li>
              <li class="nav-item" v-show="blogsearch">
                <router-link class="nav-link" to="/" @click="goList('search')">
                Volver a la Busqueda</router-link>
              </li>
              <li class="nav-item">
                  <router-link class="nav-link" to="/" exact>Home</router-link>
              </li>
              <li class="nav-item" v-show="loggedIn">
                  <router-link class="nav-link" to="/new-post">Create New Post</router-link>
              </li>
              <li class="nav-item" v-show="!loggedIn">
                  <router-link class="nav-link" to="/register">Register</router-link>
              </li>
              <li class="nav-item" v-show="!loggedIn">
                  <router-link class="nav-link" to="/login">Login</router-link>
              </li>
              <li class="nav-item" v-show="loggedIn">
                  <router-link class="nav-link" :to="`/profile/${userId}`">Profile</router-link>
              </li>
              <li class="nav-item" v-show="loggedIn">
                  <a href="#" class="nav-link" @click="logOut()">Logout</a>
              </li>
            </ul>
        </div>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      links: [],
      userId: '',
    };
  },
};
</script>
