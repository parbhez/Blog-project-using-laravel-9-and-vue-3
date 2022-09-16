export default {

    namespaced: true,

    state: {
        posts: [],
        isLoading: false
    },

    getters: {
        totalPost(state) {
            return state.posts;
        },

        isLoading(state) {
            return state.isLoading;
        }
    },

    mutations: {
        getAllPost(state, data) {
            console.log(data);
            state.posts = data;
            state.isLoading = false;
        }
    },

    actions: {
        async getAllPost({ commit, state }, [limit, keyword]) {

            state.isLoading = true;

            await axios
                .get(base_url + 'post/post/list?limit=' + limit + "&keyword=" + keyword)
                .then((response) => {
                    commit('getAllPost', response.data.post);
                })
                .catch((error) => {
                    console.log(error)
                    this.isLoading = false;
                })
            history.pushState(null, null, "?limit=" + limit + "&keyword=" + keyword);
        },


    }






}