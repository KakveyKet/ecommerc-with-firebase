<template>
  <div>
    <div>
      <div v-if="textSearch" class="my-5 text-gray-700 font-semibold">
        {{ documents?.lenght }} result for {{ textSearch }}
        <span class="text-indigo-700 font-bold text-2xl"
          >{{ name }}
          product
        </span>
      </div>
    </div>
    <div
      class="fixed -top-30 lg:right-10 text-indigo-700 bg-indigo-50 rounded-full hover:bg-indigo-800 hover:text-white duration-300 p-1 cursor-pointer"
    >
      <svg
        @click="mountComponent('AddProduct')"
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
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </div>
    <div class="px-5 my-5 w-full">
      <div
        class="flex flex-col s sm:flex-row py-5 sm:space-x-5 h-auto border-b-2 border-gray-200 hover:translate-y-1 transform transition-all"
        v-for="(item, index) in documents"
        :key="item.id"
        v-show="index >= previous && index < next"
      >
        <div class="w-96 h-48 relative">
          <img
            class="w-full h-full rounded object-cover object-center border-2 border-indigo-100"
            :src="item.images[0].url"
          />
          <h3
            class="absolute bottom-0 right-0 bg-pink-600 bg-opacity-90 p-1 rounded-md text-white font-mono"
          >
            {{ item.discount }} % OFF
          </h3>
        </div>

        <div
          class="mt-2 sm:mt-0 flex flex-col sm:justify-between lg:flex-row lg:w-full"
        >
          <div class="flex flex-col space-y-2 sm:space-y-4">
            <div class="leading-4 sm:space-y-1">
              <p class="text-gray-700 font-semibold">
                {{ item.name }}
              </p>
              <p class="text-gray-400"></p>
              {{ item.description }}
            </div>
            <div class="text-gray-700 font-medium">
              InStock {{ item.instock }}
            </div>
            <div class="flex flex-row space-x-2">
              <p v-for="size in item.sizes" :key="size">
                <span class="text-gray-700 font-medium">
                  {{ size }}
                </span>
              </p>
            </div>
            <div class="flex space-x-2">
              <button
                @click="handleConveyData(item)"
                class="text-indigo-700 hover:text-indigo-900 duration-300"
              >
                Edit
              </button>
              <button
                @click="handlePopupdeleteProduct(item)"
                class="text-indigo-700 hover:text-indigo-900 duration-300"
              >
                Renove
              </button>
            </div>
          </div>
          <div
            class="flex justify-between items-center lg:w-full w-96 lg:items-end"
          >
            <div class="space-x-3">
              <span
                v-if="item.discount"
                class="text-red-600 line-through font-semibold"
                >USD{{ item.price }}</span
              >
              <span class="text-gray-700 font-semibold">
                USD{{ item.price - (item.price * item.discount) / 100 }}
              </span>
            </div>

            <div>
              <button
                @click="handleAddToCard(item)"
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
    <div>
      <div class="w-full flex justify-center">
        <ButtonPagination
          :products="documents"
          @onPagination="handleListentoPagination"
        />
      </div>
      <component
        :is="currrentComponent"
        :name="name"
        @close="unmountComponent"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import AddProduct from "./AddProduct.vue";
import getDocument from "@/composible/getDocument";
import DeleteConfirmation from "@/views/DeleteConfirmation.vue";
import DeleteProductConfirmation from "@/views/DeleteProductConfirmation.vue";
import ButtonPagination from "./ButtonPagination.vue";
import getUser from "@/composible/getUser";
import useDocument from "@/composible/useDocument";
import { timestamp } from "@/firebase/config";
export default {
  components: {
    AddProduct,
    DeleteConfirmation,
    DeleteProductConfirmation,
    ButtonPagination,
  },
  props: ["name", "product", "textSearch"],
  setup(props) {
    const currrentComponent = ref("");
    const mountComponent = (component) => {
      currrentComponent.value = component;
    };

    const { error, documents } = getDocument(
      "inventory",
      props.name,
      "products"
    );
    const { user } = getUser();
    const unmountComponent = () => {
      currrentComponent.value = "";
      product.value = null;
    };
    const product = ref(null);
    const handleConveyData = (item) => {
      currrentComponent.value = "AddProduct";
      product.value = item;
      console.log(product.value);
    };
    const handlePopupdeleteProduct = (item) => {
      mountComponent("DeleteProductConfirmation");
      product.value = item;
    };
    const { addDoc } = useDocument("carts", props.name, "items");
    const previous = ref(0);
    const next = ref(5);
    const handleListentoPagination = (pre, ntx) => {
      previous.value = pre;
      next.value = ntx;
    };
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
      currrentComponent,
      mountComponent,
      unmountComponent,
      documents,
      error,
      handleConveyData,
      product,
      handlePopupdeleteProduct,
      handleListentoPagination,
      previous,
      next,
      handleAddToCard,
    };
  },
};
</script>
