<script setup lang="ts">
import { useTeamDirectory, type Team } from '~/composables/useTeamDirectory';

const { getAllTeams, addTeam, removeTeam, customTeams } = useTeamDirectory();

const newTeam = ref({
  teamName: '',
  teamCode: '',
  lscCode: 'BP'
});

const submitNewTeam = () => {
  if (newTeam.value.teamName && newTeam.value.teamCode) {
    addTeam({
      teamName: newTeam.value.teamName,
      teamCode: newTeam.value.teamCode.toUpperCase(),
      lscCode: newTeam.value.lscCode.toUpperCase()
    });
    // Reset form
    newTeam.value = {
      teamName: '',
      teamCode: '',
      lscCode: 'BP'
    };
  }
};

const allTeams = computed(() => getAllTeams());
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Manage Teams</h1>

    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6 border dark:bg-neutral-800 dark:border-neutral-700">
      <h2 class="text-xl font-semibold mb-4">Add New Team</h2>
      <FormKit
        type="form"
        @submit="submitNewTeam"
        :actions="false"
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormKit
            type="text"
            label="Team Name"
            v-model="newTeam.teamName"
            validation="required"
            placeholder="e.g. My New Club"
          />
          <FormKit
            type="text"
            label="Team Code"
            v-model="newTeam.teamCode"
            validation="required|length:3,5"
            placeholder="e.g. MNC"
          />
          <FormKit
            type="text"
            label="LSC Code"
            v-model="newTeam.lscCode"
            validation="required|length:2,2"
            placeholder="e.g. BP"
          />
        </div>
        <div class="mt-4">
          <FormKit
            type="submit"
            label="Add Team"
          />
        </div>
      </FormKit>
    </div>

    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 border dark:bg-neutral-800 dark:border-neutral-700">
      <h2 class="text-xl font-semibold mb-4">Existing Teams</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-neutral-700 dark:text-gray-300 dark:border-neutral-600">
                Team Name
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-neutral-700 dark:text-gray-300 dark:border-neutral-600">
                Code
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-neutral-700 dark:text-gray-300 dark:border-neutral-600">
                LSC
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-neutral-700 dark:text-gray-300 dark:border-neutral-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="team in allTeams" :key="team.id">
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-neutral-800 dark:border-neutral-700">
                {{ team.teamName }}
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-neutral-800 dark:border-neutral-700">
                {{ team.teamCode }}
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-neutral-800 dark:border-neutral-700">
                {{ team.lscCode }}
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-neutral-800 dark:border-neutral-700">
                <button
                  v-if="customTeams.find(t => t.id === team.id)"
                  @click="removeTeam(team.id)"
                  class="text-red-600 hover:text-red-900"
                >
                  Remove
                </button>
                <span v-else class="text-gray-400 italic">Static</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="mt-6">
      <NuxtLink to="/" class="text-blue-600 hover:underline">Back to Converter</NuxtLink>
    </div>
  </div>
</template>
