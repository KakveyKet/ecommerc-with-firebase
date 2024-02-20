<template>
  <div class="inset-0 fixed z-50 bg-gray-900 bg-opacity-50 p-3 w-full h-screen">
    <div class="">
      <input
        @keypress.enter="handleSearch"
        type="search"
        class="focus:outline-none p-3 w-full shadow text-sm text-gray-900"
        v-model="textSearch"
        autofocus
        placeholder="searching"
      />
      <svg
        @click="handleClose"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-6 text-gray-800 fixed top-5 right-5 h-6"
      >
        <path
          fill-rule="evenodd"
          d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import getCollections from "@/composible/getCollection";
import { ref } from "vue";
export default {
  setup(props, { emit }) {
    const handleClose = () => {
      emit("close");
    };
    const textSearch = ref("");
    const { documents: categories } = getCollections("inventory");
    const router = useRouter();
    const handleSearch = () => {
      if (!textSearch.value) {
        handleClose();
      } else {
        let categoryName;
        categories.value.forEach((category) => {
          if (category.name.toLowerCase().includes(textSearch.value)) {
            categoryName = category.name;
          }
        });

        if (categoryName) {
          router.push({
            name: "categorydetails",
            params: { id: categoryName, textSearch: textSearch.value },
          });
        } else {
          console.error("categoryName is missing or empty");
        }
        handleClose();
      }
    };
    return { handleClose, textSearch, handleSearch };
  },
};
</script>

<style lang="scss" scoped></style>
