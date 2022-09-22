import './bootstrap'; //import bootstrap
import { createApp } from 'vue';
const app = createApp({}); //vue instance

app.config.errorHandler = () => null;
app.config.warnHandler = () => null;

//Install Vue Sweet alert
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
app.use(VueSweetalert2);

//Install Vue Snotify
import 'vue3-snotify/style';
import snotify from 'vue3-snotify';
app.use(snotify);


//Install Vuex the store instance as a plugin
import store from "./store/index";
app.use(store);

//Momenttum package
import moment from 'moment';
app.use(moment);

//Loader Emitter
//npm i tiny-emitter
import Emitter from 'tiny-emitter'
window.emitter = new Emitter();

//Dashboard
import DashboardComponent from './components/DashboardComponent.vue';
app.component('dashboard-component', DashboardComponent);

//Post Component
import ViewPostComponent from './components/ViewPostComponent.vue';
//import CreatePostComponent from './components/CreatePostComponent.vue';

app.component('view-post-component', ViewPostComponent);
//app.component('create-post-component', CreatePostComponent);

//post component

import ViewPost from './components/post/ViewPost.vue';
app.component('view-post', ViewPost);

import CreatePost from './components/post/CreatePost.vue';
app.component('create-post', CreatePost);

import UpdatePost from "./components/post/UpdatePost.vue"
app.component('update-post', UpdatePost);


//Category Component
import CreateCategoryComponent from './components/category/CreateCategoryComponent.vue';
app.component('create-category-component', CreateCategoryComponent);

import ViewCategoryComponent from './components/category/ViewCategoryComponent.vue';
app.component('view-category-component', ViewCategoryComponent);

//Global register in Pagination
import PaginationComponent from './components/pagination/PaginationComponent.vue';
app.component('pagination-component', PaginationComponent);

import PreloaderComponent from './components/pagination/Preloader.vue';
app.component('preloader-component', PreloaderComponent);

import SpinnerLoader from './components/SpinnerLoader.vue';
app.component('spinner-loader', SpinnerLoader);

import Loader from './components/Loader.vue';
import LoaderComponent from './components/LoaderComponent.vue';
app.component('loader-component', Loader);
app.component('showloader-component', LoaderComponent);

import ModalComponent from './components/Modal.vue';
app.component('modal-component', ModalComponent);

app.mount('#app');