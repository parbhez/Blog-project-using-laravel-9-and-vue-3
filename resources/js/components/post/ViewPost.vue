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
                                <th class="text-center pt-2"><input :disabled="emptyData()" type="checkbox" @click="selectAll" v-model="selectedAll"/></th>
                                <th>SL No</th>
                                <th>Title</th>
                                <th>Content</th>
                                <th>Tag</th>
                                <th>Category</th>
                                <th>Author</th>
                                <th>Created At</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>

                            <tbody>
                                <tr
                                    v-for="(post, key) in getAllPost.data"
                                    :key="key"
                                >
                                    <td><input type="checkbox" v-model="selected" :value="post.id"/></td>
                                    <td>{{ post.id }}</td>
                                    <td>
                                        {{ post.title }}
                                    </td>
                                    <td>
                                        {{ subString(post.content, 10, '......') }}
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

                                <tr v-if="!emptyData()">
                                    <td colspan="10">
                                        <div class="dropdown">
                                            <button class="btn dropdown-toggle" :class="booleanStatus(isSelected)" :disabled="!isSelected" type="button" data-toggle="dropdown" aria-expanded="false">
                                                Action
                                            </button>
                                            <div class="dropdown-menu">
                                                <button class="dropdown-item btn btn-warning" @click.prevent="changeStatus(selected, 0)" style="cursor: pointer" type="button">Pending</button>
                                                <button class="dropdown-item btn btn-success" @click.prevent="changeStatus(selected, 1)" style="cursor: pointer" type="button">Published</button>
                                                <button class="dropdown-item btn btn-info" @click.prevent="changeStatus(selected ,2)" style="cursor: pointer" type="button">Draft</button>
                                                <button class="dropdown-item btn btn-danger" @click.prevent="removePost(selected)" style="cursor: pointer" type="button">Remove</button>
                                            </div>
                                            </div>
                                    </td>
                                </tr>

                                <tr v-if="emptyData()">
                                    <td colspan="10" class="text-center">
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
import axios from "axios";
import Mixin from "../../helper/mixin";

export default {
    mixins: [Mixin],

    props:{
        categories:{
            type:Array,
            default: []
        }
    },

    data() {
        return {
            limit: 10,
            keyword: "",
            page: 1,
            selected: [],
            isSelected: false,
            selectedAll: false,


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

        selected(selected){
            this.isSelected = (selected.length > 0);
            //console.log(selected.length > 0);
           this.selectedAll = (selected.length === this.countTotalPost.length);
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

        booleanStatus(status){
            let data = {
                false: 'btn-danger',
                true: 'btn-primary',
            }

            return data[status];
        },
        emptyData(){
            return (this.getAllPost.total < 1); //10 < 1 == false
        },

        selectAll(event){

            if(event.target.checked === false){
                this.selected = []
            }else{
                this.selected = [];
                this.countTotalPost.forEach((post)=> {
                //   if(this.selected.indexOf(post.id) === -1){
                //     this.selected.push(post.id)
                //   }
                  this.selected.push(post.id)
               })
            }
        },

        async removePost(selectedPost){
            this.deleteConfirmed(()=>{
                 axios.post(base_url+"post/remove-post", {data:selectedPost})
            .then((response)=>{
                console.log(response.data)
                this.selected = [],
                this.isSelected = false,
                this.selectedAll = false,
                this.successMessage(response.data);
                this.$store.dispatch("post/geDatatList", [
                                this.page,
                                this.limit,
                                this.keyword,
                            ]);
            })
            .catch((error)=>{
                console.log(error)
                this.successMessage(error.data);
            });
            })
        },

        async changeStatus(selectedPost, status){
            await axios.post(base_url + 'post/change-status', { data: selectedPost, status: status } )
            .then((response)=>{
                console.log(response.data)
                this.selected = [],
                this.isSelected = false,
                this.selectedAll = false,
                this.successMessage(response.data);
                this.$store.dispatch("post/geDatatList", [
                                this.page,
                                this.limit,
                                this.keyword,
                            ]);
            })
            .catch((error)=>{
                console.log(error)
            })
        },

        async deletePost(id) {
            this.deleteConfirmed(()=>{
                axios.get(base_url + "post/delete-post/" + id)
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
            })
        },

        editPost(id){
           $("#update-modal-form").modal("show");
            this.$store.dispatch('post/editPost',id);
            //console.log(id);
        }
    },
};
</script>

<style scoped>

</style>
