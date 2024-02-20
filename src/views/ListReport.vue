<template>
  <div class="">
    <div>
      <div class="mx-5 my-5 space-x-5">
        <div class="text-gray-700 font-semibold">
          <span class="text-indigo-700 font-black">10</span> Invoices in total
          from

          <span class="text-indigo-700 font-black"> 2021 , 07 , 10 </span>to
          <span class="text-indigo-700 font-black"> 2021 , 07 , 11 </span>
        </div>
        <div
          class="text-indigo-700 font-bold text-2xl p-5 border border-indigo-100 inline-block"
        >
          USD 12500
        </div>
      </div>
      <div v-if="windowWidth < 768">
        <fieldset
          v-for="report in documents"
          :key="report"
          class="border-2 border-indigo-100 space-y-2"
        >
          <legend class="text-indigo-700 font-semibold">
            {{ roport.createdAt }}
          </legend>
          <div
            class="grid grid-cols-4 p-5 gap-4 bg-indigo-100 items-center justify-between"
          >
            <div>Admin</div>
            <div>Customer</div>
            <div class="col-span-2">Payment Type</div>
          </div>
          <div
            class="grid grid-cols-4 gap-4 items-center p-5 justify-between text-gray-700 font-semibold"
          >
            <div>{{ report.admin }}</div>
            <div class="leading-4 text-indigo-700">
              <p>{{ report.userInfo.name }}</p>
              <p class="text-sm">{{ report.userInfo.tel }}</p>
            </div>
            <div class="col-span-2">
              <span>{{ report.paymentType }}</span> -
              <span>{{ report.paymentID }} </span>
            </div>
          </div>
        </fieldset>
      </div>
      <div v-if="windowWidth >= 769" class="mx-10">
        <div
          class="grid grid-cols-7 lg:grid-cols-5 gap-6 py-5 items-center font-bold text-indigo-700 border-b-2"
        >
          <div></div>
          <div>admin</div>
          <div class="col-span-2 lg:col-span-1">date</div>
          <div>customer</div>
          <div class="col-span-2 lg:col-span-1">Payment type</div>
        </div>
        <div
          class="grid grid-cols-7 lg:grid-cols-5 gap-6 py-5 items-center font-bold border-b-2 bg-slate-100"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6 text-indigo-700 ml-2"
            >
              <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
              <path
                fill-rule="evenodd"
                d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z"
                clip-rule="evenodd"
              />
              <path
                d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z"
              />
            </svg>
          </div>
          <div>Cena</div>
          <div class="col-span-2 lg:col-span-1">Mon 10 , May , 2022</div>
          <div class="flex text-indigo-700 text-sm leading-0">
            <p>Marry</p>
            <p>012 222 444</p>
          </div>
          <div class="col-span-2 lg:col-span-1">Wing-22020202</div>
        </div>
      </div>
      <div>
        <ButtonPagination />
      </div>
    </div>
    <div class="text-gray-700 space-y-3 p-5">
      <div class="font-bold text-2xl">Oop, somthinng went wrong.</div>
      <div class="font-semibold text-xl">
        May your filtering incorrect or maybe no reports
      </div>
      <div class="font-semibold text-lg">Make Soure your report have</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import ButtonPagination from "@/components/ButtonPagination.vue";
import getCollections from "@/composible/getCollection";
import { convertToTimestamp } from "@/firebase/config";
export default {
  components: {
    ButtonPagination,
  },
  props: ["dateTo", "dateFrom"],

  setup(props) {
    const windowWidth = ref(window.innerWidth);
    console.log(props.dateFrom);
    console.log(new Date(props.dateFrom));
    console.log(convertToTimestamp(new Date(props.dateFrom)));
    const onResize = () => {
      windowWidth.value = window.innerWidth;
    };

    const { documents } = getCollections("orders", {
      from: convertToTimestamp(new Date(props.dateFrom)),
      to: convertToTimestamp(new Date(props.dateTo)),
    });

    console.log("this is " + documents);
    onMounted(() => {
      window.addEventListener("resize", onResize);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", onResize);
    });

    return {
      windowWidth,
      documents,
    };
  },
};
</script>
