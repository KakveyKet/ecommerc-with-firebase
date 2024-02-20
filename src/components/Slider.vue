<template>
  <vueper-slides progress>
    <vueper-slide v-for="(slide, i) in slides" :key="i" :image="slide.image" />
  </vueper-slides>
</template>

<script>
import { ref } from "vue";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
export default {
  components: {
    VueperSlides,
    VueperSlide,
  },
  setup() {
    const slides = ref([]);
    slides.value = [
      {
        image: require("../assets/images/facebook-logo.png"),
      },
      {
        image: require("../assets/images/tik-tok.png"),
      },
    ];
    return {
      slides,
    };
  },
};
</script>

<style>
.vueperslides .vueperslide {
  background-size: 30%, 80%;
}
.vueperslides__progress {
  background: rgba(0, 0, 0.25);
}
.vueperslides__arrow svg {
  color: #3730a7;
  stroke-width: 5;
  font-size: 15px;
}
@media only screen and (max-width: 768px) {
  .vueperslides__arrow svg {
    color: #3730a7;
    stroke-width: 2;
    font-size: 15px;
  }
}
</style>
