<script setup>
import { reset } from "@formkit/core";

import { meetConfig } from "~/schemas/eventInfo";
import { csvData, createEvent } from "~/services/createEvent";
import { getDataRows } from "~/utils/utilFunctions";
// import { ClipboardIcon } from "@heroicons/vue/24/outline";

const submitted = ref(false);

const meetName = ref("Coach Sam's Farewell Club Night");
const meetStartDate = ref("2023-06-24");
const meetEndDate = meetStartDate;
const meetOrganiserCode = ref("");

const meetOrganiserDetails = ref({});

const meetData = ref("");
const meetHeader = ref("");

const mandatoryColumnsObj = ref([
  { key: "teamCode", index: 4 },
  { key: "firstName", index: 5 },
  { key: "middleName", index: 6 },
  { key: "lastName", index: 7 },
  { key: "dob", index: 8 },
  { key: "gender", index: 9 },
  { key: "events", index: 11 },
  { key: "eventCount", index: 12 },
]);
const sd3Str = ref("");

const handleSubmit = (data) => {
  meetData.value = data["convert-area"];

  const swimmerData = getDataRows(meetData.value);

  // replace csv data with value of input from text area
  const event = createEvent(
    swimmerData,
    mandatoryColumnsObj.value,
    meetStartDate.value,
    meetEndDate.value,
    meetName.value,
    meetOrganiserDetails.value
  );
  sd3Str.value = event.buildSdifFile();
  submitted.value = true;

  return true;
};

function clearForm() {
  submitted.value = false;
  reset("convertForm");
}

onMounted(() => {
  meetOrganiserCode.value = "LVW";
});
watch(meetOrganiserCode, () => {
  meetOrganiserDetails.value = meetConfig.getOrganiserByCode(
    meetOrganiserCode.value
  );
});
</script>

<template>
  <div class="text-sm w-full max-w-2xl">
    <FormKit
      type="form"
      :ignore="false"
      :config="{ validationVisibility: 'dirty' }"
      @submit="handleSubmit"
      :actions="false"
      id="convertForm"
      form-class="grid grid-cols-12 gap-4 "
    >
      <template #default="{ state }">
        <FormKit
          type="date"
          label="Event Date"
          v-model="meetStartDate"
          placeholder="Event date"
          validation="required|date"
          name="meet-date"
          outer-class="col-start-1 col-span-6 "
        />
        <FormKit
          type="text"
          label="Meet Name"
          name="meet-name"
          v-model="meetName"
          placeholder="Enter the name of the meet"
          validation="required|length:3"
          outer-class="col-start-7 col-span-6 "
        />
        <FormKit
          type="select"
          label="Meet Organiser"
          name="meet-organiser"
          v-model="meetOrganiserCode"
          :options="meetConfig.getAllClubNamesFormSelect()"
          placeholder="Select Meet Organiser"
          validation="required"
          wrapper-class="$reset max-w-full w-full"
          selectIcon-class="$reset formkit-select-icon flex p-[3px] shrink-0 w-5 mr-2 -ml-[1.5em] pointer-events-none formkit-icon"
          outer-class="col-start-1 col-span-9 "
        />
        <FormKit
          type="textarea"
          label="CSV Data"
          placeholder="Paste your data here"
          validation="string|required"
          name="convert-area"
          wrapper-class="$reset max-w-full w-full"
          inner-class="$reset h-36 formkit-disabled:bg-gray-200 formkit-disabled:cursor-not-allowed formkit-disabled:pointer-events-none flex rounded mb-1 ring-1 ring-gray-400 focus-within:ring-blue-500 [&>label:first-child]:focus-within:text-blue-500 max-w-full w-full"
          outer-class="col-start-1 col-span-12"
        />

        <div class="col-start-1 col-span-full flex gap-4 mb-4">
          <FormKit
            type="button"
            :disabled="state.loading"
            @click="clearForm"
            input-class="$reset form-btn btn-secondary"
            label="Clear form"
          />

          <FormKit
            type="submit"
            :disabled="state.loading"
            @submit="handleSubmit"
            input-class="$reset form-btn btn-primary"
          >
            <template #default>
              {{ !state.loading ? "Convert" : "Working" }}
            </template>
          </FormKit>
        </div>
      </template>
    </FormKit>
  </div>
  <div class="section w-full">
    <transition name="fade" duration="300">
      <CodeOutput
        v-if="true"
        border="thin"
        spacing="thin"
        :status="submitted"
        :output="sd3Str"
        class="col-start-1 col-span-full"
      >
        <template #title>SD3 File Content</template>
      </CodeOutput>
    </transition>
  </div>
</template>

<style>
.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}

.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity;
}
</style>
