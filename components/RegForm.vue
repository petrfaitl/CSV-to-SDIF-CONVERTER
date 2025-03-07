<script setup>
import { createInput } from "@formkit/vue";
import { reset } from "@formkit/core";
import { raceSchema } from "assets/races/events.js";
import FormCheckboxFormKit from "~/formkit-components/FormCheckboxFormKit.vue";
import { ArrowPathIcon } from "@heroicons/vue/24/outline";

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const fe = createInput(FormCheckboxFormKit);

defineProps({
  eventDate: {
    type: String,
    required: true,
  },
  eventTitle: {
    type: String,
    required: false,
    default: "Swim Night",
  },
  eventTime: {
    type: String,
    required: false,
    default: "5pm",
  },
});
// const eventOptions = raceSchema();
const submitted = ref(false);

async function handleSubmit(data) {
  // this.$formkit.;
  await wait(3000);
  // console.log(data);
  submitted.value = true;
  return true;
}

function clearForm() {
  reset("regForm");
}

const value = ref([]);
</script>

<template>
  <div class="text-sm">
    <FormKit
      type="form"
      :ignore="false"
      :config="{ validationVisibility: 'dirty' }"
      @submit="handleSubmit"
      :actions="false"
      id="regForm"
      form-class="grid grid-cols-8 gap-2"
    >
      <template #default="{ state }">
        <h1 class="col-span-full font-bold mb-8">
          {{ eventTitle }} - {{ eventDate }} from {{ eventTime }}
        </h1>

        <FormKit
          type="text"
          label="Parent's Name"
          placeholder="Enter your full name"
          validation="required"
          name="parent-name"
          outer-class="col-span-4"
        />
        <FormKit
          type="text"
          label="Contact Email"
          placeholder="Email address"
          validation="required|email"
          name="email"
          outer-class="col-span-4 "
        />
        <FormKit
          type="text"
          label="Swimmer's Name"
          name="swimmer"
          placeholder="Enter your child's full name"
          validation="required|length:3"
          outer-class="col-span-full"
          wrapper-class="w-full"
        />

        <FormKit
          type="select"
          label="Gender"
          name="gender"
          placeholder="Gender"
          :options="{ male: 'M', female: 'F' }"
          validation="required|length:1"
          outer-class="col-span-3"
          :selectIcon-class="{ 'self-center': true, 'h-full': false }"
        />

        <FormKit
          type="date"
          label="Date of Birth"
          name="dob"
          placeholder="DOB"
          validation="required"
          outer-class="col-span-5"
        />

        <FormKit
          :type="fe"
          outer-class="col-span-full"
          label="Junior Events"
          :inner-class="{
            $reset: true,
          }"
          :options="[
            { value: '12bk', label: '12m Back' },
            { value: '25bk', label: '25m Back' },
          ]"
        />
        <!--        <FormKitSchema :schema="eventOptions" />-->

        <div class="col-span-full flex gap-4">
          <FormKit
            type="button"
            :disabled="state.loading"
            @click="clearForm"
            input-class="bg-red-500 form-btn btn-primary"
            label="Clear form"
          />
          <FormKit
            type="submit"
            :disabled="state.loading"
            @submit="handleSubmit"
            input-class="bg-blue-500 form-btn btn-primary"
            prefix-icon-class="animate-spin"
          >
            <template #prefixIcon v-if="state.loading">
              <ArrowPathIcon class="animate-spin h-5 mr-2" />
            </template>
            <template #default>
              {{ !state.loading ? "Register" : "Loading" }}
            </template>
          </FormKit>
        </div>

        <transition name="fade">
          <ToolTip
            v-if="submitted"
            border="thin"
            spacing="thin"
            :status="submitted"
          >
            <template #text>
              Your registration has been submitted successfully.
            </template>
          </ToolTip>
        </transition>
        <div class="col-span-full">
          {{ state }}
        </div>
      </template>
    </FormKit>
  </div>
</template>

<style>
.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}

.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-1000;
}
</style>
