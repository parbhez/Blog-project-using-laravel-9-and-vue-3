<template>
  <!-- Modal -->
  <div
    id="modal-form"
    class="modal fade bd-example-modal-lg"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myLargeModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <form @submit.prevent="save()" role="form">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Write Your Post</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="card">
              <div
                class="col-12"
                v-if="validation_error"
                v-show="elementVisible"
                style="margin-top: 3px"
              >
                <div class="form-group">
                  <div>
                    <ul>
                      <li
                        class="text-danger"
                        v-for="error in validation_error"
                        :key="error[0]"
                      >
                        {{ error[0] }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="card-body">

                <div class="form-group row mb-4">
                  <label
                    class="
                      col-form-label
                      text-md-right
                      col-12 col-md-3 col-lg-3
                    "
                    >Category</label
                  >
                  <div class="col-sm-12 col-md-7">
                    <select class="form-control" v-model="post.category_id">
                      <option value="" disabled>Please Chose a Category</option>
                      <option
                        v-for="(category, index) in categories"
                        :key="index"
                        :value="category.id"
                      >
                        {{ category.category_name }}
                      </option>
                    </select>
                  </div>
                </div>


                <div class="form-group row mb-4">
                  <label
                    class="
                      col-form-label
                      text-md-right
                      col-12 col-md-3 col-lg-3
                    "
                    >Title</label
                  >
                  <div class="col-sm-12 col-md-7">
                    <input
                      type="text"
                      v-model="post.title"
                      class="form-control"
                      placeholder="Title"
                      :disabled="!isCategorySelected"
                    />
                  </div>
                </div>



                <div class="form-group row mb-4">
                  <label
                    class="
                      col-form-label
                      text-md-right
                      col-12 col-md-3 col-lg-3
                    "
                    >Content</label
                  >
                  <div class="col-sm-12 col-md-7">
                    <!-- <textarea
                    :disabled="!isCategorySelected"
                      class="form-control"
                      v-model="post.content"
                      placeholder="Post Content"
                    ></textarea> -->

                    <ckeditor :editor="editor" :disabled="!isCategorySelected" placeholder="Post Content" v-model="post.content" :config="editorConfig"></ckeditor>
                  </div>
                </div>
                <div class="form-group row mb-4">
                  <label
                    class="
                      col-form-label
                      text-md-right
                      col-12 col-md-3 col-lg-3
                    "
                    >Thumbnail</label
                  >
                  <div class="col-sm-12 col-md-4">
                    <div id="image-preview" class="image-preview">
                      <label for="image-upload" id="image-label"
                        >Choose File</label
                      >
                      <input
                       :disabled="!isCategorySelected"
                        type="file"
                        name="image"
                        id="image-upload"
                        @change="onImageChange"
                      />
                    </div>
                  </div>

                  <div class="col-sm-12 col-md-3">
                    <div id="image-preview" class="image-preview">
                      <label for="image-upload" id="image-label"
                        >Image Preview</label
                      >
                      <img
                        :src="post.image"
                        v-if="post.image"
                        width="250"
                        height="250"
                      />
                    </div>
                  </div>
                </div>

                <div class="form-group row mb-4">
                  <label
                    class="
                      col-form-label
                      text-md-right
                      col-12 col-md-3 col-lg-3
                    "
                    >Tags</label
                  >
                  <div class="col-sm-12 col-md-7">
                    <input
                    :disabled="!isCategorySelected"
                      type="text"
                      class="form-control inputtags"
                      v-model="post.tag"
                      placeholder="Tag"
                    />
                  </div>
                </div>
                <div class="form-group row mb-4">
                  <label
                    class="
                      col-form-label
                      text-md-right
                      col-12 col-md-3 col-lg-3
                    "
                    >Status</label
                  >
                  <div class="col-sm-12 col-md-7">
                    <select class="form-control" v-model="post.status" :disabled="!isCategorySelected">
                      <option value="" disabled>Please Choose a Status</option>
                      <option value="1">Publish</option>
                      <option value="2">Draft</option>
                      <option value="0">Pending</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button class="btn" :class="booleanStatus(isStatusSelected)" type="submit" :disabled="!isStatusSelected">
              {{ button_name }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Mixin from '../../helper/mixin'
export default {
mixins: [Mixin],
  props: {
    categories: {
      type: Array,
      default: [],
    },
  },

  mounted() {
    //console.log(this.posts)
  },

  data() {
    return {
      post: {
        title: "",
        category_id: "",
        image: "",
        content: "",
        tag: "",
        status: "",
      },
      page: 1,
      limit: 10,
      keyword: '',
      button_name: "Create Post",
      validation_error: null,
      elementVisible: true,
      isCategorySelected: false,
      isStatusSelected: false,
      editor: ClassicEditor,
      editorConfig: {}
    };
  },

  watch:{
    post:{
        handler({category_id,status}){
            this.isCategorySelected = category_id != '';
            this.isStatusSelected = status != '';
        },
        deep: true, // deep is to listen to objects properly
        immediate: true // immediate so the watcher triggers right away when the component is mounted
    }
  },

  methods: {

    booleanStatus(status){
        let data = {
            true: 'btn-primary',
            false: 'btn-danger'
        }
        return data[status];
    },

    onImageChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      let reader = new FileReader();
      let vm = this;
      reader.onload = (e) => {
        vm.post.image = e.target.result;
      };
      //console.log(vm.post.image);
      reader.readAsDataURL(file);
    },

    async save() {
      this.button_name = "Saving Post...";

      await axios
        .post(base_url + "post/post-create", this.post)
        .then((response) => {
          console.log(response.data);

          if (response.data.status === "success") {
            $("#modal-form").modal("hide");
            this.resetForm();
            this.successMessage(response.data);
            //EventBus.$emit("post-created");
            this.button_name = "Create Post";
            this.$store.dispatch("post/geDatatList", [this.page,this.limit,this.keyword]);
          } else {
            this.successMessage(response.data);
            this.button_name = "Create Post";
          }
        })
        .catch((err) => {
          if (err.response.status == 422) {
            console.log(err.response.data);
            this.validation_error = err.response.data.errors;
            this.validationError();
            this.isValidatedError = true;
            setTimeout(() => (this.elementVisible = false), 20000);
            this.button_name = "Create Post";
          } else {
            this.successMessage(err);
            console.log(err);
            this.isloading = false;
            this.button_name = "Create Post";
          }
        });
    },

    resetForm() {
      this.post = {
        title: "",
        category_id: "",
        image: "",
        content: "",
        tag: "",
        status: "",
      };

      this.validation_error = null;
    },
  },
};
</script>
