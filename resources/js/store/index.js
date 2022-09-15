//Install Vuex the createStore instance as a plugin

import { createStore } from 'vuex'
import categoryModule from './modules/category'
import postModule from './modules/post'

const store = createStore({
    modules: {
        post: postModule,
        category: categoryModule
    },

})

export default store