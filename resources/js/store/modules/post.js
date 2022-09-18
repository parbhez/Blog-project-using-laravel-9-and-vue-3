export default {

    namespaced: true,

    state: {
        posts: [],
        isLoading: false,
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
            // console.log(data);
            state.posts = data;
            state.isLoading = false;
        }
    },

    actions: {
        async geDatatList({ commit, state }, [page, limit, keyword]) {

            if (keyword != '') {
                state.isLoading = false;
            } else {
                state.isLoading = true;
            }

            await axios
                .get(base_url + 'post/post/list?page=' + page + '&limit=' + limit + "&keyword=" + keyword)
                .then((response) => {
                    commit('getAllPost', response.data.post);
                })
                .catch((error) => {
                    console.log(error)
                    this.isLoading = false;
                })
            history.pushState(null, null, "?page=" + page + "&limit=" + limit + "&keyword=" + keyword);
        },

        async deletePost({ commit }, id) {
            await axios.get(base_url + 'post/delete-post/' + id)
                .then((response) => {
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }

    }








}