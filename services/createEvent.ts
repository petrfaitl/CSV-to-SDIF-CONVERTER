import {
  emitA0Record,
  emitB1Record,
  emitC1Record,
  emitZ0Record,
} from "~/composables/emitRecords";
import { sdifConst, teamCodes } from "~/schemas/eventInfo";
import {
  separateAndCleanRecords,
  filterAndNameColumns,
  getTeamName,
} from "~/utils/utilFunctions";
import { createSwimmerRecords } from "~/services/createSwimmer";

// Test record
// const swimmerEventRecord = {
//   fullName: "Faitl, Katherine",
//   MMNumber: "LVWKFZ100210",
//   dob: "2010-02-10",
//   gender: "F",
//   eventGender: "X",
//   eventDistance: "25",
//   eventStrokeCode: "1",
//   eventAge: "",
//   teamCode: teamCodes.lvwbp.lscCode + teamCodes.lvwbp.teamCode,
// };

export const csvData =
  '"Submission Time","Parent / Legal Guardian Name","Email Address",Phone,Team,"Name - First Name","Name - Middle Name","Name - Last Name","Date of Birth",Gender,"Meet Date","Enter events","Number of events","Available for time-keeping?","Helper\'s Name","Payment type","Entry Fee","Card Name","Address - Street Address","Address - Apartment, suite, etc","Address - City","Address - State/Province","Address - Postcode","Address - Country","Credit / Debit Card - Mode","Credit / Debit Card - Product / Plan Name","Credit / Debit Card - Payment type","Credit / Debit Card - Amount","Credit / Debit Card - Currency","Credit / Debit Card - Quantity","Credit / Debit Card - Transaction ID","Credit / Debit Card - Status","Credit / Debit Card - Manage",T&Cs\n' +
  '"Jun 7, 2023 @ 7:59 AM","Deborah Warn",jamiedeborah@xtra.co.nz,"\'+64 21 503 504\'",LVWBP,Jemma,,Warn,15/04/2013,Female,24/06/2023,"25m Back, 25m Fly, 50m Back, 100m IM",4,,,"Bank transfer","NZ$ 10.00",,,,checked\n' +
  '"Jun 6, 2023 @ 8:35 PM","Rebecca Morell",rmorell2010@gmail.com,"\'+64 21 245 3669\'",LVWBP,Ellie,,Morell,26/11/2014,Female,24/06/2023,"25m Back, 25m Free, 12m Back, 25m Breast",4,,,"Credit card","NZ$ 10.60","Rebecca Elizabeth Morell","26 Materawaho Way",,Tauranga,,3112,"New Zealand",live,"LVWA club night entry","One Time",10.60,NZD,1,pi_3NFvMBFC4Jqb2d060AvhYrlr,COMPLETED,,checked\n' +
  '"Jun 6, 2023 @ 7:50 PM","Marcela Harvey",marcela.harvey@hotmail.com,"\'+64 27 515 9229\'",LVWBP,Matias,Fraser,Harvey,05/06/2013,Male,24/06/2023,"25m Back, 25m Breast, 25m Fly, 50m Free",4,,,"Bank transfer","NZ$ 10.00",,,,checked\n' +
  '"Jun 6, 2023 @ 7:44 PM","Marcela Harvey",marcela.harvey@hotmail.com,"\'+64 27 515 9229\'",LVWBP,Santiago,Fraser,Harvey,15/01/2012,Male,24/06/2023,"25m Free, 25m Fly, 50m Free, 50m Breast",4,Yes,"Fraser Harvey","Bank transfer","NZ$ 10.00",,,,checked\n' +
  '"Jun 6, 2023 @ 7:18 PM","Abby Luke",info@ataahua.co.nz,"\'+64 21 762 217\'",LVWBP,Baz,,Luke,29/08/2013,Male,24/06/2023,"25m Back, 25m Free, 12m Back, 12m Free",4,,,"Bank transfer","NZ$ 10.00",,,,checked\n' +
  '"Jun 6, 2023 @ 6:30 PM","Yeojin,Choi",darkayo7@naver.com,"\'+64 27 264 1649\'",LVWBP,Ayoung,,Jang,30/05/2015,Female,24/06/2023,"25m Back, 25m Free, 12m Back, 12m Free",4,,,"Bank transfer","NZ$ 10.00",,,,checked\n' +
  '"Jun 6, 2023 @ 6:26 PM","Yeojin,Choi",darkayo7@naver.com,"\'+64 27 264 1649\'",LVWBP,Gain,,Jang,06/04/2013,Female,24/06/2023,"25m Back, 25m Free, 25m Breast, 50m Breast",4,,,"Bank transfer","NZ$ 10.00",,,,checked\n' +
  '"Jun 6, 2023 @ 6:01 PM","Mahala Meredith",mahalalouise@gmail.com,"\'+64 21 802 078\'",LVWBP,Elijah,,Meredith,21/07/2015,Male,24/06/2023,"25m Back, 25m Free, 12m Back, 12m Free",4,,,"Bank transfer","NZ$ 10.00",,,,checked\n' +
  '"Jun 6, 2023 @ 5:58 PM","Mahala Meredith",mahalalouise@gmail.com,"\'+64 21 802 078\'",LVWBP,Charlotte,,Meredith,05/10/2013,Female,24/06/2023,"25m Breast, 50m Free, 50m Breast, 100m IM",4,,,"Bank transfer","NZ$ 10.00",,,,checked\n' +
  '"Jun 6, 2023 @ 5:07 PM","Anna Opie",theopies@hotmail.com,"\'+64 274 279 921\'",LVWBP,Heidi,Esther,Opie,04/09/2014,Female,24/06/2023,"25m Back, 25m Free, 25m Breast",3,,,"Credit card","NZ$ 10.60","Anna L M Opie","24 Springwater Lane",,Tauranga,,3112,"New Zealand",live,"LVWA club night entry","One Time",10.60,NZD,1,pi_3NFs74FC4Jqb2d060TxjgOA2,COMPLETED,,checked\n' +
  '"Jun 6, 2023 @ 11:20 AM","Jessica Lawson",jessica@cintesi.co.nz,"\'+64 27 283 7384\'",LVWBP,Charlotte,,Lawson,02/12/2015,Female,24/06/2023,"25m Back, 25m Breast, 25m Fly, 50m Free",4,,,"Credit card","NZ$ 10.60","Jessica Lawson","1 Grace Road",Tauranga,"Tauranga South",,3110,"New Zealand",live,"LVWA club night entry","One Time",10.60,NZD,1,pi_3NFmhJFC4Jqb2d061NeyL2ta,COMPLETED,,checked\n' +
  '"Jun 6, 2023 @ 11:18 AM","Jessica Lawson",jessica@cintesi.co.nz,"\'+64 27 283 7384\'",LVWBP,Frank,,Lawson,13/12/2013,Male,24/06/2023,"25m Back, 25m Breast, 25m Fly, 50m Free",4,,,"Credit card","NZ$ 10.60","Jessica Lawson","1 Grace Road",Tauranga,"Tauranga South",,3110,"New Zealand",live,"LVWA club night entry","One Time",10.60,NZD,1,pi_3NFmfSFC4Jqb2d0615rEzCPl,COMPLETED,,checked\n' +
  '"Jun 5, 2023 @ 8:23 PM","Mulliga Khotsetthee",mulliga.1981@gmail.com,0276968179,,Ally,,Burfoot,11/07/2012,Female,24/06/2023,"25m Free, 25m Breast, 50m Breast",3,,,"Bank transfer","NZ$ 10.00",,,,checked\n' +
  '"Jun 5, 2023 @ 8:04 PM","Elles Pearse-Danker",ellespd@gmail.com,02108870988,EVOBP,Jasper,,Pearse-Danker,02/05/2013,Male,24/06/2023,"25m Back, 25m Free, 50m Free, 50m Back",4,Yes,"Elles Pearse-Danker - or can be IOT","Bank transfer","NZ$ 10.00",,,,checked';

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

  // Array contains only required data for building Swimmer Record
  const swimmerEventRecords: object[] = filterAndNameColumns(
    separatedRecords,
    headerColumns
  );

  // Replace with loop

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

  swimmerEventRecords.forEach((swimmerRecord: any) => {
    const { individualEventRecords, teamCode, teamLSC } = createSwimmerRecords(
      swimmerRecord,
      meetStartDate
    );
    const teamName: string = getTeamName(teamCode + teamLSC);

    // Test if teamCode in dRecords
    if (!Object.hasOwn(output.dRecords, teamCode)) {
      // Add teamCode empty array to dRecords
      Object.assign(output.dRecords, { [teamCode]: [] });

      // Adds teamCode empty string to c1Records
      Object.assign(output.c1Records, { [teamCode]: "" });
      output.c1Records[teamCode] = emitC1Record(teamCode, teamName);

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
