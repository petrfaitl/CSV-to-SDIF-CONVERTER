import { generateClasses } from "@formkit/themes";
import genesis from "@formkit/themes/tailwindcss/genesis";

export default {
  theme: "genesis",
  config: {
    classes: generateClasses(genesis),
  },
};
