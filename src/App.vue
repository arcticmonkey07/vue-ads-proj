<template>
  <v-app app>
    <v-navigation-drawer app temporary v-model="drawer">
      <v-list>
        <v-list-item v-for="link of links" :key="link.title" :to="link.url">
          <v-list-item-icon>
            <v-icon>
              {{ link.icon }}
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="link.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="onLogout" v-if="isUserLoggedIn">
          <v-list-item-icon>
            <v-icon>
              mdi-exit-to-app
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="'Logout'"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-card class="mb-10">
      <v-toolbar dark>
        <v-toolbar>
          <v-app-bar-nav-icon
            @click="drawer = !drawer"
            class="hidden-md-and-up"
          ></v-app-bar-nav-icon>
          <v-toolbar-title>
            <router-link to="/" tag="span" class="pointer"
              >Ad application</router-link
            >
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-sm-and-down">
            <v-btn v-for="link in links" :key="link.title" :to="link.url">
              <v-icon left>{{ link.icon }}</v-icon>
              {{ link.title }}
            </v-btn>
            <v-btn @click="onLogout" v-if="isUserLoggedIn">
              <v-icon left>mdi-exit-to-app</v-icon>
              Logout
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </v-toolbar>
    </v-card>

    <v-content>
      <router-view></router-view>
    </v-content>

    <template v-if="error">
      <v-snackbar
        :timeout="5000"
        color="primary"
        elevation="24"
        @input="closeError"
        :value="true"
      >
        {{ error }}
        <template>
          <v-btn color="pink" @click="closeError">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    links() {
      if (this.isUserLoggedIn) {
        return [
          { title: 'Orders', icon: 'mdi-bookmark', url: '/orders' },
          { title: 'New ad', icon: 'mdi-note-plus', url: '/new' },
          {
            title: 'My ads',
            icon: 'mdi-format-list-bulleted-square',
            url: '/list',
          },
        ];
      }

      return [
        { title: 'Login', icon: 'mdi-lock', url: '/login' },
        { title: 'Registration', icon: 'mdi-face', url: '/registration' },
      ];
    },
  },
  methods: {
    closeError() {
      this.$store.dispatch('clearError');
    },
    onLogout() {
      this.$store.dispatch('logoutUser');
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
