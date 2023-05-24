export function raceSchema() {
  return [
    {
      $formkit: "checkbox",
      label: "Junior Events",
      help: "Please select maximum of 4 events, plus relay if applicable",
      classes: {
        outer: {
          "col-span-full": true,
        },
        fieldset: {
          $reset: true,
          border: true,
          "p-10": true,
          "px-4": true,
          "pb-1": true,
          "py-4": true,
          "border-gray-400": true,
          rounded: true,
        },
        options: {
          flex: true,
          "flex-wrap": true,
        },
        option: {
          $reset: true,
          "w-1/2": true,
          "my-2": true,
        },
        help: {
          "py-2": true,
        },
      },

      options: [
        { value: "25bk", label: "25m Back" },
        { value: "25fr", label: "25m Free" },
        { value: "12bk", label: "12m Back" },
        { value: "25br", label: "25m Breast" },
        { value: "12fr", label: "12m Free" },
        { value: "25fl", label: "25m Fly" },
        { value: "50fr", label: "50m Free" },
        { value: "50br", label: "50m Breast" },
        { value: "50bk", label: "50m Back" },
        { value: "100im", label: "100m IM" },
      ],
      validation: "required|max:4",
      validationVisibility: "dirty",
    },
  ];
}
