<script setup lang="ts">
import Sidebar from "./components/shared/Sidebar.vue";
import Footer from "./components/shared/Footer.vue";
import Navbar from "./components/shared/Navbar.vue";
</script>

<template>
  <Sidebar />
  <div class="main-panel">
    <Navbar />
    <div class="content">
      <div class="container-fluid">
        <main class="main-content  mt-0">
          <router-view></router-view>
        </main>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style>
</style>
