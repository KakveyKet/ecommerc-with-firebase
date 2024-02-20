<template>
  <div
    class="bg-indigo-800 text-white text-sm md:text-base flex justify-center items-center space-x-4 my-1 shadow"
  >
    <div class="relative group py-2">
      <div class="flex">
        <span
          ><svg
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
              d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
            />
          </svg>
        </span>
        <span> {{ $t("Categoris") }}</span>

        <span class="group-hover:hidden">
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
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            /></svg></span
        ><span class="hidden group-hover:inline"
          ><svg
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
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </span>
      </div>
      <!-- dropdown -->

      <div
        class="absolute hidden group-hover:block bg-white w-96 top-10 h-96 shadow hover:shadow-sm z-50"
      >
        <router-link
          v-for="category in categories"
          :key="category"
          :to="{ name: 'categorydetails', params: { id: category.name } }"
        >
          <p
            class="text-gray-400 hover:text-indigo-700 duration-300 border-b-2 border-indigo-100 px-5 py-3"
          >
            {{ category.name }}
          </p></router-link
        >

        <router-link :to="{ name: 'category' }">
          <p
            class="text-gray-400 hover:text-indigo-700 duration-300 border-b-2 border-indigo-100 px-5 py-3"
          >
            All Category
          </p>
        </router-link>
      </div>
    </div>
    <div class="relative group py-2">
      <span>{{ $t("Add Category") }}</span>
      <!-- add catagory -->

      <div
        class="absolute hidden -left-12 group-hover:block bg-white w-96 top-10 shadow-xl hover:shadow-sm h-auto focus:block"
      >
        <form @submit.prevent="handleAddCategory" class="px-5 py-4 space-y-4">
          <input
            type="text"
            v-model="categoryName"
            placeholder="Add Category"
            class="p-2 w-full focus:ouline-none focus:ring-offset-2 focus:ring-indigo-700 shadow text-slate-600"
          />
          <input
            @change="handleChanges"
            type="file"
            class="p-2 w-full focus:ouline-none focus:ring-offset-2 focus:ring-indigo-700 shadow"
          />
          <span v-if="fileError" class="text-red-600 text-sm font-thin">{{
            fileError
          }}</span>
          <button
            v-if="true"
            class="bg-white w-full shadow-md rounded-md py-2 text-indigo-900 hover:bg-indigo-700 hover:text-white"
          >
            Add
          </button>
          <button
            v-else
            class="bg-white relative w-full shadow-md rounded-md py-2 text-indigo-900"
          >
            <div>Saving...</div>
            <div class="absolute top-3 right-2">
              <div
                class="animate-spin h-4 w-4 rounded-full border-b-2 border-r-2 border-indigo-700"
              ></div>
            </div>
          </button>
        </form>
      </div>
    </div>
    <div class="relative group py-2">
      <span>{{ $t("Promote Admins") }}</span>
      <!-- promote admin -->

      <div
        class="absolute hidden text-black -right-20 z-40 group-hover:block bg-white w-96 top-10 shadow-xl hover:shadow-sm h-auto"
      >
        <form @submit.prevent="handleAddAdmin" class="px-5 py-4 space-y-4">
          <input
            v-model="email"
            required
            type="email"
            placeholder="Email"
            class="p-2 w-full focus:ouline-none focus:ring-offset-2 focus:ring-indigo-700 shadow"
          />
          <button
            v-if="true"
            class="bg-white w-full shadow-md rounded-md py-2 text-indigo-900 hover:bg-indigo-700 hover:text-white"
          >
            Promote
          </button>
          <button
            v-else
            class="bg-white relative w-full shadow-md rounded-md py-2 text-indigo-900"
          >
            <div>Saving...</div>
            <div class="absolute top-3 right-2">
              <div
                class="animate-spin h-4 w-4 rounded-full border-b-2 border-r-2 border-indigo-700"
              ></div>
            </div>
          </button>
        </form>
      </div>
    </div>
    <router-link to="/report">{{ $t("Reports") }}</router-link>
  </div>
</template>

<script>
import { ref } from "vue";
import useCollection from "@/composible/useCollection";
import useStorage from "@/composible/useStorage";
import getCollections from "@/composible/getCollection";
import { timestamp } from "@/firebase/config";
import { functions } from "../firebase/config";
import getUser from "@/composible/getUser";
export default {
  setup() {
    const files = ref(null);
    const fileError = ref(null);
    const { documents: categories } = getCollections("inventory");
    const { user } = getUser();
    const type = ref[("image/png", "image/jpeg", "image/jpg", "image/svg")];
    const handleChanges = (e) => {
      const selected = e.target.files[0];
      const limitedSize = 1024 * 1024; // 1MB

      if (selected.size > limitedSize) {
        fileError.value = "Size of the image is too large. It must be <= 1MB";
      } else {
        const allowedTypes = ["jpg", "png", "svg", "jpeg"];

        if (selected && allowedTypes.includes(selected.type.split("/")[1])) {
          files.value = selected;
          fileError.value = null;
        } else {
          fileError.value =
            "Only files of type jpg, png, svg, jpeg are allowed";
          files.value = null;
        }
      }
      console.log(e.target.files);
    };

    const { addDocument, isPending } = useCollection("inventory");
    const { uploadImage, url } = useStorage();
    const categoryName = ref("");
    const handleAddCategory = async () => {
      if (files.value) {
        await uploadImage(files.value);
        addDocument({
          name: categoryName.value,
          url: url.value,
          createdAt: timestamp(),
        });
      }
    };
    const email = ref("");
    const handleAddAdmin = async () => {
      const addAdmin = functions.httpsCollable("addAdminRole");
      const result = await addAdmin({ email: email.value });
      console.log("====================================");
      console.log(result);
      console.log("====================================");
    };
    return {
      categories,
      handleChanges,
      fileError,
      handleAddCategory,
      categoryName,
      handleAddAdmin,
      email,
      user,
    };
  },
};
</script>
