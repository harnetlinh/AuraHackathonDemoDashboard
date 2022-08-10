<template>
  <div class="card">
    <div class="card-header pb-0">
      <div class="row">
        <h6 class="col">List NFT</h6>
        <div class="col d-flex justify-content-end">
          <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModalMessage">Create
            NFT</button>
        </div>
      </div>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Image</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="nft in listNFT" :key="nft._id">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <img :src="nft.imageGatewayURL" class="avatar avatar-sm me-3" alt="" />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ nft.prizeName }}</h6>
                    <p class="text-xs text-secondary mb-0">{{ nft.prizeDescription }}</p>
                  </div>
                </div>
              </td>
              <td class="align-middle text-center text-sm">
                <span class="badge badge-sm bg-gradient-success" v-if="!nft.statusID">Free</span>
                <span class="badge badge-sm bg-gradient-danger" v-else>Mount</span>

              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{ converTime(nft.createdAt) }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <!-- Modal -->
    <div class="modal fade" id="exampleModalMessage" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalMessageTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Upload Image To Web3</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="recipient-name" class="col-form-label">Select Image:</label>
              <input type="file" class="form-control" @change="selectImage($event)">
              <p v-if="validateImage" class="text-danger h6">Select image</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn bg-gradient-primary" @click="uploadImage" :disabled="uploadDisabled">{{ uploadButton }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>;
import axios from 'axios';
import moment from 'moment';
export default {
  name: "nft-table",
  data() {
    return {
      image: false,
      validateImage: false,
      uploadButton: 'Upload Image',
      uploadDisabled: false,
      listNFT: [],
    };
  },
  async created(){
    const response = await axios.get('https://api.mokadev.org/v1/all-nft');
    this.listNFT = response.data.data;
  },
  methods: {
    async uploadImage() {
      if(this.uploadDisabled){
        return;
      }

      this.uploadDisabled = true;
      this.validateImage = false;
      if(!this.image) {
        this.validateImage = true;
        return;
      }
      this.uploadButton = 'Uploading...';
      
      const data = new FormData();
      data.append("image", this.image);
      const response = await axios.post("https://api.mokadev.org/v1/upload-image-web3storage", data);
      this.uploadButton = 'Upload Image';
      this.uploadDisabled = false;

      if(response.data.status === "success") {
        this.$notify("Upload image success!");
        const responsex = await axios.get('https://api.mokadev.org/v1/all-nft');
        this.listNFT = responsex.data.data;
      }
    },
    selectImage(e){
      this.image = e.target.files[0] ?? false;
    },
    converTime(time){
      return moment(time).format('DD/MM/YYYY HH:mm:ss');
    }
  }
};

</script>
