<template>
  <div
    class="collapse navbar-collapse w-auto h-auto h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-item
          url="/dashboard"
          :class="getRoute() === 'dashboard' ? 'active' : ''"
          :navText="'Dashboard'"
        >
          <template v-slot:icon>
            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="mt-3 nav-item" v-if="isAdmin">
        <h6
          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="'ms-2'"
        >
          Admin Panel
        </h6>
      </li>
      <li class="nav-item" v-if="isAdmin">
        <sidenav-item
          url="/nft-management"
          :class="getRoute() === 'nft-management' ? 'active' : ''"
          navText="NFT Manager"
        >
          <template v-slot:icon>
            <i class="ni ni-single-02 text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/x"
          navText="Create Public Address"
        >
          <template v-slot:icon>
            <i class="ni ni-air-baloon text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/y"
          navText="Blockchain Tutorials"
        >
          <template v-slot:icon>
            <i class="ni ni-books text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="https://docs.aura.network/"
          navText="Aura Network Document"
          target="_blank"
        >
          <template v-slot:icon>
            <i class="ni ni-atom text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
    </ul>
  </div>
</template>
<script>
import SidenavItem from "./SidenavItem.vue";

export default {
  name: "SidenavList",
  props: {
    cardBg: String
  },
  data() {
    return {
      title: "Argon Dashboard 2",
      controls: "dashboardsExamples",
      isActive: "active",
      isAdmin: false,
    };
  },
  components: {
    SidenavItem,
  },
  mounted(){
    this.isAdmin = localStorage.getItem("isAdmin") ?? false;
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    }
  }
};
</script>
