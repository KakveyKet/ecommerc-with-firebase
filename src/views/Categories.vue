<template>
  <div class="flex flex-col">
    <div>
      <div>
        <Navbar />
      </div>
    </div>
    <div class="mb-auto w-11/12 sm:w-full mx-auto">
      <component
        :is="currentComponent"
        @close="currentComponent = ''"
        :categoriesID="categoriesID"
      />
      <h1 class="text-md text-blue-700 ml-5 mt-2">Categories</h1>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-5 m-5"
      >
        <div
          class="bg-white h-60 shadow-sm rounded-md relative hover:translate-y-1 transform duration-300"
          v-for="catagory in documents"
          :key="catagory.id"
        >
          <router-link
            :to="{ name: 'categorydetails', params: { id: catagory.id } }"
          >
            <img
              class="w-full h-full object-cover object-center rounded-md"
              :src="catagory.url"
          /></router-link>

          <h4
            class="bg-indigo-700 rounded-md absolute top-1 text-white text-center left-1 w-24 font-serif p-1"
          >
            {{ catagory.name }}
          </h4>
          <button
            @click="handleRemoveCatgory(catagory.id)"
            class="absolute bottom-0 right-0 text-pink-600 hover:text-pink-800 font-serif font-black"
          >
            Remove
          </button>
        </div>
      </div>
    </div>

    <div>
      <div>
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import getCollections from "@/composible/getCollection";
import DeleteConfirmation from "./DeleteConfirmation.vue";
import { ref } from "vue";

export default {
  components: {
    Navbar,
    Footer,
    DeleteConfirmation,
  },
  setup() {
    const { error, isPending, documents } = getCollections("inventory");
    const currentComponent = ref("");
    const categoriesID = ref(null);
    const handleRemoveCatgory = (cate) => {
      currentComponent.value = "DeleteConfirmation";
      categoriesID.value = cate;
    };
    return {
      documents,
      currentComponent,
      handleRemoveCatgory,
      categoriesID,
    };
  },
};
</script>
