<template>
  <div class="flex flex-col">
    <div>
      <NavbarVue />
    </div>
    <div class="mb-auto">
      <div class="w-full">
        <form @submit.prevent="handleOpenListReport" class="px-5 py-10">
          <div>
            <div class="flex w-1/2 mx-auto py-2">
              <label
                class="flex justify-center p-4 items-center bg-indigo-700 text-white shadow-md"
                for="datefrom"
                >Data from</label
              >
              <input
                class="focus:outline-none p-2 border shadow-sm text-gray-700 w-3/4"
                v-model="dateFrom"
                type="date"
                id="datefrom"
              />
            </div>
          </div>
          <div>
            <div class="flex w-1/2 mx-auto py-2">
              <label
                class="flex justify-center p-4 items-center bg-indigo-700 text-white shadow-md"
                for="dateTo"
                >Data To</label
              >
              <input
                class="focus:outline-none p-2 border shadow-sm text-gray-700 w-3/4"
                v-model="dateTo"
                type="date"
                id="dateTo"
              />
            </div>
          </div>
          <div class="w-1/2 mx-auto">
            <button
              class="text-indigo-700 p-2 hover:text-white hover:bg-indigo-900 shadow-md rounded-lg"
            >
              Filter By Date
            </button>
          </div>
        </form>
      </div>

      <div>
        <component
          :is="currentComponent"
          :dateTo="dateTo"
          :dateFrom="dateFrom"
        />
      </div>
    </div>
    <div>
      <FooterVue />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import NavbarVue from "@/components/Navbar.vue";
import FooterVue from "@/components/Footer.vue";
import ListReportVue from "@/views/ListReport.vue";
import moment from "moment";

export default {
  components: {
    ListReportVue,
    NavbarVue,
    FooterVue,
  },
  setup() {
    const currentComponent = ref("");
    const dateFrom = ref(moment().format("YYYY-MM-DD"));
    const dateTo = ref(moment().format("YYYY-MM-DD"));
    const handleOpenListReport = () => {
      currentComponent.value = "ListReportVue";
    };
    return { dateFrom, dateTo, handleOpenListReport, currentComponent };
  },
};
</script>
