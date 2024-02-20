<template>
  <div class="flex flex-col h-screen">
    <div>
      <Navbar />
    </div>
    <div v-if="items?.length > 0" class="mb-auto">
      <div class="border-b-2 border-gray-200">
        <div class="px-10 py-5 w-full sm:w-8/12 lg:w-5/12 xl:w-4/12 ml-auto">
          <div v-if="pieses > 0" class="flex justify-between my-5">
            <p class="text-gray-400 underline">{{ pieses }} pieses</p>
            <p>{{ total.toFixed(2) }}</p>
          </div>
          <div class="my-2" v-if="pieses > 0">
            <div v-if="pieses >= 3" class="flex justify-between">
              <p class="text-gray-400">Free Shipping</p>
              <p class="text-gray-700">$ 0.00</p>
            </div>
            <div class="flex justify-between" v-else>
              <p class="text-grey-400">Shipping</p>
              <p class="text-gray-700">$ {{ shipping }}</p>
            </div>
          </div>
          <hr />
          <div v-if="pieses > 0" class="justify-between flex my-5">
            <div class="text-grey-700 font-semibold">Order anoumt</div>
            <div
              v-if="pieses && pieses >= 3"
              class="text-gray-700 font-semibold"
            >
              $ {{ total.toFixed(2) }}
            </div>
            <div class="text-gray-700 font-semibold" v-else>
              $ {{ total.toFixed(2) + shipping }}
            </div>
          </div>

          <div>
            <button
              @click.prevent="handleOrder"
              class="focus:outline-none py-2 w-full shadow-sm rounded text-indigo-700 bg-white hover:bg-indigo-700 hover:text-white font-semibold duration-300"
            >
              Order
            </button>
          </div>
        </div>
      </div>
      <div v-for="item in items" :key="item.id">
        <CardCompnent :item="item" @onorderItem="handleListenToOrder" />
      </div>
    </div>
    <div
      v-else
      class="w-11/12 mb-auto h-auto border-2 border-indigo-100 py-10 p-5 mx-auto"
    >
      <div class="flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-24 text-indigo-700 h-24 p-5"
        >
          <path
            d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
          />
        </svg>
      </div>
      <div class="flex justify-center text-grey-700 font-semibold my-5">
        Your Cart is empty keep shopping you favorite item
      </div>
      <router-link
        to="/"
        class="bg-indig-700 text-white mt-20 p-3 flex justify-center w-2/4 mx-auto rounded hover:bg-indigo-900 duration-300"
        >Keep Shopping</router-link
      >
    </div>
    <div class="mt-5">
      <Footer />
    </div>
    <component
      :is="currentComponent"
      :orders="orders"
      :userInfo="userInfo"
      @close="currentComponent = ''"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import CardCompnent from "../components/CardComponent.vue";
import getUser from "@/composible/getUser";
import getDocument from "@/composible/getDocument";
import PrintInvoice from "@/components/PrintInvoice.vue";
import getUserDoc from "../composible/getUserDoc";
export default {
  components: {
    Navbar,
    Footer,
    CardCompnent,
    PrintInvoice,
  },
  setup() {
    const { user } = getUser();
    const { error, documents: items } = getDocument(
      "carts",
      user.value?.uid,
      "items"
    );
    const { _user } = getUserDoc("users");
    const pieses = ref(2);
    const shipping = ref(2);
    const total = ref(0);
    const orders = ref([]);
    const currentComponent = ref("");

    const handleListenToOrder = (order) => {
      orders.value.push(order);
      pieses.value = orders.value.length;
      total.value += order.price * order.qty;
    };
    const userInfo = ref(null);
    const handleOrder = () => {
      userInfo.value = {
        id: user.value?.uid,
        name: user.value?.displayName,
        facebook: _user.value?.facebook || "", // Default value if _user.value is null
        telegram: _user.value?.telegram || "", // Default value if _user.value is null
        tel: _user.value?.phone || "", // Default value if _user.value is null
        location: _user.value?.location || "", // Default value if _user.value is null
        shipping: shipping.value,
      };
      orders.value = orders.value.filter(
        (order) => order.size && order.image && order.qty > 0
      );
      console.log("====================================");
      console.log(orders.value && userInfo.value); // Access userInfo.value instead of userInfo
      console.log("====================================");
      if (orders.value.length > 0) {
        currentComponent.value = "PrintInvoice";
      }
    };

    return {
      pieses,
      total,
      shipping,
      items,
      handleListenToOrder,
      currentComponent,
      handleOrder,
      userInfo,
      orders,
    };
  },
};
</script>
