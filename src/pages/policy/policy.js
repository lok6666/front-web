import {
	createApp
} from 'vue';
import policy from './policy.vue';
import router from '../../router';
import store from '../../store';

createApp(policy).use(store).use(router).mount('#app');