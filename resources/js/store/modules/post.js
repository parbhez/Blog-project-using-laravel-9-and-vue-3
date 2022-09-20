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
            //state.isLoading = false;
            window.emitter.emit('changeLoaderStatus', false);
        }
    },

    actions: {
        // async geDatatList({ commit, state }, [page, limit, keyword]) {

        //     if (keyword != '') {
        //         state.isLoading = false;
        //     } else {
        //         state.isLoading = true;
        //     }

        //     await axios
        //         .get(base_url + 'post/post/list?page=' + page + '&limit=' + limit + "&keyword=" + keyword)
        //         .then((response) => {
        //             commit('getAllPost', response.data.post);
        //         })
        //         .catch((error) => {
        //             console.log(error)
        //             this.isLoading = false;
        //         })
        //     history.pushState(null, null, "?page=" + page + "&limit=" + limit + "&keyword=" + keyword);
        // },

        async geDatatList({ commit, state }, [page, limit, keyword]) {

            if (keyword != '') {
                window.emitter.emit('changeLoaderStatus', false);
            } else {
                window.emitter.emit('changeLoaderStatus', true);
            }

            setTimeout(() => {
                axios
                    .get(base_url + 'post/post/list?page=' + page + '&limit=' + limit + "&keyword=" + keyword)
                    .then((response) => {
                        commit('getAllPost', response.data.post);
                    })
                    .catch((error) => {
                        console.log(error)
                        window.emitter.emit('changeLoaderStatus', false);
                    })
            }, 1000);

            history.pushState(null, null, "?page=" + page + "&limit=" + limit + "&keyword=" + keyword);
        },


    }








}