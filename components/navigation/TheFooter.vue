<script lang="ts" setup>
</script>

<template>
  <footer
    class="bg-footer-image bg-blend-multiply bg-gray-500 bg-cover px-8 md:px-12 py-12"
  >
    <h4 class="mx-auto text-white text-4xl font-extralight">
      <span class="text-4xl font-black text-primary uppercase"
        >Convert CSV form entries</span
      >
      for Meet Manager
    </h4>
    <h5 class="text-white mt-4">
      Produce standard compliant SDIF (version 3.0) import files, compatible
      with MM7 and newer.
    </h5>
    <p class="text-white mt-4">Required format:</p>
    <div>
      <!-- Table title -->
      <h4 class="text-2xl mt-6 mb-4 text-primary">
        Entries Table
      </h4>
      <!-- Table display -->
      <table class="table-auto border-collapse border border-gray-400 mx-auto w-full md:w-10/12 text-sm">
        <thead>
        <tr class="bg-gray-900 text-gray-200">
          <th class="border border-gray-400 px-4 py-2 font-semibold">Team Code*</th>
          <th class="border border-gray-400 px-4 py-2 font-semibold">First Name*</th>
<!--          <th class="border border-gray-400 px-4 py-2 font-semibold">Middle Name (optional)</th>-->
          <th class="border border-gray-400 px-4 py-2 font-semibold">Last Name*</th>
          <th class="border border-gray-400 px-4 py-2 font-semibold">Date of Birth*</th>
          <th class="border border-gray-400 px-4 py-2 font-semibold">Gender*</th>
          <th class="border border-gray-400 px-4 py-2 font-semibold">Event Entries*</th>
          <th class="border border-gray-400 px-4 py-2 font-semibold">Entry Times</th>
          <th class="border border-gray-400 px-4 py-2 font-semibold">School Year/Class</th>
        </tr>
        </thead>
        <tbody class="bg-gray-800 text-gray-200">
        <tr>

          <td class="border border-gray-400 px-4 py-2">LVWBP</td>
          <td class="border border-gray-400 px-4 py-2">Anne</td>
<!--          <td class="border border-gray-400 px-4 py-2">Olivia</td>-->
          <td class="border border-gray-400 px-4 py-2">Bloggs</td>
          <td class="border border-gray-400 px-4 py-2">15/12/2015</td>
          <td class="border border-gray-400 px-4 py-2">Female</td>
          <td class="border border-gray-400 px-4 py-2">200m Breast, 25m Butterfly</td>
          <td class="border border-gray-400 px-4 py-2">2:35.12,NT</td>
          <td class="border border-gray-400 px-4 py-2">Y5</td>
        </tr>
        <tr>
          <td class="border border-gray-400 px-4 py-2">LVWBP</td>
          <td class="border border-gray-400 px-4 py-2">Boo</td>
<!--          <td class="border border-gray-400 px-4 py-2"></td>-->
          <td class="border border-gray-400 px-4 py-2">Another</td>
          <td class="border border-gray-400 px-4 py-2">01/11/2013</td>
          <td class="border border-gray-400 px-4 py-2">Male</td>
          <td class="border border-gray-400 px-4 py-2">50m Back, 100m Free</td>
          <td class="border border-gray-400 px-4 py-2">1:12.86,1:34.99</td>
          <td class="border border-gray-400 px-4 py-2">Y9</td>
        </tr>
        </tbody>
      </table>
    </div>



      <h4 class="text-2xl text-primary mt-6 mb-4">Items and Descriptions</h4>
      <ol class="text-sm list-decimal pl-8 text-gray-200 grid grid-flow-col grid-cols-3 grid-rows-5 md:grid-rows-3 gap-4 md:gap-8 ">
        <li class="mt-4 ">
          <strong>Team Code:</strong><br> The unique code identifying the team associated with the entry. Three digit code.<br><span class="font-semibold">Required</span>
        </li>
        <li class="mt-4 ">
          <strong>First Name:</strong><br> The first name of the individual participant. <br><span class="font-semibold">Required</span>
        </li>
        <li class="mt-4 ">
          <strong>Last Name:</strong><br> The last name of the individual participant. <br><span class="font-semibold">Required</span>
        </li>
        <li class="mt-4 ">
          <strong>Date of Birth:</strong><br> The participant's date of birth in the format <code>DD/MM/YYYY</code>. <br><span class="font-semibold">Required</span>
        </li>
        <li class="mt-4 ">
          <strong>Gender:</strong><br> The gender of the participant (e.g., Male, Female). <br><span class="font-semibold">Required</span>
        </li>
        <li class="mt-4 ">
          <strong>Event Entries:</strong><br> A list of events the participant is entered into (e.g., "200m Breast, 25m Butterfly"). <br><span class="font-semibold">Required</span>
        </li>
        <li class="mt-4 ">
          <strong>Entry Times:</strong><br> A list of participant's performance times for the events entered (e.g., "2:35.12, NT"). <br><span class="font-semibold">Optional</span>
        </li>
        <li class="mt-4 ">
          <strong>School Year/Class:</strong><br> The school year or class of the participant (e.g., "Y9"). Two digits only.<br><span class="font-semibold">Optional</span>
        </li>
      </ol>



    <h4 class="text-2xl mt-6 mb-4 text-primary">
      Sample Data
    </h4>

    <pre class="text-white text-xs">Team,"Name - First Name","Name - Last Name","Date of Birth",Gender,"Meet Date","Enter events","School Year"
   LVWBP,Anne,Bloggs,08/12/2015,Female,"200m Breast, 25m Butterfly","2:35.12,NT",Y5
   EVOBP,Boo,Another,01/11/2013,Male,"50m Back, 100m Free","1:12.86,1:34.99",Y9</pre>
  </footer>
</template>

<style scoped>
/* Optional: Table styling for responsiveness and appearance */
table {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

th,
td {
  text-align: left;
}


</style>

