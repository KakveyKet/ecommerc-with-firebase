<template>
  <div>
    <div
      v-if="orders?.length > 0"
      class="mx-10 py-5 text-xl text-indigo-700 border-b-2 border-indigo-100"
    >
      <span>{{ orders?.length }}</span> orders left for checking out
    </div>
    <!-- <div v-else class="">
      <div
        class="w-9/12 mx-auto h-12 flex justify-center items-center bg-indigo-100 text-gray-900 font-extrabold text-2xl"
      >
        there is no order for checking out
      </div>
    </div> -->
    <div class="mx-10">
      <div
        class="grid grid-cols-6 items-center py-3 border-b-2 border-indigo-100 font-semibold font-serif text-indigo-700"
      >
        <div></div>
        <div>Customer</div>
        <div class="col-span-2">Date</div>
      </div>
      <div
        v-for="(order, index) in orders"
        :key="order.id"
        v-show="index >= previous && index < next"
        class="grid grid-cols-6 border-b-2 items-center border-indigo-100 font-serif py-3"
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6 text-indigo-800"
          >
            <path
              fill-rule="evenodd"
              d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div>
          {{ order.userInfo.name }}
        </div>
        <div class="col-span-2">
          {{ date(order.createdAt.toDate()).format("dddd D, MMM YYYYY") }}
        </div>
        <div class="flex space-x-3 my-3">
          <button
            @click="handlePrintInvice(order.userInfo, order.orders)"
            class="col-span-2 w-full border p-1 border-indigo-50 text-indigo-700 hover:text-white hover:bg-indigo-800"
          >
            Invoice
          </button>
          <button
            @click="handleClear(order.userInfo, order.orders, order.id)"
            class="w-full p-1 border border-indigo-50 text-indigo-700 hover:text-white hover:bg-indigo-800"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
    <div class="w-full flex justify-center">
      <ButtonPagination :products="orders" :onPagination="handlePagination" />
    </div>

    <component
      :is="currentComponet"
      :order="order"
      :userInfo="userInfo"
      @close="handleClose"
      :orderid="orderid"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import getCollections from "@/composible/getCollection";
import ButtonPagination from "./ButtonPagination.vue";
import PrintInvoice from "./PrintInvoice.vue";
import moment from "moment";
import ClearOrderConfirmationVue from "../views/ClearOrderConfirmation.vue";

export default {
  components: {
    ButtonPagination,
    PrintInvoice,
    ClearOrderConfirmationVue,
  },
  setup() {
    const date = ref(moment());
    const userInfo = ref("");
    const order = ref("");
    const orderid = ref(null);
    const currentComponent = ref("");
    const previous = ref(0);
    const next = ref(4);
    const { documents: orders } = getCollections("orders");

    const handlePrintInvoice = (info, orderInfo) => {
      userInfo.value = info;
      order.value = orderInfo;
      currentComponent.value = "PrintInvoice";
    };

    const handleClose = () => {
      currentComponent.value = "";
      userInfo.value = "";
      order.value = "";
    };

    const handleClear = (info, orderInfo, orderId) => {
      currentComponent.value = "ClearOrderConfirmationVue";
      userInfo.value = info;
      order.value = orderInfo;
      orderid.value = orderId;
    };

    const handlePagination = (pre, nxt) => {
      previous.value = pre;
      next.value = nxt;
    };

    return {
      orders,
      date,
      handlePrintInvoice,
      currentComponent,
      userInfo,
      order,
      handleClose,
      handleClear,
      handlePagination,
      previous,
      next,
      orderid,
    };
  },
};
</script>
