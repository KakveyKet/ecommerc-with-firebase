<template>
  <div
    class="w-full fixed flex justify-center items-center inset-0 h-screen bg-gray-900 z-50 bg-opacity-50 p-5"
  >
    <div
      class="relative bg-white shadow rounded-md w-full lg:w-1/2 md:w-8/12 sm:w-3/4 h-auto"
    >
      <!-- close -->
      <svg
        @click="handleClose"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-6 h-6 absolute top-1 right-1 cursor-pointer text-gray-400 hover:text-gray-700 duration-300"
      >
        <path
          fill-rule="evenodd"
          d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
          clip-rule="evenodd"
        />
      </svg>

      <!-- header -->
      <div class="flex justify-center items-center p-5 font-bold text-gray-700">
        <p>
          Do you want to delete this order from customer -
          <span class="text-indigo-700 uppercase">tra</span>
        </p>
      </div>
      <!-- body -->
      <div class="my-10 px-5 w-full space-y-3">
        <!-- payement type -->
        <div class="">
          <label class="block text-gray-700 font-semibold">Payment Type</label>
          <input
            class="focus:outline-none p-2 w-full shadow"
            placeholder="Example ABA"
            type="text"
            v-model="paymentType"
          />
        </div>
        <!-- payement id -->
        <div class="">
          <label class="block text-gray-700 font-semibold">Payment ID</label>
          <input
            class="focus:outline-none p-2 w-full shadow"
            placeholder="Example: 1234456789"
            type="text"
            v-model="paymentid"
          />
        </div>
        <!-- for error mss -->
        <label v-if="error" class="text-red-600 font-thin">Error SMS</label>
        <!-- btn clear -->
        <div class="flex space-x-2">
          <button
            @click="handlePaid"
            class="focus:outline-none w-full py-2 shadow rounded text-indigo-700 hover:text-white hover:bg-indigo-800 duration-300"
          >
            Customer Paid
          </button>
          <button
            @click="handleCustomerCancel"
            class="focus:outline-none w-full py-2 shadow rounded text-indigo-700 hover:text-white hover:bg-indigo-800 duration-300"
          >
            Customer Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import useCollection from "@/composible/useCollection";
import useDocument from "@/composible/useDocument";
import { timestamp } from "@/firebase/config";
import getUser from "@/composible/getUser";

export default {
  props: ["userInfo", "orders", "orderid"],
  setup(props, { emit }) {
    // Define reactive variables
    const paymentType = ref("");
    const paymentid = ref("");
    const error = ref(null);

    // Get user information
    const { user } = getUser();

    // Initialize composibles for working with Firestore
    const { removeDocument, addDocument } = useCollection("reports");
    const { addDoc } = useDocument("reports");

    // Define functions for handling actions
    const handleClose = () => {
      emit("close");
    };

    const handlePaid = async () => {
      // Check if payment type and payment ID are provided
      if (paymentType.value && paymentid.value) {
        // Create a new report object
        const report = {
          name: props.userInfo?.name,
          paymentType: paymentType.value,
          paymentid: paymentid.value,
          item: props.orders,
          customerInfo: props.userInfo,
          admin: user.value.displayName,
          createdAt: timestamp(),
        };

        // Add the report document to Firestore
        await addDocument(report);

        // Remove the order document from Firestore
        await removeDocument(props.orderid);

        // Emit a close event
        emit("close");
      } else {
        // Set an error message if payment type or payment ID is missing
        error.value = "Payment Type and Payment ID must exist";
      }
    };

    const handleCustomerCancel = async () => {
      // Remove the order document from Firestore
      await removeDocument(props.orderid);
    };

    // Return variables and functions to be used in the template
    return {
      handleClose,
      paymentid,
      paymentType,
      error,
      handleCustomerCancel,
      handlePaid,
    };
  },
};
</script>
