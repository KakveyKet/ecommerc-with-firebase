<template>
  <div class="flex flex-col h-screen">
    <div><Navbar /></div>
    <div class="mb-auto">
      <CheckOut />
    </div>
    <div><Footer /></div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import CheckOut from "@/components/CheckOut.vue";
import ButtonPagination from "@/components/ButtonPagination.vue";
export default {
  components: {
    Footer,
    Navbar,
    CheckOut,
    ButtonPagination,
  },
  setup() {
    return {};
  },
};
</script>
