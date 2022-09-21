<template>
    <div class="row mt-1">
        <loader-component :loading="isLoading"></loader-component>

        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="float-left">
                        <label> Show &nbsp; </label>
                    </div>
                    <div class="float-left">
                        <select
                            class="form-control form-control-sm"
                            v-model="limit"
                        >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="500">500</option>
                            <option value="all">All Show</option>
                        </select>
                    </div>

                    <div class="float-left">
                        <label>&nbsp; entries &nbsp;</label>
                    </div>

                    <div class="float-right">
                        <form>
                            <div class="input-group">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Search By Title"
                                    v-model="keyword"
                                />
                            </div>
                        </form>
                    </div>

                    <div class="clearfix mb-3"></div>

                    <div class="table-responsive">
                        <table class="table table-striped">
                            <tr>
                                <th class="text-center pt-2">
                                    <div
                                        class="custom-checkbox custom-checkbox-table custom-control"
                                    >
                                        <input
                                            type="checkbox"
                                            data-checkboxes="mygroup"
                                            data-checkbox-role="dad"
                                            class="custom-control-input"
                                            id="checkbox-all"
                                        />
                                        <label
                                            for="checkbox-all"
                                            class="custom-control-label"
                                            >&nbsp;</label
                                        >
                                    </div>
                                </th>
                                <th>SL No</th>
                                <th>Title</th>
                                <th>Tag</th>
                                <th>Category</th>
                                <th>Author</th>
                                <th>Created At</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>

                            <tbody
                                v-if="Object.keys(countTotalPost).length > 0"
                            >
                                <tr
                                    v-for="(post, key) in getAllPost.data"
                                    :key="key"
                                >
                                    <td>
                                        <div
                                            class="custom-checkbox custom-control"
                                        >
                                            <input
                                                type="checkbox"
                                                data-checkboxes="mygroup"
                                                class="custom-control-input"
                                                id="checkbox-2"
                                            />
                                            <label
                                                for="checkbox-2"
                                                class="custom-control-label"
                                                >&nbsp;</label
                                            >
                                        </div>
                                    </td>
                                    <td>{{ post.id }}</td>
                                    <td>
                                        {{ post.title }}
                                    </td>
                                    <td>{{ post.tag }}</td>
                                    <td>
                                        <a href="#">{{
                                            post.category.category_name
                                        }}</a
                                        >,
                                        <a href="#">Tutorial</a>
                                    </td>
                                    <td>
                                        <a href="#">
                                            <img
                                                alt="image"
                                                :src="
                                                    '/images/post/' +
                                                    post.thumbnail
                                                "
                                                class="rounded-circle"
                                                width="35"
                                                data-toggle="title"
                                                title=""
                                            />
                                            <div class="d-inline-block ml-1">
                                                Masud
                                            </div>
                                        </a>
                                    </td>
                                    <td>
                                        {{ dateTimeFormat(post.created_at) }}
                                    </td>
                                    <td>
                                        <div
                                            class="badge"
                                            :class="statusColor(post.status)"
                                        >
                                            {{ statusName(post.status) }}
                                        </div>
                                    </td>

                                    <td class="dropdown">
                                        <a
                                            class="btn btn-secondary btn-sm"
                                            data-toggle="dropdown"
                                            ><div
                                                class="d-sm-none d-lg-inline-block"
                                            >
                                                Action
                                            </div></a
                                        >
                                        <div
                                            class="dropdown-menu dropdown-menu-right"
                                        >
                                            <a
                                                @click.prevent="
                                                    editPost(post.id)
                                                "
                                                class="dropdown-item has-icon"
                                                style="cursor: pointer"
                                            >
                                                <i class="far fa-edit" title="Edit"></i>Edit
                                            </a>
                                            <a
                                                @click.prevent="
                                                    deletePost(post.id)
                                                "
                                                class="dropdown-item has-icon"
                                                style="cursor: pointer"
                                            >
                                                <i class="fas fa-times" title="Delete"></i>
                                                Delete
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="8" class="text-center">
                                        Data not found
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <pagination-component
                        :pageData="getAllPost"
                        :limit="limit"
                        :keyword="keyword"
                    ></pagination-component>



                </div>
            </div>
        </div>


    </div>


</template>



<script>
import Mixin from "../../helper/mixin";

export default {
    mixins: [Mixin],

    data() {
        return {
            limit: 10,
            keyword: "",
            page: 1,
        };
    },

    watch: {
        limit(newLimit, oldValue) {
            //console.log(newValue,oldValue)
            this.$store.dispatch("post/geDatatList", [
                this.page,
                newLimit,
                this.keyword,
            ]);
        },
        keyword(newKeyword, oldKeyword) {
            this.$store.dispatch("post/geDatatList", [
                this.page,
                this.limit,
                newKeyword,
            ]);
        },
    },

    mounted() {
        this.$store.dispatch("post/geDatatList", [
            this.page,
            this.limit,
            this.keyword,
        ]);
    },

    computed: {
        getAllPost() {
            return this.$store.state.post.posts;
        },

        countTotalPost() {
            return this.$store.getters["post/totalPost"];
        },

        isLoading() {
            return this.$store.getters["post/isLoading"];
        },

    },

    methods: {
        async deletePost(id) {
            this.$swal({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .get(base_url + "post/delete-post/" + id)
                        .then((response) => {
                            console.log(response.data);
                            this.successMessage(response.data);
                            this.$store.dispatch("post/geDatatList", [
                                this.page,
                                this.limit,
                                this.keyword,
                            ]);
                        })
                        .catch((error) => {
                            console.log(error);
                            this.successMessage(error.data);
                        });
                }
            });
        },

        editPost(id){
            $("#update-modal-form").modal("show");
            this.$store.dispatch('post/editPost',id);
            //console.log(id);
        }
    },
};
</script>
