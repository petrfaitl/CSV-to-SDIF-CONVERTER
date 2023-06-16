import { teamCodes, strokeCodes } from "@/schemas/eventInfo";

export const toFixedLength = function (
  value: string,
  length: number,
  padCharacter = " "
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

export const getTeamCode = (teamStr: string) => {
  let team: string = teamStr.toLowerCase();

  // @ts-ignore
  return teamCodes[team]?.teamCode ?? teamCodes["undefined"].teamCode;
};

export const getLSCCode = (teamStr: string) => {
  let team: string = teamStr.toLowerCase();

  // @ts-ignore
  return teamCodes[team]?.lscCode ?? teamCodes["undefined"].lscCode;
};
export const getTeamName = (teamCode: string): string => {
  let team: string = teamCode.toLowerCase();
  // @ts-ignore
  return teamCodes[team]?.teamName ?? teamCodes["undefined"].teamName;
};

export const getFullName = (firstName: string, lastName: string) =>
  lastName + ", " + firstName;

export const getMMNumber = (swimmerRecord: {
  teamCode: string;
  firstName: string;
  lastName: string;
  dob: string;
  middleName: string;
}) => {
  const middleName = swimmerRecord.middleName?.length
    ? swimmerRecord.middleName[0]
    : "Z";
  return (
    swimmerRecord.teamCode.substring(0, 2) +
    swimmerRecord.lastName[0] +
    swimmerRecord.firstName[0] +
    middleName +
    getDateMMDDYY(swimmerRecord.dob)
  );
};

/**
 *
 * @param distanceStroke string  A string e.g. 25m Back
 */
export const getDistanceAndStrokeCode = (distanceStroke: string) => {
  distanceStroke = distanceStroke.trim();
  const [distance, stroke] = distanceStroke.split(" ");
  const eventDistance = distance.replace("m", "");
  // @ts-ignore
  const eventStrokeCode = strokeCodes.strokes[stroke.toLowerCase()].toString();
  return { eventDistance, eventStrokeCode };
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
 * Splits a string on commas but ignores commas that are preceded or followed by quotes.
 * @param str
 */
export const splitStringOnComma = (str: string): string[] => {
  const regex = /,(?=(?:[^"]|"[^"]*")*$)/g;
  const newArr = str.split(regex);
  //trims white space
  return newArr.map((el) => {
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
  replacements: string[] = ['"', "\\"]
): string => {
  replacements.forEach((el: string) => {
    str = str.replaceAll(el, "");
  });
  return str;
};

/**
 * Filters array of entry data; returns array with indicated columns. These will be mandatory data for further building of sd3 file
 * @param arr
 * @param columnIndices
 */
export const filterAndNameColumns = (
  arr: string[][],
  columnIndices: [{ key: string; index: number }]
) => {
  return arr.map((row: string[]) => {
    const filteredArr = row.filter((_, idx) => {
      for (const { index } of columnIndices) {
        if (idx === index) {
          return true;
        }
      }
    });

    return filteredArr.reduce((accumulator, el, index) => {
      return { ...accumulator, [columnIndices[index]["key"]]: el };
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
 * Extracts the header row from submitted data
 * @param rawData
 * @return Header row as string
 */
export const getDataRows = (rawData: string) => {
  return rawData.slice(rawData.indexOf("\n") + 1, -1);
};
