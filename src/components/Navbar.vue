<template>
  <div class="p-5 bg-white flex items-center justify-between shadow space-x-5">
    <router-link to="/">
      <img
        class="w-12 cursor-pointer object-cover"
        src="../assets/logoEcommerce.png"
      />
    </router-link>
    <div class="flex w-full justify-end items-center space-x-5 text-indigo-700">
      <div class="cursor-pointer hover:text-indigo-900 duration-300">
        Category
      </div>
      <div v-if="windowWidth < 640">
        <svg
          @click="handlePopUpSearch"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6 cursor-pointer hover:text-indigo-900 duration-300"
        >
          <path
            fill-rule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div class="relative w-full" v-else>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-5 h-5 top-2 left-2 absolute cursor-pointer hover:text-indigo-900 duration-300"
        >
          <path
            fill-rule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
            clip-rule="evenodd"
          />
        </svg>
        <input
          type="text"
          placeholder="Searching..."
          v-model="textSearch"
          @keypress.enter="handleSearch"
          class="focus:outline-none p-1 pl-10 w-full ring ring-offset-2 ring-indigo-700 rounded-full"
        />
      </div>

      <!-- checkout order -->
      <router-link :to="{ name: 'checkoutorder' }" class="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6"
        >
          <path
            d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z"
          />
          <path
            fill-rule="evenodd"
            d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z"
            clip-rule="evenodd"
          />
        </svg>

        <span
          v-if="orders?.length > 0"
          class="absolute w-4 h-4 text-xs text-white flex items-center justify-center -top-2 -right-1 bg-pink-600 rounded-full"
          >{{ orders?.length }}
        </span>
        <div v-else>0</div>
      </router-link>
      <div v-if="!user">
        <router-link :to="{ name: 'signin' }">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 cursor-pointer hover:text-indigo-900 duration-300"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
            /></svg
        ></router-link>
      </div>
      <div class="flex items-center space-x-2" v-else>
        <div>
          <svg
            @click="handlePopUpLang"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 hover:text-indigo-900 cursor-pointer duration-300"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>
        </div>
        <router-link to="/cart-details" class="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 hover:text-indigo-900 cursor-pointer duration-300"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          <span
            v-if="items.length > 0"
            class="absolute w-4 h-4 text-xs text-white flex items-center justify-center -top-2 -right-1 bg-pink-600 rounded-full"
            >{{ items.length }}
          </span>
          <div v-else>0</div>
        </router-link>
        <div>
          <div
            class="relative group w-7 h-7 text-white text-sm bg-indigo-700 hover:bg-indigo-900 duration-300 rounded-full flex justify-center items-center"
          >
            <span class="uppercase font-semibold">
              {{ user?.displayName[0] }}
            </span>
            <div
              class="absolute w-16 group h-10 bg-transparent top-6 -right-500"
            ></div>
            <!-- dropdown -->
            <div
              class="hidden group-hover:block absolute top-14 bg-white -right-5 shadow w-96 h-96"
            >
              <div class="p-5 border-b-2 border-gray-200 flex space-x-2">
                <div
                  class="bg-indigo-700 text-white uppercase w-8 h-8 rounded-full flex justify-center items-center"
                >
                  {{ user?.displayName[0] }}
                </div>
                <div class="text-gray-700 leading-none">
                  <p class="uppercase">{{ user?.displayName }}</p>
                  <span class="text-gray-200 text-sm">{{ user?.email }}</span>
                </div>
              </div>
              <div class="py-5 px-7 space-y-3 border-b-2 border-gray-200">
                <p
                  class="text-gray-700 text-md hover:text-indigo-700 duration-300 cursor-pointer"
                >
                  Account Setting
                </p>
                <p
                  class="text-gray-700 text-md hover:text-indigo-700 duration-300 cursor-pointer"
                >
                  Order History
                </p>
                <p
                  class="text-gray-700 text-md hover:text-indigo-700 duration-300 cursor-pointer"
                >
                  Purchased history
                </p>
              </div>
              <div
                @click="handleSignOut"
                class="text-gray-700 py-5 px-7 hover:text-indigo-700 cursor-pointer font-black"
              >
                Sign Out
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <component :is="currentComponet" @close="currentComponet = ''" />
  <SubNavBar />
</template>

<script>
import { ref, onMounted } from "vue";
import getUser from "../composible/getUser";
import { projectAuth } from "@/firebase/config";
import { useRouter } from "vue-router";
import getDocument from "@/composible/getDocument";
import getCollections from "@/composible/getCollection";
import SubNavBar from "./SubNavBar.vue";
import PopupSearch from "./PopupSearch.vue";
import SwitchingLang from "./SwitchingLang.vue";
export default {
  components: {
    SubNavBar,
    PopupSearch,
    SwitchingLang,
  },
  props: ["textSearch"],
  setup() {
    const { user } = getUser();
    const { error, documents: items } = getDocument(
      "carts",
      user.value?.uid,
      "items"
    );
    const currentComponet = ref("");
    const windowWidth = ref(window.innerWidth);
    const router = useRouter();
    const { documents: categories } = getCollections("inventory");
    const { documents: orders } = getCollections("orders");

    const handleSignOut = async () => {
      await projectAuth.signOut();
      router.push({ name: "signin" });
    };
    const onResize = () => {
      windowWidth.value = window.innerWidth;
    };
    onMounted(() => {
      window.addEventListener("resize", onResize);
    });
    const textSearch = ref("");
    const handleSearch = () => {
      if (!textSearch.value) {
        router.push({ name: "home" });
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
      }
    };

    const handlePopUpSearch = () => {
      currentComponet.value = "PopupSearch";
    };
    const handlePopUpLang = () => {
      currentComponet.value = "SwitchingLang";
    };
    return {
      windowWidth,
      user,
      handleSignOut,
      items,
      handleSearch,
      textSearch,
      currentComponet,
      handlePopUpSearch,
      orders,
      handlePopUpLang,
    };
  },
};
</script>
