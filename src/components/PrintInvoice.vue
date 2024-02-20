<template>
  <div class="bg-gray-900 inset-0 fixed bg-opacity-50 z-50 w-full h-screen">
    <!-- hold invoice -->
    <div
      class="bg-white h-full w-full py-5 relative sm:w-11/12 lg:w-7/12 xl:1/2 mx-auto"
    >
      <!-- btn cancel and print  -->
      <div class="absolute top-0 left-0 cursor-pointer bg-red-600 text-white">
        <svg
          @click="handleCancel"
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
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div
        class="absolute top-0 left-7 cursor-pointer bg-indigo-800 hover:text-indigo-800 text-gray-800"
      >
        <!-- print -->
        <svg
          @click="handlePrint"
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
            d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
          />
        </svg>
      </div>
      <!-- invoice -->
      <div
        id="print-invoice"
        class="w-full p-2 border-2 border-indigo-100 space-y-10"
      >
        <!-- header -->
        <div
          class="flex justify-between items-end border-b-2 border-indigo-100 pb-5"
        >
          <div>
            <img class="w-10" src="../assets/logoEcommerce.png" alt="" />
          </div>
          <div class="text-indigo-900 font-semibold mr-12">
            <p>{{ today }}</p>
            <p>Invoice #{{ invoiceNumber }}</p>
          </div>
        </div>
        <!-- sub header -->
        <div class="flex space-x-5 pb-5 border-b-2 border-indigo-100">
          <div class="w-full leading-none space-y-3">
            <div class="">
              <span class="text-indigo-900">Supplier: </span>
              <p class="text-indigo-700 font-bold text-xl">
                Master IT Cambodia
              </p>
            </div>
            <div class="text-sm">
              <p>Prek Prash Sdach Commune</p>
              <p>Battambang, Cambodia</p>
            </div>
          </div>
          <div>
            <div class="w-full leading-none space-y-3 mr-12">
              <div>
                <span class="text-indigo-900">Customer: </span>
                <p class="text-indigo-700 font-bold text-xl">
                  {{ userInfo.name }}
                </p>
              </div>
              <div class="text-sm">
                <p>{{ userInfo.location }}</p>
              </div>
              <div>
                <div class="flex items-center space-x-2">
                  <img
                    class="w-6 h-6 inline-block"
                    src="../assets/images/facebook-logo.png"
                    alt=""
                  />
                  <span>{{ userInfo.facebook }}</span>
                </div>

                <div class="flex items-center space-x-2">
                  <img
                    class="w-6 h-6 inline-block"
                    src="../assets/images/tik-tok.png"
                    alt=""
                  />
                  <span class="">{{ userInfo.tel }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- body -->
        <div>
          <!-- table heand -->
          <div
            class="bg-indigo-800 text-white h-12 flex justify-between items-center text-whit font-mono w-full px-12"
          >
            <p>Item Description</p>
            <p>Price</p>
            <p>Discount</p>
            <p>Qty</p>
            <p>Total</p>
          </div>
          <!-- table body -->
          <div v-for="(item, index) in orders" :key="index" class="mt-4">
            <div
              :class="{ 'bg-even': index % 2 == 0, 'bg-odd': index % 2 != 0 }"
              class="flex justify-between items-center h-full p-2 text-indigo-500 space-y-3"
            >
              <div>
                <img
                  class="w-7 h-7 object-cover object-center inline-block"
                  :src="item.image.url"
                  alt=""
                />
                <span class="ml-4">{{ item.name }}</span>
              </div>
              <div>$ {{ item.price }}</div>
              <div>{{ item.discount }} %</div>
              <div>{{ item.qty }}</div>
              <div>$ {{ item.price - (item.price * item.qty) / 100 }}</div>
            </div>
          </div>
          <!-- subtotal -->
          <div
            class="flex flex-col justify-end items-end my-2 text-gray-800 font-semibold"
          >
            <div class="space-y-3">
              <span> Sub Total: </span>
              <span>$ {{ subtotal }}</span>
            </div>
            <div>
              <span> Shipping: </span>
              <span>$ {{ userInfo.shipping }}</span>
            </div>
          </div>
          <!-- total -->
          <div
            class="flex ml-auto justify-between w-[200px] mr-4 p-2 border-2 border-indigo-200 text-indigo-700 font-bold font-serif"
          >
            <p>Total</p>
            <p>$ {{ total }}</p>
          </div>
          <!-- footer -->
          <div class="flex items-center justify-between py-2">
            <div
              class="flex gap-2 items-center border-indigo-100 justify-between"
            >
              <img
                class="w-8 h-8"
                src="../assets/images/facebook-logo.png"
                alt=""
              />
              <span>Master IT Cambodia</span>
            </div>
            <div class="flex items-center">
              <img class="w-8 h-8" src="../assets/images/twitter.png" alt="" />
              <span>Master IT Cambodia</span>
            </div>
            <div class="flex items-center">
              <img class="w-8 h-8" src="../assets/images/tik-tok.png" alt="" />
              <span>098 765 432 1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getCollections from "@/composible/getCollection";
import useCollection from "@/composible/useCollection";
import { ref, onMounted, watch } from "vue";
import { timestamp } from "@/firebase/config";
import moment from "moment";
import printJS from "print-js";

export default {
  props: ["orders", "userInfo"],
  setup(props, { emit }) {
    const subtotal = ref(null);
    const invoiceNumber = ref(1);
    const total = ref(null);
    const today = moment().format("dddd, Do MMM, YYYY");
    const { addDocument } = useCollection("orders");

    const handleCancel = () => {
      emit("close");
    };

    // Watch for changes in the 'invoices' collection
    watch(getCollections("invoices").documents, (newVal, oldVal) => {
      if (newVal.length <= 0) {
        invoiceNumber.value = "000" + invoiceNumber.value;
      } else {
        const invoiceLength = (invoiceNumber.value =
          "000" + invoiceNumber.value.length);

        if (newVal.length < 10) {
          invoiceNumber.value = "000" + invoiceLength;
        } else if (invoiceLength < 100) {
          invoiceNumber.value = "00" + invoiceLength;
        } else if (invoiceLength < 1000) {
          invoiceNumber.value = "0" + invoiceLength;
        } else {
          invoiceNumber.value = invoiceLength;
        }
      }
    });

    // Calculate subtotal and total on mount
    onMounted(() => {
      if (props.orders?.length > 0) {
        props.orders.forEach((order) => {
          subtotal.value = order.price - (order.price * order.discount) / 100;
          subtotal.value = Number(subtotal.value * order.qty.toFixed(2));
          total.value = Number(
            subtotal.value + props.userInfo.shipping
          ).toFixed(2);
        });
      }
    });

    // Print invoice and add document to 'orders' collection
    const handlePrint = async () => {
      await addDocument({
        name: props.userInfo?.name,
        userInfo: props.userInfo,
        orders: props.orders,
        createdAt: timestamp(),
      });
      printJS({
        printable: "print-invoice",
        type: "html",
        targetStyles: ["*"],
      });
    };

    return { subtotal, total, invoiceNumber, handleCancel, today, handlePrint };
  },
};
</script>
