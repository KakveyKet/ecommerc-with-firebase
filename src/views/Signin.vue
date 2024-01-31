<template>
  <div class="flex flex-col h-screen">
    <div>
      <Navbar />
    </div>
    <div
      class="w-11/12 md:w-8/12 sm:w-10/12 lg:w-7/12 xl:w-6/12 mx-auto mt-24 bg-white rounded-md shadow-sm py-10 px-5"
    >
      <h1
        class="text-indigo-700 mb-5 font-semibold text-center font-mono tracking-wide"
      >
        Signin Form
      </h1>
      <form @submit.prevent="handleSignIn" class="space-y-4">
        <div class="flex items-center">
          <div class="p-2 border-2 border-indigo-700 rounded-l-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6 text-pink-600"
            >
              <path
                d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"
              />
              <path
                d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"
              />
            </svg>
          </div>
          <div class="w-full">
            <input
              v-model="email"
              type="email"
              placeholder="email"
              class="focus:outline-none border-2 border-indigo-700 p-2 w-full rounded-r-md text-gray-700 font-thin"
            />
          </div>
        </div>
        <div class="flex items-center">
          <div class="p-2 border-2 border-indigo-700 rounded-l-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6 text-pink-600"
            >
              <path
                fill-rule="evenodd"
                d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="w-full">
            <input
              v-model="password"
              type="password"
              placeholder="password"
              class="focus:outline-none border-2 border-indigo-700 p-2 w-full rounded-r-md text-gray-700 font-thin"
            />
          </div>
        </div>
        <label class="text-red-600 font-thin text-sm" v-if="error">
          {{ error }}
        </label>
        <div class="">
          <button
            v-if="!isPending"
            class="w-full py-2 rounded-md bg-white shadow text-indigo-700 duration-300 cursor-pointer"
          >
            Sign In
          </button>
          <button
            v-else
            class="w-full py-2 relative rounded-md bg-white shadow text-indigo-700 hover:bg-indigo-900 hover:text-white duration-300 cursor-pointer"
          >
            <div>Signing In....</div>
            <div class="absolute top-3 right-4">
              <div
                class="animate-spin h-4 w-4 rounded-full border-b-2 border-r-2 border-indigo-700"
              ></div>
            </div>
          </button>
        </div>
        <div>
          <p class="text-indigo-800 font-thin text-sm">
            Doesn't Have Account ?
            <router-link
              :to="{ name: 'signup' }"
              class="font-semibold text-indigo-700 cursor-pointer underline font-mono hover:text-indigo-900 ml-2"
              >Sign Up
            </router-link>
          </p>
        </div>
      </form>
    </div>
    <div>
      <Footer />
    </div>
  </div>
</template>

<script>
import useSignIn from "@/composible/useSigIn";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

export default {
  components: {
    Navbar,
    Footer,
  },
  setup() {
    const { error, isPending, signin } = useSignIn();
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const handleSignIn = async () => {
      await signin(email.value, password.value);
      if (!error.value && isPending.value === false) {
        router.push({ name: "home" });
      }
    };

    return { email, password, handleSignIn, error, isPending };
  },
};
</script>

<style lang="scss" scoped></style>
