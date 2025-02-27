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

/**
 * Takes raw csv data and processes entries, returns sd3 formatted text string
 *
 */
export const createEvent = (
  swimmerData: string,
  headerColumns: [{ key: string; index: number }],
  meetStartDate: string,
  meetEndDate: string,
  meetName: string,
  meetOrganiserDetails: object
) => {
  /**
   * Object to capture all output records
   */
  const output: {
    z0Record: string;
    dRecords: any;
    c1Records: any;
    a0Record: string;
    b1Record: string;
  } = {
    a0Record: "",
    b1Record: "",
    dRecords: {},
    c1Records: {},
    z0Record: "",
  };

  let c1Teams = [];

  // Output String
  let sdifStr: string = "";

  //destructure incoming data
  const { meetAddress, meetCity, meetPostcode, meetState }: any =
    meetOrganiserDetails;

  // Creates an Array of Arrays of all data separated records by line breaks; erroneous characters are removed
  const separatedRecords: string[][] = separateAndCleanRecords(swimmerData);
  // console.log(separatedRecords);

  // Array contains only required data for building Swimmer Record
  const swimmerEventRecords: object[] = filterAndNameColumns(
    separatedRecords,
    headerColumns
  );
  console.log(swimmerEventRecords);


  /**
   * Push a0, b1 and z record to an object variable
   */
  output.a0Record = emitA0Record();
  output.b1Record = emitB1Record(
    meetName,
    meetStartDate,
    meetEndDate,
    meetAddress,
    meetCity,
    meetPostcode,
    meetState
  );
  output.z0Record = emitZ0Record();

  /**
   * Loops over all swimmer records
   */

  swimmerEventRecords.forEach((swimmerRecord : Object) => {
    const { individualEventRecords, teamCode, teamLSC, teamName } = createSwimmerRecords(
      swimmerRecord,
      meetStartDate
    );

    // Test if teamCode in dRecords
    if (!Object.hasOwn(output.dRecords, teamCode)) {
      // Add teamCode empty array to dRecords
      Object.assign(output.dRecords, { [teamCode]: [] });

      // Adds teamCode empty string to c1Records
      Object.assign(output.c1Records, { [teamCode]: "" });
      output.c1Records[teamCode] = emitC1Record({
        teamCode,
        teamLSC,
        teamName,
      });

      // c1Teams.push(teamCode);
    }
    // Adds swimmer d0 records and d1 record to array
    output.dRecords[teamCode].push(individualEventRecords);
  });

  const buildSdifFile = () => {
    // Add a0 and b1 record to the initial string
    sdifStr = sdifStr.concat(output.a0Record, output.b1Record);

    c1Teams = Object.keys(output.c1Records);

    c1Teams.forEach((team) => {
      sdifStr = sdifStr.concat(output.c1Records[team]);
      const teamDRecords = output.dRecords[team].reduce(
        (accumulator: string, teamDRecords: string[]) => {
          const swimmerDRecord = teamDRecords.reduce(
            (accum: string, swimmerDRecords) => {
              return accum.concat(swimmerDRecords);
            },
            ""
          );

          return accumulator.concat(swimmerDRecord);
        },
        ""
      );

      sdifStr = sdifStr.concat(teamDRecords);
    });
    // console.log(teamDRecords);

    return sdifStr.concat(output.z0Record);
  };

  return { buildSdifFile };
};
