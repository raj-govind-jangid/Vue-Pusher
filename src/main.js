// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Vuetify from 'vuetify';
import VueTimeago from 'vue-timeago';
import VuePusher from 'vue-pusher';
import 'vuetify/dist/vuetify.min.css';
const AUTH_ENDPOINT = 'https://pusher-auth.now.sh';
import Pusher from 'pusher-js';
Pusher.logToConsole = true;
Vue.use(Vuetify);
Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'en'
});
Vue.use(VuePusher, {
  api_key: 'd34060bc154d925283f8',
  options: {
    cluster: 'eu',
    forceTLS: true,
    authEndpoint: `${AUTH_ENDPOINT}/auth`,
    authTransport: 'jsonp'
  }
});
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
});
