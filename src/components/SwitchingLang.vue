<template>
  <div
    class="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 w-full h-screen flex items-center justify-center"
  >
    <div class="bg-white px-2 py-5 w-96 h-[40%] rounded-md">
      <div class="flex items-center justify-between">
        <p class="text-gray-700 font-bold">Choose a langauge</p>
        <svg
          @click="handleClose"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6 text-gray-400 hover:text-gray-700 font-semibold"
        >
          <path
            fill-rule="evenodd"
            d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div>
        <div
          class="cursor-pointer p-2 rounded-md font-semibold"
          v-for="(lang, i) in locals"
          :key="i"
          :class="{ activeLang: lang == locale }"
          @click="handleSwichingLang(lang)"
        >
          {{ languages[i] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";
import { ref } from "vue";
export default {
  setup(props, { emit }) {
    const handleClose = () => {
      emit("close");
    };
    const languages = ref(["English", "ខ្មែរ", "ประเทศไทย", "中国"]);
    const { locale } = useI18n({ useScope: "global" });
    const locals = ref(process.env.VUE_APP_18_SUPPORT_LOCALE.split(","));
    const handleSwichingLang = (lang) => {
      if (locale.value != lang) {
        locale.value = lang;
      }
    };
    return { languages, locale, locals, handleSwichingLang, handleClose };
  },
};
</script>
