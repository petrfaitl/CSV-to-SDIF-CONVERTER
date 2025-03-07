import {
  emitA0Record,
  emitB1Record,
  emitC1Record,
  emitZ0Record,
} from "~/services/emitRecords";
import {
  separateAndCleanRecords,
  filterAndNameColumns
} from "~/utils/utilFunctions";
import { createSwimmerRecords } from "~/services/createSwimmer";

interface MeetOrganiserDetails {
  meetAddress?: string;
  meetCity?: string;
  meetPostcode?: string;
  meetState?: string;
}

/**
 * Takes raw csv data and processes entries, returns sd3 formatted text string
 *
 */

// Enhanced version of createSwimEvent
export const createSwimEvent = (
  swimmerData: string,
  headerColumns: { key: string; index: number }[],
  meetStartDate: string,
  meetEndDate: string,
  meetName: string,
  meetOrganiserDetails: MeetOrganiserDetails
) => {
  interface Output {
    z0Record: string;
    a0Record: string;
    b1Record: string;
    dRecords: Record<string, string[]>; // teamCode -> list of records
    c1Records: Record<string, string>; // teamCode -> C1 record string
  }

  const output: Output = {
    a0Record: "",
    b1Record: "",
    z0Record: "",
    dRecords: {},
    c1Records: {},
  };

  const { meetAddress, meetCity, meetPostcode, meetState } = meetOrganiserDetails || {};

  const separatedRecords: string[][] = separateAndCleanRecords(swimmerData);
  if (!separatedRecords || separatedRecords.length === 0) {
    throw new Error("No records found in the provided swimmer data.");
  }

  const swimmerEventRecords: Record<string, any>[] = filterAndNameColumns(
    separatedRecords,
    headerColumns
  );

  output.a0Record = emitA0Record();
  output.b1Record = emitB1Record(
    meetName,
    meetStartDate,
    meetEndDate,
    meetAddress || "",
    meetCity || "",
    meetPostcode || "",
    meetState || ""
  );
  output.z0Record = emitZ0Record();

  swimmerEventRecords.forEach((swimmerRecord) => {
    const swimmerData = createSwimmerRecords(swimmerRecord, meetStartDate);

    if (!swimmerData || !swimmerData.teamCode) {
      console.warn(`Skipping swimmer record due to missing teamCode: ${JSON.stringify(swimmerRecord)}`);
      return;
    }

    const { individualEventRecords, teamCode, teamLSC, teamName } = swimmerData;

    if (!output.dRecords[teamCode]) {
      output.dRecords[teamCode] = [];
      output.c1Records[teamCode] = emitC1Record({ teamCode, teamLSC, teamName });
    }

    output.dRecords[teamCode].push(...individualEventRecords);
  });

  const buildSdifFile = () => {
    let sdifStr = output.a0Record + output.b1Record;

    const c1Teams = Object.keys(output.c1Records);
    c1Teams.forEach((team) => {
      sdifStr += output.c1Records[team];
      sdifStr += output.dRecords[team].flatMap((records) => records).join("");
    });

    return sdifStr + output.z0Record;
  };

  return { buildSdifFile };
};

