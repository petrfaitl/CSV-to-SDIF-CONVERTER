<script lang="ts" setup>
import { XMarkIcon, Bars3Icon } from "@heroicons/vue/24/outline";
// import { useSiteDetails } from "~/composables/siteDetails";
// import ProfileImage from "~/components/navigation/ProfileImage.vue";
// import BaseButton from "~/components/shared/BaseButton.vue";
// import DarkOverlay from "~/components/shared/DarkOverlay.vue";
// import { useUserStore } from "~/stores/userStore";
// import { storeToRefs } from "pinia";

// const user1 = {
//   name: "Petr",
//   src: computed(() => {
//     return "https://www.gravatar.com/avatar/dedd2dc0ff33473626e6e493747547a0?s=200";
//   }),
// };

const navItems = [
  {
    id: 0,
    title: "Swim Club",
    link: "https://www.lvwasc.co.nz",
    type: "external",
  },
  {
    id: 1,
    title: "Meet Manager Help",
    link: "https://activenetwork.my.salesforce-sites.com/hytekswimming/",
    type: "external",
  },
  {
    id: 1,
    title: "SDIF Specifications",
    link: "/files/sdifv3f.txt",
    type: "external",
  },
  {
    id: 1,
    title: "Contact Us",
    link: "https://www.lvwasc.co.nz/contact/",
    type: "external",
  },
];

const mobileMenuIsOpen = ref(false);
const sidenav = ref<HTMLObjectElement>();

// const siteDetails = useSiteDetails();

// const user = useUserStore();
// const { isLoggedIn } = storeToRefs(user);
// const logUserIn = () => {
//   user.login();
// };

// const logUserOut = () => {
//   user.logout();
// };

const toggleMobileMenu = () => {
  mobileMenuIsOpen.value = !mobileMenuIsOpen.value;
};
const closeMobileMenu = () => {
  mobileMenuIsOpen.value = false;
};

const route = useRoute();
watch(route, () => {
  closeMobileMenu();
});
// watch(isLoggedIn, () => {
//   // console.log(route.meta);
//   if (route.meta?.requiresAuth) {
//     !user.isLoggedIn ? navigateTo({ name: "jobs" }) : true;
//   }
// });
</script>
<template>
  <div class="relative w-full bg-white text-sm h-16">
    <Transition name="slide-in">
      <!--            Outer Mobile Menu-->
      <div
        v-if="mobileMenuIsOpen"
        ref="sidenav"
        class="fixed top-0 bottom-0 w-[250px] bg-white z-50 shadow"
      >
        <!--                Inner Mobile Menu-->
        <div class="flex flex-wrap relative">
          <div class="px-6 h-16 w-full border-b flex items-center">
            <NuxtLink to="/">
              <img
                src="/images/lvwa_logo.jpg"
                alt="LVW Aquatics logo"
                class="object-contain h-16"
              />
            </NuxtLink>
            <div class="ml-auto flex items-center h-16 w-6">
              <!--            Close Button-->
              <button class="w-full" @click="closeMobileMenu">
                <XMarkIcon />
              </button>
            </div>
          </div>
          <ul class="flex flex-col gap-4 pt-6 px-6">
            <li v-for="item in navItems" :key="item.id">
              <NuxtLink
                :to="item.link"
                class="uppercase"
                :target="item?.type === 'external' ? '_blank' : '_self'"
              >
                {{ item.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </Transition>

    <div class="fixed inset-x-0 top-0 h-16 w-full bg-white z-20">
      <div
        class="flex flex-no-wrap px-4 md:px-12 h-full border-b items-center gap-8"
      >
        <!--            Hamburger Button-->
        <div ref="mobileMenu" class="lg:hidden flex items-center">
          <button class="w-8 h-6" @click="toggleMobileMenu">
            <!--            open button-->
            <Bars3Icon />
          </button>
        </div>

        <!--        Menu bar - large screens-->
        <div class="h-16">
          <NuxtLink to="/">
            <img
              src="/images/lvwa_logo.jpg"
              alt="LVW Aquatics logo"
              class="object-contain h-16"
            />
          </NuxtLink>
        </div>
        <ul
          class="lg:flex gap-8 hidden"
          @click.passive="closeMobileMenu"
          v-if="!mobileMenuIsOpen"
        >
          <li v-for="item in navItems" :key="item.id">
            <NuxtLink
              :to="`${item.link}`"
              :target="item?.type === 'external' ? '_blank' : '_self'"
              class="uppercase font-semibold"
              >{{ item.title }}
            </NuxtLink>
          </li>
        </ul>
        <div class="ml-auto">
          <!--          <Transition name="fade-in" mode="out-in">-->
          <!--            &lt;!&ndash;          Action button&ndash;&gt;-->
          <!--            <BaseButton v-if="!user.isLoggedIn" @click="logUserIn"-->
          <!--            >Sign in-->
          <!--            </BaseButton>-->
          <!--            &lt;!&ndash;            User profile Image&ndash;&gt;-->
          <!--            <ProfileImage-->
          <!--                v-else-->
          <!--                :name="user1.name"-->
          <!--                :src="user1.src.value"-->
          <!--                @click="logUserOut"-->
          <!--            />-->
          <!--          </Transition>-->
        </div>
      </div>
    </div>
  </div>
  <!--  <DarkOverlay v-show="mobileMenuIsOpen" @clicked="closeMobileMenu" />-->
</template>

<style scoped>
.router-link-exact-active {
  @apply text-orange-500 font-semibold;
}

a {
  @apply hover:text-primary;
}

.slide-in-enter-from,
.slide-in-leave-to {
  @apply -translate-x-[250px];
}

.slide-in-enter-to,
.slide-in-leave-from {
  @apply left-0;
}

.slide-in-enter-active,
.slide-in-leave-active {
  @apply transition-all ease-in-out duration-300;
}

.fade-in-enter-from,
.fade-in-leave-to {
  @apply opacity-0;
}

.fade-in-enter-active,
.fade-in-leave-active {
  @apply transition-opacity;
}
</style>
