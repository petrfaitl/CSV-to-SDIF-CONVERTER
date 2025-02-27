<script setup>
  import {reset} from "@formkit/core";

  import {meetConfig} from "~/schemas/eventInfo";
  import {createEvent} from "~/services/createEvent";
  import {getDataRows} from "~/utils/utilFunctions";
  import {makeFilename} from "~/utils/utilFunctions";
  // import { ClipboardIcon } from "@heroicons/vue/24/outline";

  const submitted = ref(false);

  const meetName = ref("A Club Night");
  const meetStartDate = ref(""); //"2023-06-24"
  const meetEndDate = meetStartDate;
  const meetOrganiserCode = ref("");

  const meetOrganiserDetails = ref({});

  const meetData = ref("");
  const meetHeader = ref("");
  const csvSchema = ref(["teamCode","firstName","lastName", "dob", "gender","events","entryTimes", "schoolYear"]);


  const mandatoryColumnsObj = ref([
    {key: "teamCode", index: 0},
    {key: "firstName", index: 1},
    {key: "lastName", index: 2},
    {key: "dob", index: 3},
    {key: "gender", index: 4},
    {key: "events", index: 5},
    // {key: "eventCount", index: 6},
    {key: "entryTimes", index: 6},
    {key:"schoolYear", index:7}
  ]);
  const sd3Str = ref("");

  const handleSubmit = (data) => {
    meetData.value = data["convert-area"];

    const swimmerData = getDataRows(meetData.value);
    //console.log(swimmerData);

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

  function downloadFile() {
    if (sd3Str.value) {
      const blob = new Blob([sd3Str.value], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      const fileName = makeFilename(meetName.value+"-"+meetStartDate.value);
      link.download = fileName || "meet-data.sd3"; // File name with .sd3 extension
      link.click();
      // console.log(sd3Str.value);
      URL.revokeObjectURL(link.href);
    } else {
      console.error("sd3Str is empty. Cannot download the file.");
    }
  }


  function clearForm() {
    submitted.value = false;
    reset("convertForm");
    sd3Str.value = "";
  }

  onMounted(() => {
    meetOrganiserCode.value = "LVW";
    meetStartDate.value = new Date().toISOString()
                                    .split('T')[0];

  });
  watch(meetOrganiserCode, () => {
    meetOrganiserDetails.value = meetConfig.getOrganiserByCode(
        meetOrganiserCode.value
    );

  });
  // watch(csvSchema, ()=>{
  //   console.log(csvSchema.value);
  // })
</script>

<template>
  <div class="text-sm w-full max-w-4xl">
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
            label="Meet Date"
            v-model="meetStartDate"
            placeholder="Meet date"
            validation="required|date"
            name="meet-date"
            inner-class="bg-white ring-slate-900/10"
            outer-class="col-start-1 col-span-6"
        />
        <FormKit
            type="text"
            label="Meet Name"
            name="meet-name"
            v-model="meetName"
            placeholder="Enter meet name"
            validation="required|length:3"
            inner-class="bg-white ring-slate-900/10"
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
            inner-class="bg-white ring-slate-900/10"
            selectIcon-class="$reset formkit-select-icon flex p-[3px] shrink-0 w-5 mr-2 -ml-[1.5em] pointer-events-none formkit-icon"
            outer-class="col-start-1 col-span-9 "
        />
        <FormKit
            type="checkbox"
            v-model="csvSchema"
            label="Required and Optional Columns in CSV data"
            fieldset-class="$reset border-none"
            legend-class="$reset font-bold text-sm"
            help-class="$reset mb-3 mt-1.5 text-gray-500 text-xs"
            outer-class="col-start-1 col-span-12 disabled:opacity-100"
            options-class="flex flex-wrap gap-3"
            option-class="px-3 flex-grow-1 w-32"
            label-class="$reset flex flex-col"
            inner-class="ring-slate-900/10 formkit-disabled:text-slate-700 rounded mb-1 ring-1 ring-gray-400 focus-within:ring-blue-500 [&>label:first-child]:focus-within:text-blue-500 "
            wrapper-class="$reset max-w-full w-full"
            help="Your data must contain required and optional columns in your csv. Please select optional columns that you would like to import."
            :option-class="(option)=>option.attrs.disabled ? 'required-field':'optional-field'"
            :options="[
                {value:'teamCode',
                prefix:'1',
                label:'Team Code',
                help: 'Three digit code of your team (required)',
                attrs: {disabled:true, position:0}
                },
                {value:'firstName',
                prefix: 2,
                label:'First Name',
                help: '(required)',
                attrs: {disabled:true, position:1}
                },
                {value:'lastName',
                label:'Last Name',
                help: '(required)',
                attrs: {disabled:true, position:2}
                },
                {value:'dob',
                label:'Date of Birth',
                help: 'DD/MM/YY (required)',
                attrs: {disabled:true, position:3}
                },
                {value:'gender',
                label:'Gender',
                help: 'Male/Female (required)',
                attrs: {disabled:true, position:4}
                },
                {value:'events',
                label:'Events',
                help: 'list of comma separated events (required)',
                attrs: {disabled:true, position:5}
                },

                {value:'entryTimes',
                label:'Entry Times',
                help: 'list of comma separated entry times or NT (optional)',
                attrs: {position:6}
                },
                {value:'schoolYear',
                label:'School Year',
                help: 'school year or class e.g Y8 [2 characters] (optional)',
                attrs: {position:7}
                },

            ]"
          />

        <FormKit
            type="textarea"
            label="CSV Data"
            auto-height
            placeholder="Paste your data here"
            validation="string|required"
            name="convert-area"
            wrapper-class="$reset max-w-full w-full"
            inner-class="$reset bg-white ring-slate-900/10 min-h-64 formkit-disabled:bg-gray-200 formkit-disabled:cursor-not-allowed formkit-disabled:pointer-events-none flex rounded mb-1 ring-1 ring-gray-400 focus-within:ring-blue-500 [&>label:first-child]:focus-within:text-blue-500 max-w-full w-full"
            outer-class="col-start-1 col-span-12"
        />

        <div class="col-start-1 col-span-full flex gap-4 mb-1">
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


          <FormKit
              type="button"
              :disabled="!submitted"
              name="download-button"
              @click="downloadFile"
              label="Download file"
              input-class="$reset form-btn btn-secondary"
          >
          </FormKit>

        </div>
      </template>
    </FormKit>
  </div>
  <div class="section w-full mt-3">
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

.formkit-messages{
  display: block;
  width: max-content;
}

li.formkit-option[data-disabled="true"]{
  opacity:60%;
}






</style>
