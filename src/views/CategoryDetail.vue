<template>
  <div class="flex flex-col h-screen">
    <div><Navbar /></div>
    <div class="mb-auto">
      <div v-if="id != null" class="mx-5 my-10 h-auto">
        <component :is="currentComponent" :name="id" :textSearch="textSearch" />
      </div>
      <div v-else>
        <div class="text-gray-700 font-semibold text-xl">
          Sorry couldn't find text {{ textSearch }}
        </div>
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
  props: ["id", "textSearch"],
  components: {
    Navbar,
    Footer,
    ListProduct,
  },
  setup(props) {
    const currentComponent = ref("ListProduct");
    return { currentComponent, id: props.id, textSearch: props.textSearch };
  },
};
</script>
