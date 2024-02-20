<template>
  <div
    v-if="products && products.length > 0"
    class="w-10/12 mx-auto sm:w-full relative grid cursor-pointer grid-cols-1 sm:gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
  >
    <div
      @click="handlePrev"
      :class="{ hideButton: end == products.length }"
      class="absolute top-14 -right-7 z-10"
    >
      <div
        class="w-12 h-12 flex items-center justify-center rounded-full shadow-sm text-indigo-800 bg-white -left-5 hover:bg-indigo-800 hover:text-white cursor-pointer duration-300"
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
      </div>
    </div>
    <div
      @click="handleNext"
      :class="{ hideButton: start == 0 }"
      class="absolute top-14 -left-7 z-10"
    >
      <div
        class="w-12 h-12 flex items-center justify-center rounded-full shadow-sm text-indigo-800 bg-white -right-5 hover:bg-indigo-800 hover:text-white cursor-pointer duration-300"
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
      </div>
    </div>
    <div
      v-for="product in products"
      :key="product.id"
      class="transform transition-all hover:translate-y-1 duration-300"
    >
      <div class="relative">
        <!-- img and discount -->
        <img
          class="w-full h-48 rounded object-cover object-center"
          :src="product.images[0].url"
        />
        <h3
          class="absolute bottom-0 right-0 rounded-md text-white bg-pink-600 bg-opacity-90 p-1"
        >
          {{ product.discount }} %OFF
        </h3>
      </div>
      <!-- dis -->
      <div class="">
        <div class="font-bold text-indigo-700 uppercase text-md">
          {{ product.name }}
        </div>
        <div class="leading-none text-gray-400">{{ product.discription }}</div>
        <div class="flex items-center justify-between mt-2">
          <div class="leading-4 py-3">
            <p
              class="text-red-600 line-through font-semibold"
              v-if="product.discount > 0"
            >
              USD {{ product.price }}
            </p>
            <p class="text-gray-700 font-semibold">
              USD {{ product.price - (product.price * product.discount) / 100 }}
            </p>
          </div>
          <div>
            <button
              @click="handleAddToCard(product)"
              class="w-9 h-9 rounded-full border-2 border-gray-200 flex justify-center items-center bg-indigo-50"
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
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getDocument from "@/composible/getDocument";
import useDocument from "../composible/useDocument";
import getUser from "@/composible/getUser";
import { timestamp } from "@/firebase/config";
import { ref, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
export default {
  props: ["name"],
  setup(props) {
    const { error, documents: products } = getDocument(
      "inventory",
      props.name,
      "products"
    );
    const { user } = getUser();
    const { addDoc, isPending } = useDocument(
      "carts",
      user.value?.uid,
      "items"
    );
    const start = ref(0);
    const end = ref(4);
    const windowWidth = ref(window.innerWidth);
    const onResize = () => {
      window.value = window.innerWidth;
    };
    onMounted(() => {
      window.addEventListener("resize", onResize);
    });
    watchEffect(() => {
      if (window.value < 640) {
        end.value = 0;
      } else if (window.value < 768) {
        end.value = 1;
      } else if (window.value < 1024) {
        end.value = 2;
      } else if (window.value < 1280) {
        end.value = 3;
      } else {
        end.value = 4;
      }
    });

    const handleNext = () => {
      if (window.value < 640) {
        end.value++;
        start.value++;
      } else if (window.value < 768) {
        end.value += 2;
        start.value += 2;
      } else if (window.value < 1024) {
        end.value += 3;
        start.value += 3;
      } else if (window.value < 1280) {
        end.value += 4;
        end.value += 4;
      } else {
        end.value += 5;
        start.value += 5;
      }
    };
    const handlePrev = () => {
      if (window.value < 640) {
        end.value--;
        start.value--;
      } else if (window.value < 768) {
        end.value -= 2;
        start.value -= 2;
      } else if (window.value < 1024) {
        end.value -= 3;
        start.value -= 3;
      } else if (window.value < 1280) {
        end.value -= 4;
        end.value -= 4;
      } else {
        end.value -= 5;
        start.value -= 5;
      }
    };

    const router = useRouter();
    const handleAddToCard = async (product) => {
      if (!user.value) {
        router.push({ name: "signin" });
      }

      const item = {
        name: product.name,
        price: product.price,
        discount: product.discount,
        description: product.description,
        sizes: product.sizes,
        images: product.images,
        createdAt: timestamp(),
      };

      await addDoc(item);
    };

    return {
      products,
      windowWidth,
      start,
      end,
      handlePrev,
      handleNext,
      handleAddToCard,
    };
  },
};
</script>
