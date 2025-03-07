import strokes from '@/schemas/swimming_stroke_codes.json';
import teamCodes from '@/schemas/swimming_team_directory.json';


export const toFixedLength = function (
  value: string,
  length: number,
  // padCharacter = " "
) {
  if (value) {
    return value.toString().substring(0, length).padEnd(length);
  }
  return "".padEnd(length);
};

export const getDateMMDDYYYY = (dateStr = "") => {
  if (dateStr.includes("/")) {
    const [dayStr, monthStr, yearStr] = dateStr.split("/");
    dateStr = yearStr + "-" + monthStr + "-" + dayStr;
  }
  const currentDate = dateStr ? new Date(dateStr) : new Date();

  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const year = currentDate.getFullYear().toString();

  return month + day + year;
};

const getDateMMDDYY = (dateStr: string) => {
  const [dayStr, monthStr, yearStr] = dateStr.split("/");
  dateStr = yearStr + "-" + monthStr + "-" + dayStr;
  const currentDate = new Date(dateStr);

  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const year = currentDate.getFullYear().toString().substring(2, 4);

  return month + day + year;
};

const getDateDDMMYY = (dateStr: string) => {
  const [dayStr, monthStr, yearStr] = dateStr.split("/");
  dateStr = yearStr + "-" + monthStr + "-" + dayStr;
  const currentDate = new Date(dateStr);

  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const year = currentDate.getFullYear().toString().substring(2, 4);

  return day + month + year;
};

/**
 *
 * @param dob as YYYY-MM-DD or DD/MM/YYYY
 */
export const getSwimmerAge = (dob: string) => {
  const today = Date.parse(new Date().toString());
  let dobDate;
  if (dob.includes("/")) {
    const [dd, mm, yyyy] = dob.split("/");
    dobDate = Date.parse(yyyy + "-" + mm + "-" + dd);
  } else {
    dobDate = Date.parse(new Date(dob).toString());
  }

  const msDiff = today - dobDate;

  let seconds = Math.round(msDiff / 1000);
  let minutes = Math.trunc(seconds / 60);
  let hours = Math.trunc(minutes / 60);
  let days = Math.trunc(hours / 24);
  let years = Math.trunc(days / 365);

  // seconds = seconds % 60;
  // minutes = minutes % 60;
  // hours = hours % 24;
  // days = days % 365;
  years = years % 365;

  return years.toString();
};

export const getTeamRecord = (teamStr: string) => {
  // Normalize the input team identifier
  const normalizedTeam = teamStr.toLowerCase().trim();

  // Search for the team record or fall back to the default undefined record
  return (
    teamCodes.find(t => t.id === normalizedTeam) ||
    teamCodes.find(t => t.id === "undefined")
  );
};



export const getFullName = (firstName: string, lastName: string) =>
  lastName + ", " + firstName;

export const getMMNumber = (swimmerRecord: {
  teamCode?: string;
  teamLSC?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  middleName?: string;
}): string => {
  // Validate the swimmerRecord parameter


  const {
    teamCode,
    firstName,
    lastName,
    dob,
    middleName = "Z", // Default middle initial to 'Z' if not provided
  } = swimmerRecord;



  // Ensure middleName is a single letter (if provided), or default to "Z"
  const middleInitial = middleName?.[0]?.toUpperCase() || "Z";

  // Get the team information
  const teamRecord = getTeamRecord(teamCode || "undefined");
  const resolvedTeamCode = teamRecord?.teamCode ?? "UNS";

  try {
    // Generate the MM number using the resolved data
    return (
      resolvedTeamCode +
      lastName[0].toUpperCase() + // Take the first letter of the last name
      firstName[0].toUpperCase() + // Take the first letter of the first name
      middleInitial +
      getDateDDMMYY(dob) // Format date in DDMMYY format
    );
  } catch (error) {
    console.error("Error generating MM number:", error);
    return null;
  }
};


interface StrokeCodeResponse {
  code: string | null;
  isValid: boolean;
  validationErrorMessage?: string;
}

/**
 * Gets the stroke code based on the stroke name.
 * Normalizes input to lowercase before lookup.
 *
 * @param {string} strokeName - The name (or alternative name) of the stroke.
 * @returns {StrokeCodeResponse} - An object containing the stroke code, validation status,
 * and a validation error message if not found.
 */
export function getStrokeCode(strokeName: string): StrokeCodeResponse {
  if (!strokeName || typeof strokeName !== 'string') {
    return {
      code: null,
      isValid: false,
      validationErrorMessage: 'Invalid input: stroke name must be a non-empty string.',
    };
  }

  const normalizedStrokeName = strokeName.toLowerCase();
  const code = (strokes as Record<string, number>)[normalizedStrokeName];

  if (code !== undefined) {
    return {
      code: code.toString(),
      isValid: true,
    };
  } else {
    return {
      code: null,
      isValid: false,
      validationErrorMessage: `Stroke name "${strokeName}" is not recognized. Please provide a valid stroke name.`,
    };
  }
}

interface DistanceAndStrokeCodeResponse {
  eventDistance: string;
  eventStrokeCode: string | null;
  isValid: boolean;
  validationErrorMessage: string | null;
}

/**
 * Parses a given distance and stroke input string (e.g., "25m Back")
 * to extract event distance and stroke code, with validation.
 *
 * @param {string} distanceStroke - A string representing distance and stroke, e.g., "25m Back".
 * @returns {object} An object containing `eventDistance`, `eventStrokeCode`, `isValid`, and `validationErrorMessage`.
 */

export const getDistanceAndStrokeCode = (distanceStroke: string): DistanceAndStrokeCodeResponse => {
  if (!distanceStroke || typeof distanceStroke !== "string") {
    return {
      eventDistance: "",
      eventStrokeCode: null,
      isValid: false,
      validationErrorMessage: "Distance and Stroke not given",
    };
  }

  const cleanedInput = cleanEntry(distanceStroke).trim();
  const [distance, stroke] = cleanedInput.split(" ");

  if (!distance || !distance.endsWith("m") || distance.startsWith("m") || !stroke) {
    return {
      eventDistance: "",
      eventStrokeCode: null,
      isValid: false,
      validationErrorMessage: "Invalid distance format. Expected format: '<distance>m <stroke>'",
    };
  }

  const eventDistance = distance.slice(0, -1);
  const eventStrokeResponse = getStrokeCode(stroke);

  return {
    eventDistance,
    eventStrokeCode: eventStrokeResponse.code,
    isValid: eventStrokeResponse.isValid,
    validationErrorMessage: eventStrokeResponse.validationErrorMessage || null,
  };
};


/**
 * Separates string separated by line breaks into an array of array (header and swimmer) records
 * @param data
 */
export const separateAndCleanRecords = (data: string): string[][] => {
  const arr: string[] = data.split("\n");

  return arr.map((el: string) => {
    const separatedArr: string[] = splitStringOnComma(el);
    return separatedArr.map((el) => {
      return cleanEntry(el);
    });
  });
};

/**
 * Function to prepare entry time into a fixed 8-digit format or return "NT" for invalid inputs.
 * @param {string} entryTime - The input time in MM:SS.ss, SS.ss, or NT formats.
 * @returns {string} - The cleaned and formatted time as an 8-character string MM:SS.ss, or "NT" for invalid entries.
 */
export const prepareSeedTime = (entryTime: string): string => {

  try {
    // Clean the entry time (remove unwanted characters)
    entryTime = cleanEntry(entryTime, ["[^0-9.:]"]);

    // Return "NT" for invalid or empty entry
    if (!entryTime || entryTime === "NT" || entryTime.startsWith("NT")) {
      return "NT";
    }

    // Split the entryTime into minutes and seconds
    let [minutes, seconds] = entryTime.split(":");

    if (!seconds) {
      // If seconds only is provided, treat it as `SS.ss` and pad the minutes as "00"
      seconds = minutes; // Assume the entire time is in the "seconds" position
      minutes = "00";
    }

    // Pad the minutes and seconds to ensure proper formatting
    minutes = minutes.padStart(2, "0");
    seconds = parseFloat(seconds).toFixed(2).padStart(5, "0");

    // Return the properly formatted time
    return `${minutes}:${seconds}`;
  } catch (error) {
    // If anything fails, return "NT"
    return "NT";
  }
};



/**
 * Splits a string on commas but ignores commas that are preceded or followed by quotes.
 * @param str
 */
export const splitStringOnComma = (str: string): string[] => {
  const regex = /,(?=(?:[^"]|"[^"]*")*$)/g;

  const newArr = str.split(regex);

  //trims white space
  return newArr.map((el) => {
    if (el === "") {
      return el;
    }

    // console.log(el);
    return el.trim();
  });
};

/**
 * Replaces undesired character out of string
 * @param str - string to be cleaned
 * @param replacements - array of replacements
 */
export const cleanEntry = (
  str: string,
  replacements: string[] = ['["\\\n]']
): string => {
  // console.log("dirty string",str);
  // str = str.trim();
  if (typeof str !== "string") {
    throw new TypeError("The first argument 'str' must be a string.");
  }
  if (!Array.isArray(replacements) || !replacements.every(el => typeof el === "string")) {
    throw new TypeError("The 'replacements' argument must be an array of strings.");
  }

  // Create a single regex dynamically using the replacement characters
  const regex = new RegExp(`${replacements.join("")}`, "g");
  // console.log("applied regex",regex);

  // Return cleaned string using the regex
  return str.replace(regex, "");
};


/**
 * Filters array of entry data; returns array with indicated columns. These will be mandatory data for further building of sd3 file
 * @param arr List of separated rows of data
 * @param columnIndices Header names and positions
 */
export const filterAndNameColumns = (
  arr: string[][],
  columnIndices: [{ key: string; index: number }]
) => {
  return arr.map((row: string[]) => {
    const filteredArr = row.filter((_, idx) => {
      for (const {index} of columnIndices) {
        if (idx === index) {
          return true;
        }
      }
    });

    return filteredArr.reduce((accumulator, el, index) => {
      return {...accumulator, [columnIndices[index]["key"]]: el};
    }, {});
  });
};

/**
 * Pauses execution for set amount of time in millis; async function must be awaited
 * @param ms
 */
export async function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Extracts the header row from submitted data
 * @param rawData
 * @return Header row as string
 */
export const getHeaderRow = (rawData: string) => {
  return rawData.slice(0, rawData.indexOf("\n"));
};

/**
 * Extracts the data row from submitted data
 * @param rawData
 * @return Data row as string
 */
export const getDataRows = (rawData: string) => {
  return rawData.slice(rawData.indexOf("\n") + 1);
};


export const makeFilename = (string: string) => {
  return (string.replace(/[\/|\\:*?"<>' ]/g, "-").toLowerCase()+".sd3");
}

