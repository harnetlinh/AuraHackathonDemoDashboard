<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12">
            <card :title="stats.money.title" :value="stats.money.value" :percentage="stats.money.percentage"
              :iconClass="stats.money.iconClass" :iconBackground="stats.money.iconBackground"
              :detail="stats.money.detail" directionReverse></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card :title="stats.users.title" :value="stats.users.value" :percentage="stats.users.percentage"
              :iconClass="stats.users.iconClass" :iconBackground="stats.users.iconBackground"
              :detail="stats.users.detail" directionReverse></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card :title="stats.clients.title" :value="stats.clients.value" :percentage="stats.clients.percentage"
              :iconClass="stats.clients.iconClass" :iconBackground="stats.clients.iconBackground"
              :percentageColor="stats.clients.percentageColor" :detail="stats.clients.detail" directionReverse></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card :title="stats.sales.title" :value="stats.sales.value" :percentage="stats.sales.percentage"
              :iconClass="stats.sales.iconClass" :iconBackground="stats.sales.iconBackground"
              :detail="stats.sales.detail" directionReverse></card>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-7 mb-lg">
            <div class="card">
              <div class="card-header pb-0">
                  <h6>List NFT</h6>
              </div>
              <div class="card-body px-0 pt-0 pb-2">
                <div class="table-responsive p-0">
                  <table class="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Image</th>
                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">Token ID
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="nft in listNFT" :key="nft._id">
                        <td>
                          <div class="d-flex px-2 py-1">
                            <div>
                              <img :src="nft.prizeImage" class="avatar avatar-sm me-3" alt="user1" />
                            </div>
                            <div class="d-flex flex-column justify-content-center">
                              <h6 class="mb-0 text-sm">{{ nft.prizeName }}</h6>
                              <p class="text-xs text-secondary mb-0">{{ nft.prizeDescription }}</p>
                            </div>
                          </div>
                        </td>
                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs font-weight-bold">{{ nft.tokenId }}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-5">
            <carousel />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "@/examples/Cards/Card.vue";
import Carousel from "./components/Carousel.vue";

import axios from "axios";
export default {
  name: "dashboard-default",
  data() {
    return {
      stats: {
        money: {
          title: "Aura Coin Price Today",
          value: "0.05 USD",
          percentage: "+10%",
          iconClass: "ni ni-money-coins",
          detail: "since yesterday",
          iconBackground: "bg-gradient-primary",
        },
        users: {
          title: "New Tokens",
          value: "+1 Token",
          percentage: "",
          iconClass: "ni ni-world",
          iconBackground: "bg-gradient-danger",
          detail: "since last month",
        },
        clients: {
          title: "Today Events",
          value: "1 Event",
          percentage: "",
          iconClass: "ni ni-paper-diploma",
          percentageColor: "text-danger",
          iconBackground: "bg-gradient-success",
          detail: "-",
        },
        sales: {
          title: "Incoming Events",
          value: "5 events",
          percentage: "",
          iconClass: "ni ni-cart",
          iconBackground: "bg-gradient-warning",
          detail: "this month",
        },
      },
      listNFT: []
    };
  },
  components: {
    Card,
    Carousel,
  },
  async created() {
    let user = localStorage.getItem("user") ?? false;
    if (!user) {
      this.$router.push('/signin');
    }
    try{
      const response = await axios.get(`https://api.mokadev.org/v1/get-all-nft?user_code=CH18846`);
      this.listNFT = response.data.result;
    }catch(e){
      console.log(e);
    }
  }
};
</script>
