<template>
  <div class="fixed w-full h-screen inset-0 bg-slate-900 bg-opacity-50 z-20">
    <div
      class="flex justify-center px-5 h-3/4 items-center sm:w-10/12 md:w-8/12 lg:w-7/12 2xl:w-5/12 mx-auto"
    >
      <div class="bg-white shadow rounded-md w-full h-auto p-5">
        <div class="flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-20 h-20 text-red-600"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </div>
        <div class="flex items-center font-bold text-gray-500 w-3/4 mx-auto">
          <p>
            Are you seriously want to remove this
            <span class="text-indiogo-700 font-black">{{ product.name }} </span>
            collection ? Once you remove you won't be able to remove
          </p>
        </div>
        <div class="w-3/4 mx-auto mt-5 mb-3">
          <div class="flex justify-center">
            <button
              v-if="!isPending"
              @click="handleRemoveProduct"
              class="py-2 px-12 bg-red-600 hover:bg-red-700 duration-300 rounded-md text-white tracking-wide"
            >
              Remove
            </button>
            <button
              v-else
              class="relative py-2 px-12 bg-red-600 hover:bg-red-700 duration-300 rounded-md text-white tracking-wide"
            >
              <div>Removing...</div>
              <div class="absolute top-3 right-4">
                <div
                  class="animate-spin h-4 w-4 rounded-full border-b-2 border-r-2 border-white"
                ></div>
              </div>
            </button>
          </div>
        </div>
        <di class="flex justify-center">
          <div
            @click="handleCancel"
            class="text-gray-700 font-semibold tracking-wide hover:text-gray-900 cursor-pointer"
          >
            Cancel
          </div>
        </di>
      </div>
    </div>
  </div>
</template>
<script>
import getDocument from "@/composible/getDocument";
import useDocument from "@/composible/useDocument";
import useStorage from "@/composible/useStorage";
export default {
  props: ["name", "product"],
  setup(props, { emit }) {
    const { addDoc, updateDocs, deleteDocs, error, isPending } = useDocument(
      "inventory",
      props.name,
      "products"
    );
    const { deleteImage, filePath, url } = useStorage();
    const { documents: products } = getDocument(
      "inventory",
      props.name,
      "products"
    );
    const handleCancel = () => {
      emit("close");
    };
    const handleRemoveProduct = async () => {
      isPending.value = true;
      const images = props.product.images;
      const id = props.product.id;

      if (images.length > 0) {
        for (let image of images) {
          await deleteImage(image.url);
        }
      }

      products.value?.forEach(async (product) => {
        if (product.id == id) {
          await deleteDocs(id);
        }
      });

      await deleteDocs(id);

      isPending.value = false;
      emit("close");
    };

    return {
      handleCancel,
      isPending,
      handleRemoveProduct,
    };
  },
};
</script>
