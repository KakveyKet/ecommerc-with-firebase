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
        Signup Form
      </h1>
      <form @submit.prevent="handleSigUp" class="space-y-4">
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
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="w-full">
            <input
              v-model="username"
              type="text"
              placeholder="username"
              autofocus
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
                d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="w-full">
            <input
              v-model="phone"
              type="text"
              placeholder="phone"
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
                d="M3.75 4.5a.75.75 0 0 1 .75-.75h.75c8.284 0 15 6.716 15 15v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75C18 11.708 12.292 6 5.25 6H4.5a.75.75 0 0 1-.75-.75V4.5Zm0 6.75a.75.75 0 0 1 .75-.75h.75a8.25 8.25 0 0 1 8.25 8.25v.75a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75v-.75a6 6 0 0 0-6-6H4.5a.75.75 0 0 1-.75-.75v-.75Zm0 7.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="w-full">
            <input
              v-model="telegram"
              type="text"
              placeholder="telegram"
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
                d="M3.75 4.5a.75.75 0 0 1 .75-.75h.75c8.284 0 15 6.716 15 15v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75C18 11.708 12.292 6 5.25 6H4.5a.75.75 0 0 1-.75-.75V4.5Zm0 6.75a.75.75 0 0 1 .75-.75h.75a8.25 8.25 0 0 1 8.25 8.25v.75a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75v-.75a6 6 0 0 0-6-6H4.5a.75.75 0 0 1-.75-.75v-.75Zm0 7.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="w-full">
            <input
              v-model="facebook"
              type="text"
              placeholder="facebook"
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
                d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="w-full">
            <input
              v-model="location"
              type="text"
              placeholder="location"
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
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="w-full">
            <input
              v-model="confirmpassword"
              type="password"
              placeholder="confirm password"
              class="focus:outline-none border-2 border-indigo-700 p-2 w-full rounded-r-md text-gray-700 font-thin"
            />
          </div>
        </div>
        <label class="text-red-600 font-thin text-sm" v-if="error">
          {{ error }}
        </label>
        <div class="">
          <button
            type="submit"
            v-if="!isPending"
            class="w-full py-2 rounded-md bg-white shadow text-indigo-700 duration-300 cursor-pointer"
          >
            Sign Up
          </button>
          <button
            v-else
            class="w-full py-2 relative rounded-md bg-white shadow text-indigo-700 hover:bg-indigo-900 hover:text-white duration-300 cursor-pointer"
          >
            <div>Signing Up....</div>
            <div class="absolute top-3 right-4">
              <div
                class="animate-spin h-4 w-4 rounded-full border-b-2 border-r-2 border-indigo-700"
              ></div>
            </div>
          </button>
        </div>
        <div>
          <p class="text-indigo-800 font-thin text-sm">
            Already Have Account ?
            <router-link
              to="/signin"
              class="font-semibold text-indigo-700 cursor-pointer underline font-mono hover:text-indigo-900 ml-2"
              >Sign In
            </router-link>
          </p>
        </div>
      </form>
    </div>
    <div class="mt-5">
      <Footer />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import useSignUp from "../composible/useSignup";
import useCollection from "../composible/useCollection";
import { useRouter } from "vue-router";
export default {
  components: {
    Navbar,
    Footer,
  },
  setup() {
    const username = ref("");
    const email = ref("");
    const phone = ref("");
    const telegram = ref("");
    const facebook = ref("");
    const location = ref("");
    const password = ref("");
    const confirmpassword = ref("");
    const router = useRouter();
    const { error, isPending, signup } = useSignUp();
    const { addUser } = useCollection("users");
    const handleSigUp = async () => {
      try {
        if (password.value !== confirmpassword.value) {
          throw new Error("Password does not match");
        }

        const res = await signup(email.value, password.value, username.value);
        if (res && res.user && res.user.uid) {
          await addUser({
            phone: phone.value,
            telegram: telegram.value,
            facebook: facebook.value,
            location: location.value,
          });

          router.push({ name: "home" });
        }
      } catch (err) {
        error.value = err.message;
      }
    };

    return {
      username,
      email,
      phone,
      telegram,
      facebook,
      location,
      password,
      confirmpassword,
      isPending,
      handleSigUp,
      error,
    };
  },
};
</script>
