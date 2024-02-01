<template>
  <div class="flex flex-col h-screen">
    <div><Navbar /></div>
    <div class="mb-auto">Home</div>
    <div><Footer /></div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Navbar,
    Footer,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
