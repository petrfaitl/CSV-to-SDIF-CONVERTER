import { sdifConst } from "~/schemas/eventInfo";
import "~/utils/utilFunctions";
import {
  toFixedLength,
  getSwimmerAge,
  getDateMMDDYYYY,
} from "~/utils/utilFunctions";

const createSchemaRecord = (
  schema: object,
  endOfLine: boolean = true
): string => {
  const EOL = "\r\n";
  return Object.keys(schema)
    .reduce((acc, key) => {
      // @ts-ignore
      return acc + toFixedLength(schema[key].value, schema[key].length);
    }, "")
    .concat(endOfLine ? EOL : "");
};

export const emitA0Record = () => {
  const a0Schema = {
    1: {
      start: 1,
      length: 2,
      required: true,
      type: "const",
      value: "A0",
      desc: "A0 record",
    },
    2: {
      start: 3,
      length: 1,
      required: true,
      type: "code",
      value: sdifConst.ORGCode001,
      desc: "Code 001 table",
    },
    3: {
      start: 4,
      length: 8,
      required: false,
      type: "code",
      value: "3.0",
      desc: "SDIF version",
    },
    4: {
      start: 12,
      length: 2,
      required: true,
      type: "code",
      value: sdifConst.FILECode003,
      desc: "Code 003 table",
    },
    5: {
      start: 14,
      length: 30,
      required: false,
      type: "alpha",
      value: "",
      desc: "future use",
    },
    6: {
      start: 44,
      length: 20,
      required: true,
      type: "alpha",
      value: "LVWASC SDIF Creator",
      desc: "Software name",
    },
    7: {
      start: 64,
      length: 10,
      required: true,
      type: "alpha",
      value: "v0.01",
      desc: "Software version",
    },
    8: {
      start: 74,
      length: 20,
      required: true,
      type: "alpha",
      value: "LVAWSC Recorder",
      desc: "contact name",
    },
    9: {
      start: 94,
      length: 12,
      required: true,
      type: "alpha",
      value: "079288822",
      desc: "contact phone",
    },
    10: {
      start: 106,
      length: 8,
      required: true,
      type: "date",
      value: getDateMMDDYYYY(),
      desc: "file creation or update MMDDYYYY",
    },
    11: {
      start: 114,
      length: 42,
      required: false,
      type: "alpha",
      value: "",
      desc: "future use",
    },
    12: {
      start: 156,
      length: 2,
      required: false,
      type: "alpha",
      value: "",
      desc: "submitted by LSC",
    },
    13: {
      start: 158,
      length: 3,
      required: false,
      type: "alpha",
      value: "",
      desc: "future use",
    },
  };
  const a0Record = createSchemaRecord(a0Schema);

  return a0Record;
};

export const emitB1Record = (
  meetName: string,
  meetStartDate: string,
  meetEndDate: string,
  meetAddress: string,
  meetCity: string,
  meetPostCode: string,
  meetState: string
) => {
  const b1Schema = {
    1: {
      start: 1,
      length: 2,
      required: true,
      type: "const",
      value: "B1",
      desc: "B1 record",
    },
    2: {
      start: 3,
      length: 1,
      required: true,
      type: "code",
      value: sdifConst.ORGCode001,
      desc: "Code 001 table",
    },
    3: {
      start: 4,
      length: 8,
      required: false,
      type: "",
      value: "",
      desc: "future use",
    },
    4: {
      start: 12,
      length: 30,
      required: true,
      type: "alpha",
      value: meetName,
      desc: "Meet Name",
    },
    5: {
      start: 42,
      length: 22,
      required: false,
      type: "alpha",
      value: meetAddress,
      desc: "Meet address",
    },
    6: {
      start: 64,
      length: 22,
      required: false,
      type: "alpha",
      value: "",
      desc: "Meet address 2",
    },
    7: {
      start: 86,
      length: 20,
      required: true,
      type: "alpha",
      value: meetCity,
      desc: "Meet city",
    },
    8: {
      start: 106,
      length: 2,
      required: true,
      type: "alpha",
      value: meetState,
      desc: "Meet state",
    },
    9: {
      start: 108,
      length: 10,
      required: true,
      type: "alpha",
      value: meetPostCode,
      desc: "postcode",
    },
    10: {
      start: 118,
      length: 3,
      required: false,
      type: "code",
      value: sdifConst.COUNTRYCode004,
      desc: "Meet country Code 004",
    },
    11: {
      start: 121,
      length: 1,
      required: true,
      type: "code",
      value: sdifConst.MEETCode005,
      desc: "Meet code 005",
    },
    12: {
      start: 122,
      length: 8,
      required: true,
      type: "date",
      value: getDateMMDDYYYY(meetStartDate),
      desc: "meet start MMDDYYYY",
    },
    13: {
      start: 130,
      length: 8,
      required: true,
      type: "date",
      value: getDateMMDDYYYY(meetEndDate),
      desc: "meet end MMDDYYYY",
    },
    14: {
      start: 138,
      length: 4,
      required: false,
      type: "int",
      value: "0",
      desc: "altitude of pool",
    },
    15: {
      start: 142,
      length: 8,
      required: false,
      type: "",
      value: "",
      desc: "future use",
    },
    16: {
      start: 150,
      length: 1,
      required: false,
      type: "code",
      value: sdifConst.COURSECode013,
      desc: "course code 013",
    },
    17: {
      start: 151,
      length: 10,
      required: false,
      type: "",
      value: "",
      desc: "future use",
    },
  };
  const b1Record = createSchemaRecord(b1Schema);

  return b1Record;
};

export const emitC1Record = (orgRecord: {
  teamCode: string;
  teamLSC: string;
  teamName: string;
}) => {
  const c1Schema = {
    1: {
      start: 1,
      length: 2,
      required: true,
      type: "const",
      value: "C1",
      desc: "C1 record",
    },
    2: {
      start: 3,
      length: 1,
      required: true,
      type: "code",
      value: sdifConst.ORGCode001,
      desc: "Code 001 table",
    },
    3: {
      start: 4,
      length: 8,
      required: false,
      type: "",
      value: "",
      desc: "future use",
    },
    4: {
      start: 12,
      length: 6,
      required: true,
      type: "alpha",
      value: orgRecord.teamLSC + orgRecord.teamCode,
      desc: "Team Code",
    },
    5: {
      start: 18,
      length: 30,
      required: true,
      type: "alpha",
      value: orgRecord.teamName,
      desc: "Full Team Name",
    },
    6: {
      start: 48,
      length: 16,
      required: false,
      type: "alpha",
      value: "",
      desc: "Abbr team name",
    },
    7: {
      start: 64,
      length: 22,
      required: false,
      type: "alpha",
      value: "",
      desc: "Team address",
    },
    8: {
      start: 86,
      length: 22,
      required: false,
      type: "alpha",
      value: "",
      desc: "Team address 2",
    },
    9: {
      start: 108,
      length: 20,
      required: false,
      type: "alpha",
      value: "",
      desc: "Team city",
    },
    10: {
      start: 128,
      length: 2,
      required: false,
      type: "USPS",
      value: "",
      desc: "Team state",
    },
    11: {
      start: 130,
      length: 10,
      required: false,
      type: "alpha",
      value: "",
      desc: "Team postal code",
    },
    12: {
      start: 140,
      length: 3,
      required: false,
      type: "code",
      value: sdifConst.COUNTRYCode004,
      desc: "Team Country code",
    },
    13: {
      start: 143,
      length: 1,
      required: false,
      type: "code",
      value: "",
      desc: "Team region code",
    },
    14: {
      start: 144,
      length: 6,
      required: false,
      type: "",
      value: "",
      desc: "future use",
    },
    15: {
      start: 150,
      length: 1,
      required: false,
      type: "",
      value: "",
      desc: "opt 5th character teamcode",
    },
    16: {
      start: 151,
      length: 10,
      required: false,
      type: "",
      value: "",
      desc: "future use",
    },
  };
  const c1Record = createSchemaRecord(c1Schema);

  return c1Record;
};

// @ts-ignore
export const emitD0Record = (eventRecord: {
  fullName: string;
  MMNumber: string;
  dob: string;
  age:string;
  gender: string;
  eventGender?: string;
  eventDistance: string;
  eventStrokeCode: string;
  eventAge?: string;
  eventDate: string;
  seedTime?: string;
}) => {
  const d0Schema = {
    1: {
      start: 1,
      length: 2,
      required: true,
      type: "const",
      value: "D0",
      desc: " D0 record",
    },
    2: {
      start: 3,
      length: 1,
      required: true,
      type: "code",
      value: sdifConst.ORGCode001,
      desc: "Org code",
    },
    3: {
      start: 4,
      length: 8,
      required: false,
      type: "",
      value: "",
      desc: "future use",
    },
    4: {
      start: 12,
      length: 28,
      required: true,
      type: "name",
      value: eventRecord.fullName,
      desc: "Name of swimmer formatted as lastName, firstName",
    },
    5: {
      start: 40,
      length: 12,
      required: true,
      type: "alpha",
      value: eventRecord.MMNumber,
      desc: "Registration number 12 digits unique per file",
    },
    6: {
      start: 52,
      length: 1,
      required: false,
      type: "code",
      value: "",
      desc: "Attach code 016",
    },

    7: {
      start: 53,
      length: 3,
      required: false,
      type: "code",
      value: "",
      desc: "Citizen US code 009",
    },

    8: {
      start: 56,
      length: 8,
      required: true,
      type: "date",
      value: getDateMMDDYYYY(eventRecord.dob),
      desc: "Swimmer DOB",
    },
    9: {
      start: 64,
      length: 2,
      required: false,
      type: "alpha",
      value: eventRecord.age,
      desc: "Age or class (jnr, snr) ",
    },
    10: {
      start: 66,
      length: 1,
      required: true,
      type: "code",
      value: eventRecord.gender,
      desc: "Swimmer's gender",
    },
    11: {
      start: 67,
      length: 1,
      required: true,
      type: "code",
      value: eventRecord.eventGender || "X",
      desc: "Event's gender code",
    },
    12: {
      start: 68,
      length: 4,
      required: true,
      type: "int",
      value: eventRecord.eventDistance,
      desc: "Event distance",
    },
    13: {
      start: 72,
      length: 1,
      required: true,
      type: "code",
      value: eventRecord.eventStrokeCode,
      desc: "Event stroke code",
    },
    14: {
      start: 73,
      length: 4,
      required: false,
      type: "alpha",
      value: "",
      desc: "Event number",
    },
    15: {
      start: 77,
      length: 4,
      required: true,
      type: "code",
      value: eventRecord.eventAge || sdifConst.EVENTAGECode025,
      desc: "EVENT AGE Code 025, table checked",
    },
    16: {
      start: 81,
      length: 8,
      required: true,
      type: "alpha",
      value: getDateMMDDYYYY(eventRecord.eventDate),
      desc: "date of swim",
    },
    17: {
      start: 89,
      length: 8,
      required: false,
      type: "time",
      value: eventRecord.seedTime || "NT",
      desc: "Seed time",
    },
    18: {
      start: 97,
      length: 1,
      required: true,
      type: "code",
      value: sdifConst.COURSECode013,
      desc: "COURSE CODE 013 table",
    },
    19: {
      start: 98,
      length: 8,
      required: false,
      type: "time",
      value: "",
      desc: "prelim time",
    },
    20: {
      start: 106,
      length: 1,
      required: false,
      type: "code",
      value: "",
      desc: "COURSE CODE 013 table",
    },
    21: {
      start: 107,
      length: 8,
      required: false,
      type: "time",
      value: "",
      desc: "swim off time",
    },
    22: {
      start: 115,
      length: 1,
      required: false,
      type: "code",
      value: "",
      desc: "COURSE CODE 013 table",
    },
    23: {
      start: 116,
      length: 8,
      required: false,
      type: "time",
      value: "",
      desc: "finals time",
    },
    24: {
      start: 124,
      length: 1,
      required: false,
      type: "code",
      value: "",
      desc: "COURSE CODE 013 table",
    },
    25: {
      start: 125,
      length: 2,
      required: false,
      type: "int",
      value: "",
      desc: "prelim heat number",
    },
    26: {
      start: 127,
      length: 2,
      required: false,
      type: "int",
      value: "",
      desc: "prelim lane number",
    },
    27: {
      start: 129,
      length: 2,
      required: false,
      type: "int",
      value: "",
      desc: "finals heat number",
    },
    28: {
      start: 131,
      length: 2,
      required: false,
      type: "int",
      value: "",
      desc: "finals lane number",
    },
    29: {
      start: 133,
      length: 3,
      required: false,
      type: "int",
      value: "",
      desc: "prelim place ranking",
    },
    30: {
      start: 136,
      length: 3,
      required: false,
      type: "int",
      value: "",
      desc: "finals place ranking",
    },
    31: {
      start: 139,
      length: 4,
      required: false,
      type: "dec",
      value: "",
      desc: "points scored form finals",
    },
    32: {
      start: 143,
      length: 2,
      required: false,
      type: "code",
      value: "",
      desc: "EVENT TIME CLASS Code 014",
    },
    33: {
      start: 145,
      length: 1,
      required: false,
      type: "alpha",
      value: "",
      desc: "flight status of swimmer",
    },
    34: {
      start: 146,
      length: 15,
      required: false,
      type: "",
      value: "",
      desc: "future use",
    },
  };

  const d0Record: string = createSchemaRecord(d0Schema);

  return { d0Record };
};

export const emitD1Record = (swimmerRecord: {
  teamCode: string;
  teamLSC: string;
  fullName: string;
  MMNumber: string;
  dob: string;
  age: string;
  gender: string;
}) => {
  const d1Schema = {
    1: {
      start: 1,
      length: 2,
      required: true,
      type: "const",
      value: "D1",
      desc: " D1 record",
    },
    2: {
      start: 3,
      length: 1,
      required: true,
      type: "code",
      value: sdifConst.ORGCode001,
      desc: "Org code 001",
    },
    3: {
      start: 4,
      length: 8,
      required: false,
      type: "",
      value: "",
      desc: "future use",
    },
    4: {
      start: 12,
      length: 6,
      required: true,
      type: "code",
      value: swimmerRecord.teamLSC + swimmerRecord.teamCode,
      desc: "Team Code",
    },
    5: {
      start: 18,
      length: 1,
      required: false,
      type: "alpha",
      value: "",
      desc: "optional 5th char of team",
    },
    6: {
      start: 19,
      length: 28,
      required: true,
      type: "name",
      value: swimmerRecord.fullName,
      desc: "Swimmers name",
    },
    7: {
      start: 47,
      length: 1,
      required: false,
      type: "",
      value: "",
      desc: "future use",
    },
    8: {
      start: 48,
      length: 12,
      required: true,
      type: "alpha",
      value: swimmerRecord.MMNumber,
      desc: "Swimmers MM Number",
    },
    9: {
      start: 60,
      length: 1,
      required: false,
      type: "code",
      value: swimmerRecord.fullName,
      desc: "Attach Code 016",
    },
    10: {
      start: 61,
      length: 3,
      required: true,
      type: "code",
      value: "NZL",
      desc: "Citizen code 009",
    },
    11: {
      start: 64,
      length: 8,
      required: true,
      type: "date",
      value: getDateMMDDYYYY(swimmerRecord.dob),
      desc: "Swimmer's dob",
    },
    12: {
      start: 72,
      length: 2,
      required: false,
      type: "alpha",
      value: swimmerRecord.age,
      desc: "Swimmer's age",
    },
    13: {
      start: 74,
      length: 1,
      required: true,
      type: "code",
      value: swimmerRecord.gender,
      desc: "Gender Code 010",
    },
    14: {
      start: 75,
      length: 30,
      required: false,
      type: "alpha",
      value: "",
      desc: "Admin record - unused",
    },
    15: {
      start: 105,
      length: 20,
      required: false,
      type: "alpha",
      value: "",
      desc: "Admin - unused",
    },
    16: {
      start: 125,
      length: 12,
      required: false,
      type: "phone",
      value: "",
      desc: "Swimmer's phone number - unused",
    },
    17: {
      start: 137,
      length: 12,
      required: false,
      type: "alpha",
      value: "",
      desc: "Swimmer's 2nd phone number - unused",
    },
    18: {
      start: 149,
      length: 8,
      required: false,
      type: "date",
      value: "",
      desc: "Date swimmer registered - unused",
    },
    19: {
      start: 157,
      length: 1,
      required: false,
      type: "code",
      value: "",
      desc: "Member code - unused",
    },
    20: {
      start: 158,
      length: 3,
      required: false,
      type: "",
      value: "",
      desc: "future use",
    },
  };

  const d1Record: string = createSchemaRecord(d1Schema);

  return { d1Record };
};

export const emitZ0Record = (
  sumBRecords?: string,
  sumDRecords?: string,
  sumSwimmers?: string
) => {
  const z0Schema = {
    1: {
      start: 1,
      length: 2,
      required: true,
      type: "const",
      value: "Z0",
      desc: " Z0 record",
    },
    2: {
      start: 3,
      length: 1,
      required: true,
      type: "code",
      value: sdifConst.ORGCode001,
      desc: "Org code 001",
    },
    3: {
      start: 4,
      length: 8,
      required: false,
      type: "",
      value: "",
      desc: "future use",
    },
    4: {
      start: 12,
      length: 2,
      required: true,
      type: "code",
      value: sdifConst.FILECode003,
      desc: "File code 003",
    },
    5: {
      start: 14,
      length: 30,
      required: false,
      type: "alpha",
      value: "",
      desc: "notes",
    },
    6: {
      start: 44,
      length: 3,
      required: false,
      type: "int",
      value: sumBRecords || "1",
      desc: "Number of B records",
    },
    7: {
      start: 47,
      length: 3,
      required: false,
      type: "int",
      value: "",
      desc: "Number of meets",
    },
    8: {
      start: 50,
      length: 4,
      required: false,
      type: "int",
      value: "",
      desc: "Number of C records",
    },
    9: {
      start: 54,
      length: 4,
      required: false,
      type: "int",
      value: "",
      desc: "Number of different teams",
    },
    10: {
      start: 58,
      length: 6,
      required: false,
      type: "int",
      value: sumDRecords || "",
      desc: "Number of D records",
    },
    11: {
      start: 64,
      length: 6,
      required: false,
      type: "int",
      value: sumSwimmers || "",
      desc: "Number of different swimmers",
    },
    12: {
      start: 70,
      length: 5,
      required: false,
      type: "int",
      value: "",
      desc: "Number of E records",
    },
    13: {
      start: 75,
      length: 6,
      required: false,
      type: "int",
      value: "",
      desc: "Number of F records",
    },
    14: {
      start: 81,
      length: 6,
      required: false,
      type: "int",
      value: "",
      desc: "Number of G records",
    },
    15: {
      start: 87,
      length: 5,
      required: false,
      type: "int",
      value: "",
      desc: "Batch number",
    },
    16: {
      start: 92,
      length: 3,
      required: false,
      type: "int",
      value: "",
      desc: "Number of new members",
    },
    17: {
      start: 95,
      length: 3,
      required: false,
      type: "int",
      value: "",
      desc: "Number of renew members",
    },
    18: {
      start: 98,
      length: 3,
      required: false,
      type: "int",
      value: "",
      desc: "Number of member changes",
    },
    19: {
      start: 101,
      length: 3,
      required: false,
      type: "int",
      value: "",
      desc: "Number of member deletes",
    },
    20: {
      start: 104,
      length: 57,
      required: false,
      type: "",
      value: "",
      desc: "future use",
    },
  };

  const z0Record: string = createSchemaRecord(z0Schema, false);
  return z0Record;
};
