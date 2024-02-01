<template>
  <div class="flex flex-col h-screen">
    <div><Navbar /></div>
    <div class="mb-auto">
      <div class="mx-5 my-10 h-auto">
        <component :is="currentComponent" :name="id" />
      </div>
    </div>
    <div><Footer /></div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import ListProduct from "@/components/ListProduct.vue";
import { ref } from "vue";
export default {
  props: ["id"],
  components: {
    Navbar,
    Footer,
    ListProduct,
  },
  setup() {
    const currentComponent = ref("ListProduct");
    return { currentComponent };
  },
};
</script>
