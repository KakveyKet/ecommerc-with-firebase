<template>
  <div
    class="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 h-full w-full flex justify-center items-center px-5"
  >
    <div class="bg-white shadow p-3 rounded-md w-full">
      <!-- header  -->

      <div class="flex justify-between items-center p-2">
        <p>{{ name }}</p>
        <span class="text-gray-700 font-bold font-mono">New Product </span
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-gray-500 hover:text-gray-700 duration-300 cursor-pointer"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </div>
      <!-- body -->
      <div class="w-full h-full mt-2">
        <form @submit.prevent="addProduct" class="py-5 flex flex-col space-y-5">
          <input
            v-model="productName"
            type="text"
            class="p-2 shadow w-full focus:outline-none focus:ring rounded text-gray-700 focus:ring-offset-2 ring-indigo-700"
            placeholder="Product name"
          />

          <input
            type="text"
            v-model="descripion"
            class="p-2 shadow w-full focus:outline-none focus:ring rounded text-gray-700 focus:ring-offset-2 ring-indigo-700"
            placeholder="Description"
          />
          <input
            type="number"
            step=".01"
            v-model="price"
            class="p-2 shadow w-full focus:outline-none focus:ring rounded text-gray-700 focus:ring-offset-2 ring-indigo-700"
            placeholder="Price"
          />
          <input
            type="number"
            v-model="discount"
            class="p-2 shadow w-full focus:outline-none focus:ring rounded text-gray-700 focus:ring-offset-2 ring-indigo-700"
            placeholder="Discount"
          />
          <input
            type="text"
            v-model="size"
            @keypress.space="handleIsertSize"
            class="p-2 shadow w-full focus:outline-none focus:ring rounded text-gray-700 focus:ring-offset-2 ring-indigo-700"
            placeholder="Size"
          />
          <label class="text-indigo-600 text-sm">
            hit (space) to insert size into Sizes [
            <span v-for="(size, index) in sizes" :key="index">
              <span class="text-gray-700 inline-block relative group">
                {{ size }}
                <span
                  @click="handleRemoveSize(index)"
                  class="absolute -top-2 -left-2 text-red-600 hidden group-hover:block cursor-pointer"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-3 h-3"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </span>
            </span>
            ]
          </label>
          <input
            type="file"
            @change="handleChanges"
            class="p-2 shadow w-full focus:outline-none focus:ring rounded text-gray-700 focus:ring-offset-2 ring-indigo-700"
          />
          <label class="text-indigo-600 text-sm">
            Images [
            <span
              class="text-gray-700 inline-block relative group"
              v-for="(image, index) in images"
              :key="image"
            >
              {{ image.name }}
              <span>
                <span
                  @click="handleRomoveImage(index)"
                  class="absolute -top-5 -left-2 text-red-600 hidden group-hover:block cursor-pointer"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </span>
            </span>
            ]
          </label>
          <button
            v-if="true"
            class="p-2 w-full shadow rounded text-indigo-700 hover:bg-indigo-700 hover:text-white"
          >
            Add
          </button>
          <button
            v-else
            class="p-2 w-full shadow rounded text-indigo-700 relative"
          >
            <div>Adding....</div>
            <div class="absolute top-3 right-4">
              <div
                class="animate-spin h-4 w-4 rounded-full border-b-2 border-r-2 border-indigo-700"
              ></div>
            </div>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import useDocument from "@/composible/useDocument";
import useStorage from "@/composible/useStorage";
export default {
  props: ["name"],
  setup(props) {
    const productName = ref("");
    const descripion = ref("");
    const price = ref("");
    const discount = ref("");
    const size = ref("");
    const sizes = ref([]);
    const images = ref([]);
    const files = ref([]);
    const { uploadImage, deleteImage, url } = useStorage();
    const { addDoc, updateDoc, error, isPending, deleteDoc } = useDocument(
      "inventory",
      props.name,
      "products"
    );
    const fileError = ref(null);
    const type = ref[("image/png", "image/jpeg", "image/jpg", "image/svg")];
    const handleChanges = (e) => {
      const selected = e.target.files[0];
      const limitedSize = 1024 * 1024; // 1MB

      if (selected.size > limitedSize) {
        fileError.value = "Size of the image is too large. It must be <= 1MB";
      } else {
        const allowedTypes = ["jpg", "png", "svg", "jpeg"];

        if (selected && allowedTypes.includes(selected.type.split("/")[1])) {
          files.value.unshift(selected);
          images.value.unshift({
            name: selected.name,
          });
          fileError.value = [];
        } else {
          fileError.value =
            "Only files of type jpg, png, svg, jpeg are allowed";
          files.value = [];
        }
      }
      console.log(e.target.files);
    };
    const handleRomoveImage = (index) => {
      images.value.splice(index, 1);
      files.value.splice(index, 1);
    };
    const handleIsertSize = () => {
      sizes.value.push(size.value);
      size.value = "";
    };
    const handleRemoveSize = (index) => {
      sizes.value.splice(index, 1);
    };
    const addProduct = async () => {
      if (images.value.length > 0 && sizes.value.length > 0) {
        for (let i in files.value) {
          await uploadImage(files.value[i]);
          images.value[i].url = url.value; // Corrected to access the url from useStorage
        }

        const newProduct = {
          name: productName.value,
          description: descripion.value,
          price: Number(price.value).toFixed(2),
          discount: discount.value,
          size: sizes.value,
          images: images.value,
        };

        await addDoc(newProduct);
      }
    };

    return {
      productName,
      descripion,
      price,
      discount,
      images,
      files,
      fileError,
      size,
      sizes,
      handleChanges,
      handleRomoveImage,
      handleIsertSize,
      handleRemoveSize,
      addProduct,
    };
  },
};
</script>
