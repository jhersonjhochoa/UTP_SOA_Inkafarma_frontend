<script setup lang="ts">
import { computed } from "@vue/runtime-core";
import { useRoute } from "vue-router";

  let r_name = computed(() => {
    return useRoute().name
  })
  
</script>
<template>
  <div class="sidebar" data-image="../../src/assets/img/sidebar.jpg" data-color="black">

    <div class="sidebar-wrapper">
      <div class="logo">
        <a href="https://inkafarma.pe" target="_blank" class="simple-text logo-mini">
          <img src="/src/assets/img/logo.png" style="height: 25px;"/>
        </a>
        <a href="https://inkafarma.pe" target="_blank" class="simple-text logo-normal ml-0">
          INKAFARMA
        </a>
      </div>
      <ul class="nav">
        <li class="nav-item" v-bind:class="{'active': r_name == 'dashboard'}">
          <router-link class="nav-link" :to="{ 'name': 'dashboard', }">
            <i class="nc-icon nc-chart-pie-35"></i>
            <p>Dashboard</p>
          </router-link>
        </li>
        <!-- <li>
          <a class="nav-link" href="./user.html">
            <i class="nc-icon nc-circle-09"></i>
            <p>User Profile</p>
          </a>
        </li> -->
        <li v-bind:class="{'active': r_name == 'categories'}">
          <router-link class="nav-link" :to="{ 'name': 'categories' }">
            <i class="fa fa-th-large"></i>
            <p>Categorías</p>
          </router-link>
        </li>
        <li v-bind:class="{'active': r_name == 'paymentMethods'}">
          <router-link class="nav-link" :to="{ 'name': 'paymentMethods' }">
            <i class="fa fa-credit-card"></i>
            <p>Métodos de pago</p>
          </router-link>
        </li>
        <li v-bind:class="{'active': r_name == 'orders'}">
          <router-link class="nav-link" :to="{ 'name': 'orders'}" >
            <i class="nc-icon nc-atom"></i>
            <p>Pedidos</p>
          </router-link>
        </li>
        <li class="nav-item active active-pro">
          <a class="nav-link active" href="upgrade.html">
            <i class="nc-icon nc-alien-33"></i>
            <p>Upgrade to PRO</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.logo:before, .bootstrap-navbar .logo:before {
    content: "";
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 100%;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.3);
}

.sidebar a.logo-mini {
    float: left;
    width: 30px;
    text-align: center;
    margin-left: 15px;
    top: 8px;
    position: absolute;
}
</style>