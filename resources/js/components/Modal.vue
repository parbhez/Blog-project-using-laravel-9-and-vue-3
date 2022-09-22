<template>
     <div
    id="showModal"
    class="modal fade bd-example-modal-sm"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myLargeModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
          Modal
        </div>
    </div>
  </div>
</template>

<script>

function loadModal(url){
    var baseUrl = base_url;
    //console.log(baseUrl);
    var mainUrl = $("#body-content").load(baseUrl + '/' + url);
    //console.log(mainUrl);
  }
  function loadModalEdit(url,id){
    var baseUrl = base_url;
    //console.log(baseUrl);
    var mainUrl = $("#body-content").load(baseUrl + "/" + url + "/" + id);
    //console.log(mainUrl);
  }

    export default {
        props:{
            title:{
                type: String,
                required: false
            }
        },

        data(){
          return {
            base_url: base_url
          }
        }
    }
</script>