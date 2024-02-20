<template>
  <div
    class="px-10 py-5 flex flex-col sm:flex-row sm:space-y-5 lg:space-y-4 md:space-y-5 border-b border-indigo-100"
  >
    <!-- image of the item -->
    <div class="relative space-y-3 sm:my-0">
      <img
        class="w-full rounded h-52 object-cover object-center"
        :src="url ? url : item.images[0].url"
      />
      <span
        class="absolute bottom-0 text-white sm:bottom-3 right-0 bg-pink-600 p-1 rounded"
      >
        {{ item.discount }} %OFF
      </span>
    </div>
    <!-- description of the card -->
    <div class="ml-5 space-y-4">
      <div class="leading-4 text-gray-400 py-2">
        <p class="font-semibold text-indigo-700 uppercase">{{ item.name }}</p>
        <p class="">{{ item.description }}</p>
      </div>

      <div class="">
        <p
          class="text-red-600 line-through font-semibold"
          v-if="item.discount > 0"
        >
          USD {{ item.price }}
        </p>
        <p class="text-gray-700 font-semibold">
          USD {{ item.price - (item.price * item.discount) / 100 }}
        </p>
      </div>
      <div>
        <div>
          <input
            class="w-24 rounded border-2 border-indigo-800 focus:outline-none text-center"
            type="number"
            placeholder="0"
            v-model="qty"
            @input="handleQty(item)"
          />
        </div>
      </div>
      <div class="flex items-center space-x-2 py-1 text-gray-700">
        <div v-for="(size, i) in item.sizes" :key="size" class="">
          <span
            @click="handleActiveSize(i, size)"
            :class="{ activeSize: activeIndexSize == i }"
            class="py-2 px-3 rounded-md shadow font-semibold uppercase hover:bg-indigo-800 hover:text-white"
            >{{ size }}</span
          >
        </div>
      </div>
      <div class="flex items-center space-x-2 py-1">
        <div v-for="(image, i) in item.images" :key="image">
          <span>
            <img
              @click="handleChangeImage(image.url, i, image)"
              class="w-8 cursor-move h-8 rounded-full p-1 border-2 hover:border-indigo-800"
              :src="image.url"
              :class="{ activeImg: avtiveImageIndex == i }"
            />
          </span>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="total > 0"
    class="h-12 bg-indigo-900 flex justify-end items-center px-2 mt-2 mx-auto font-bold text-white font-mono w-[100%]"
  >
    <p>Total:</p>
    <p>$ {{ total.toFixed(0) }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: ["item"],
  setup(props, { emit }) {
    const url = ref(null);
    const activeIndexSize = ref(null);
    const avtiveImageIndex = ref(null);
    const total = ref(0);
    const qty = ref(0);
    const size = ref(null);
    const image = ref(null);
    const handleChangeImage = (imageUrl, i, img, item) => {
      url.value = imageUrl;
      avtiveImageIndex.value = i;
      image.value = img;
      if (
        qty.value > 0 &&
        avtiveImageIndex.value != null &&
        activeIndexSize.value != null
      ) {
        handleTotal(item);
      }
    };
    const handleActiveSize = (i, siz, item) => {
      activeIndexSize.value = i;
      size.value = siz;
      if (
        qty.value > 0 &&
        avtiveImageIndex.value != null &&
        activeIndexSize.value != null
      ) {
        handleTotal(item);
      }
    };
    const handleTotal = (item) => {
      const prices = item.price - (item.price * item.discount) / 100;
      total.value = prices * qty.value;
      const orderItem = {
        name: item.name,
        description: item.description,
        discount: item.discount,
        price: item.price,
        qty: qty.value,
        image: image.value,
        size: size.value,
      };
      emit("onorderItem", orderItem);
    };

    const handleQty = (item) => {
      if (
        qty.value > 0 &&
        avtiveImageIndex.value != null &&
        activeIndexSize.value != null
      ) {
        handleTotal(item);
      }
    };
    return {
      handleChangeImage,
      url,
      handleActiveSize,
      activeIndexSize,
      avtiveImageIndex,
      qty,
      total,
      handleTotal,
      handleQty,
    };
  },
};
</script>

<style></style>
