import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from '@/plugins/vuetify';
import 'vuetify/dist/vuetify.min.css';
import firebase from 'firebase';

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCweB30ze8J5-HMy2Gn4VhL5x4sd6dQDio',
      authDomain: 'vue-ads-5a7f2.firebaseapp.com',
      projectId: 'vue-ads-5a7f2',
      storageBucket: 'vue-ads-5a7f2.appspot.com',
      messagingSenderId: '426284876145',
      appId: '1:426284876145:web:9f8731015aa05224c536d0',
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  },
}).$mount('#app');
