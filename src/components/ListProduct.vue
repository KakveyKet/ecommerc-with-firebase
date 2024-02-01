<template>
  <div>
    <h1>List Product</h1>
    <div class="fixed -top-30 right-10 text-indigo-700 cursor-pointer">
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
        class="flex flex-col py-5 h-auto border-b-2 border-gray-200 hover:translate-y-1 transform transition-all"
        v-for="item in product"
        :key="item.id"
      >
        <div class="w-96 h-48 relative">
          <img
            class="w-full h-full rounded object-cover object-center border-2 border-indigo-100"
            src="../assets/images/tik-tok.png"
          />
          <h3
            class="absolute bottom-0 right-0 bg-pink-600 bg-opacity-90 p-1 rounded-md text-white font-mono"
          >
            5% off
          </h3>
        </div>
        <div class="mt-2">
          <div class="flex flex-col space-y-2">
            <div class="leading-4">
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
                class="text-indigo-700 hover:text-indigo-900 duration-300"
              >
                Edit
              </button>
              <button
                class="text-indigo-700 hover:text-indigo-900 duration-300"
              >
                Renove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <component :is="currrentComponent" :name="name" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import AddProduct from "./AddProduct.vue";
export default {
  components: {
    AddProduct,
  },
  props: ["name"],
  setup() {
    const currrentComponent = ref("");
    const mountComponent = (component) => {
      currrentComponent.value = component;
    };
    const product = ref([
      {
        id: "001",
        name: "Item 3",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente omnis suscipit facilis",
        sizes: [32, 33, 34, 35],
        instock: true,
      },
      {
        id: "002",
        name: "Item 3",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente omnis suscipit facilis",
        sizes: [32, 33, 34, 35],
        instock: true,
      },
      {
        id: "003",
        name: "Item 3",
        descripion:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente omnis suscipit facilis",
        sizes: [32, 33, 34, 35],
        instock: true,
      },
    ]);
    return { product, currrentComponent, mountComponent };
  },
};
</script>
