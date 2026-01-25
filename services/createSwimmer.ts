import {
  getDistanceAndStrokeCode,
  prepareSeedTime,
  getFullName,
  getSwimmerAge,
  splitStringOnComma,
  getMMNumber,
  getTeamRecord
} from "~/utils/utilFunctions";
import { sdifConst } from "~/schemas/eventInfo";
import {emitD0Record, emitD1Record} from "~/services/emitRecords";

// Define types for better clarity
interface SwimmerRecord {
  events: string;
  entryTimes: string;
  eventAge?: string;
  eventGender?: string;
  dob: string;
  gender: string;
  firstName: string;
  lastName: string;
  teamCode: string;
  middleName?: string;
  swimmerAge?: string;
  schoolYear?: string;
}

interface SwimmerRecordsOutput {
  individualEventRecords: string[];
  teamCode: string;
  teamLSC: string;
  teamName: string;
}

export const createSwimmerRecords = (
  swimmerRecord: SwimmerRecord,
  meetStartDate: string
): SwimmerRecordsOutput => {
  // Prepare team information
  const teamInfo = getTeamInformation(swimmerRecord.teamCode);
  const fullName = getFullName(swimmerRecord.firstName, swimmerRecord.lastName);
  const MMNumber = getMMNumber(swimmerRecord);
  const age = getSwimmerAgeDetails(swimmerRecord);

  // Generate individual event records
  const individualEventRecords = generateEventRecords(
    swimmerRecord.events,
    swimmerRecord.entryTimes,
    swimmerRecord.eventAge || sdifConst.EVENTAGECode025,
    swimmerRecord.eventGender || sdifConst.EVENTSEXCode011[2],
    meetStartDate,
    swimmerRecord.dob,
    age,
    swimmerRecord.gender,
    fullName,
    MMNumber
  );

  // Add team's D1 record
  const { d1Record } = emitD1Record({
    teamCode: teamInfo.teamCode,
    teamLSC: teamInfo.teamLSC,
    fullName,
    MMNumber,
    dob: swimmerRecord.dob,
    age,
    gender: swimmerRecord.gender,
  });
  individualEventRecords.push(d1Record);

  return {
    individualEventRecords,
    teamCode: teamInfo.teamCode,
    teamLSC: teamInfo.teamLSC,
    teamName: teamInfo.teamName,
  };
};

// Helper Function for Team Information
const getTeamInformation = (teamCode: string) => {
  const teamRecord = getTeamRecord(teamCode);
  return {
    teamCode: teamRecord?.teamCode ?? "",
    teamLSC: teamRecord?.lscCode ?? "UNKNOWN",
    teamName: teamRecord?.teamName ?? "UNKNOWN",
  };
};

// Helper Function for Swimmer Age Details
const getSwimmerAgeDetails = (swimmerRecord: SwimmerRecord): string => {
  return (
    swimmerRecord.schoolYear ||
    swimmerRecord.swimmerAge ||
    getSwimmerAge(swimmerRecord.dob)
  );
};

// Helper Function to Generate Individual Event Records
const generateEventRecords = (
  events: string,
  entryTimes: string,
  eventAge: string,
  eventGender: string,
  eventDate: string,
  dob: string,
  age: string,
  gender: string,
  fullName: string,
  MMNumber: string
): string[] => {
  const individualEventRecords: string[] = [];
  const registeredEvents = splitStringOnComma(cleanEntry(events, [",$"]));
  const seedTimes = splitStringOnComma(entryTimes);

  // Loop through each registered event
  registeredEvents.forEach((ev, index) => {
    const distanceStrokeCode = getDistanceAndStrokeCode(ev);

    if (!distanceStrokeCode.isValid) {
      // Log the error and skip invalid event
      console.error(
        `Invalid distance/stroke for '${fullName}' event '${ev}': ${distanceStrokeCode.validationErrorMessage}`
      );
      return;
    }

    const seedTime = prepareSeedTime(seedTimes[index]);
    const { eventDistance, eventStrokeCode } = distanceStrokeCode;

    const { d0Record } = emitD0Record({
      fullName,
      dob,
      age,
      eventDistance,
      gender,
      MMNumber,
      eventGender,
      eventStrokeCode,
      eventAge,
      eventDate,
      seedTime,
    });

    individualEventRecords.push(d0Record);
  });
  // console.log(individualEventRecords);
  return individualEventRecords;
};

// Helper Function to Clean Entry Inputs
const cleanEntry = (input: string, charsToRemove: string[]): string => {
  let cleaned = input;
  charsToRemove.forEach((char) => {
    cleaned = cleaned.replace(new RegExp(char, "g"), "");
  });
  return cleaned;
};

