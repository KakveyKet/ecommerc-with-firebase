<template>
  <div class="grid grid-cols-2 p-5 bg-white h-auto lg:grid-cols-4 shadow-lg">
    <div class="lg:border-r-2 border-gray-200 lg:mr-5">
      <h3 class="font-semibold mb-3 text-gray-700">Customer Services</h3>
      <ul class="text-gray-500 font-thin">
        <li>Help Center</li>
        <li>Report</li>
        <li>Submit a Dispute</li>
      </ul>
    </div>
    <div class="lg:border-r-2 border-gray-200 lg:mr-5">
      <h3 class="font-semibold mb-3 text-gray-700">About Us</h3>
      <ul class="text-gray-500 font-thin">
        <li>Help Center</li>
        <li>Report</li>
        <li>Submit a Dispute</li>
      </ul>
    </div>

    <div class="col-span-2 mt-2 lg:mt-0">
      <h3 class="font-semibold mt-3 text-grey-700 mb-3">Contact Us</h3>
      <div class="grid sm:grid-cols-2 sm:space-y-0 gap-4">
        <div class="flex items-center space-x-2">
          <img
            class="w-10 h-10 shadow-lg p-2 rounded-full hover:shadow-sm duration-300"
            src="../assets/images/facebook-logo.png"
            alt=""
          />
          <img
            class="w-10 p-2 h-10 shadow-lg rounded-full hover:shadow-sm duration-300"
            src="../assets/images/tik-tok.png"
            alt=""
          />
          <img
            class="w-10 p-2 h-10 shadow-lg rounded-full hover:shadow-sm duration-300"
            src="../assets/images/twitter.png"
            alt=""
          />
        </div>

        <div class="grid grid-cols-1">
          <div>
            <div class="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-10 p-2 text-blue-600 h-10 shadow-lg rounded-full hover:shadow-sm duration-300"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-gray-400">096 76 37 609</span>
            </div>

            <div class="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-10 p-2 text-blue-600 h-10 shadow-lg rounded-full hover:shadow-sm duration-300"
              >
                <path
                  d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"
                />
                <path
                  d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"
                />
              </svg>

              <span class="text-gray-700"
                >masteritcambodia1018@outlook.con</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
