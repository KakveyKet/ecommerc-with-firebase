<template>
  <div class="flex flex-col h-screen">
    <div><Navbar /></div>
    <SwitchingLang />
    <div class="mb-auto">
      <Slider />
      <div
        v-for="category in documents"
        :key="category.id"
        class="p-2 my-4 overflow-hidden"
      >
        <Card :name="category.name" />
      </div>
    </div>
    <div><Footer /></div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Slider from "@/components/Slider.vue";
import getCollections from "@/composible/getCollection";
// import SwitchingLang from "@/components/SwitchingLang.vue";
import Card from "@/components/Card.vue";
export default {
  components: {
    Navbar,
    Footer,
    Slider,
    Card,
  },
  setup() {
    const { documents } = getCollections("inventory");
    return { documents };
  },
};
</script>

<style lang="scss" scoped></style>
