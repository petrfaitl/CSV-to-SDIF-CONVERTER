<script setup>
// import {submit} from "@formkit/icons";
// import { FormKitIcon, FormKitSchema, createInput } from "@formkit/vue";
import { reset } from "@formkit/core";

import { meetConfig } from "~/schemas/eventInfo";
import { csvData, createEvent } from "~/services/createEvent";
import { getDataRows } from "~/utils/utilFunctions";

const submitted = ref(false);

const meetName = ref("Coach Sam's Farewell Club Night");
const meetStartDate = ref("2023-06-24");
const meetEndDate = meetStartDate;
const meetOrganiserCode = ref("LVW");

const meetOrganiserDetails = ref({});

const meetData = ref("");
const meetHeader = ref("");
const mandatoryColumns = ref([4, 5, 6, 7, 8, 9, 11]);
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

  const swimmerData = getDataRows(csvData);

  // replace csv data with value of input from text area
  sd3Str.value = createEvent(
    swimmerData,
    mandatoryColumnsObj.value,
    meetStartDate.value,
    meetEndDate.value,
    meetName.value,
    meetOrganiserDetails.value
  );

  submitted.value = true;

  // in production we'll be returning sd3str
  return true;
};

function clearForm() {
  reset("convertForm");
}

watch(meetOrganiserCode, () => {
  meetOrganiserDetails.value = meetConfig.getOrganiserByCode(
    meetOrganiserCode.value
  );
});
</script>

<template>
  <div class="text-sm">
    <FormKit
      type="form"
      :ignore="false"
      :config="{ validationVisibility: 'dirty' }"
      @submit="handleSubmit"
      :actions="false"
      id="convertForm"
      form-class="grid grid-cols-12 gap-4"
    >
      <template #default="{ state }">
        <h1 class="col-start-2 col-span-6 font-semibold mb-2">Instructions</h1>
        <p class="col-start-2 col-span-6 text-sm mb-8">
          Open the downloaded scv file in a plain text editor. Copy all contents
          of the file and paste them to the input below.
        </p>

        <FormKit
          type="date"
          label="Event Date"
          v-model="meetStartDate"
          placeholder="Event date"
          validation="required|date"
          name="meet-date"
          outer-class=" col-start-2 col-span-4 "
        />
        <FormKit
          type="text"
          label="Meet Name"
          name="meet-name"
          v-model="meetName"
          placeholder="Enter the name of the meet"
          validation="required|length:3"
          outer-class="col-start-7 col-span-4 "
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
          outer-class="col-start-2 col-span-9 "
        />
        <FormKit
          type="textarea"
          label="Input"
          placeholder="Paste your data here"
          validation="string"
          name="convert-area"
          wrapper-class="$reset max-w-full w-full"
          inner-class="$reset formkit-disabled:bg-gray-200 formkit-disabled:cursor-not-allowed formkit-disabled:pointer-events-none flex rounded mb-1 ring-1 ring-gray-400 focus-within:ring-blue-500 [&>label:first-child]:focus-within:text-blue-500 max-w-full w-full"
          outer-class="col-start-2 col-span-9"
        />
        <div class="col-start-2 col-span-8 flex gap-4 mb-4">
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

        <transition name="fade">
          <!--            v-if="submitted"-->
          <CodeOutput
            border="thin"
            spacing="thin"
            :status="submitted"
            :output="sd3Str"
            class="col-start-1 col-span-full"
          >
            <template #title>SD3 File Content</template>
          </CodeOutput>
        </transition>
        <div class="col-start-1 col-span-full">
          <!--          {{ state }}-->
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
