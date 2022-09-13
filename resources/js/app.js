import './bootstrap'; //import bootstrap
import { createApp } from 'vue';
const app = createApp({}); //vue instance

//Install Vue Sweet alert
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
app.use(VueSweetalert2);

//Install Vue Snotify
import 'vue3-snotify/style';
import snotify from 'vue3-snotify';
app.use(snotify);


//Install Vuex

import { createStore } from 'vuex';
import storeData from './store/store';

// Create a new store instance.
const store = createStore(storeData);

// Install the store instance as a plugin
app.use(store);


//Dashboard
import DashboardComponent from './components/DashboardComponent.vue';
app.component('dashboard-component', DashboardComponent);

//Post Component
import ViewPostComponent from './components/ViewPostComponent.vue';
import CreatePostComponent from './components/CreatePostComponent.vue';

app.component('view-post-component', ViewPostComponent);
app.component('create-post-component', CreatePostComponent);

//Category Component
import CreateCategoryComponent from './components/category/CreateCategoryComponent.vue';
app.component('create-category-component', CreateCategoryComponent);

//Global register in Pagination
import PaginationComponent from './components/pagination/PaginationComponent.vue';
app.component('pagination-component', PaginationComponent);

import PreloaderComponent from './components/pagination/Preloader.vue';
app.component('preloader-component', PreloaderComponent);

app.mount('#app');
