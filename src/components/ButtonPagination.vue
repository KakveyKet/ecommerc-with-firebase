<template>
  <div class="flex items-center gap-4 mx-auto">
    <button
      @click="handlePrevious"
      :class="{ frozen: previous <= 0 }"
      :disabled="previous <= 0"
      class="w-8 h-8 focus:outline-none rounded-full border-2 border-indigo-700 flex items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
    </button>
    <div class="flex items-center space-x-2">
      <ul
        class=""
        v-for="i in Math.ceil(products.length / 5)"
        :key="i"
        v-show="i >= start && i <= end"
      >
        <li :class="{ 'border-b border-indigo-800': i === activeIndex }">
          {{ i }}
        </li>
      </ul>
    </div>

    <button
      @click="handleNext(products.length)"
      :disabled="next >= products.length"
      :class="{ frozen: next >= products.length }"
      class="w-8 h-8 focus:outline-none rounded-full border-2 border-indigo-700 flex items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m8.25 4.5 7.5 7.5-7.5 7.5"
        />
      </svg>
    </button>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: ["products"],
  setup(props, { emit }) {
    const start = ref(1);
    const end = ref(5);
    const previous = ref(0);
    const next = ref(5);
    const activeIndex = ref(1);
    emit("onPagination", previous.value, next.value);
    const handleNext = (limitedIncrement) => {
      limitedIncrement = Math.ceil(limitedIncrement / 5);
      if (end.value < limitedIncrement) {
        start.value++;
        end.value++;
      }
      previous.value += 5;
      next.value += 5;
      activeIndex.value++;
      emit("onPagination", previous.value, next.value);
    };
    const handlePrevious = () => {
      if (end.value > 5) {
        start.value--;
        end.value--;
      }
      previous.value -= 5;
      next.value -= 5;
      activeIndex.value--;
      emit("onPagination", previous.value, next.value);
    };
    return {
      start,
      end,
      next,
      activeIndex,
      handleNext,
      handlePrevious,
      previous,
    };
  },
};
</script>

<style lang="scss" scoped></style>
