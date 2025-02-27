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

export const createSwimmerRecords = (
  swimmerRecord: { events: string; entryTimes: string; eventAge?: string; eventGender?: string; dob: string; gender: string; firstName: string; lastName: string; teamCode: string; middleName?: string, swimmerAge?:string, schoolYear?:string },
  meetStartDate: string
): { individualEventRecords: string[]; teamCode: any; teamLSC: any; teamName: any } => {
  const individualEventRecords: string[] = [];

  const events = cleanEntry(swimmerRecord["events"], [",$"]);
  // console.log(events);
  const registeredEvents: string[] = splitStringOnComma(
    events
  );

  const seedTimes : string[] = splitStringOnComma(
    swimmerRecord["entryTimes"]
  );

  let seedTime: string = "NT";
  const eventAge: string =
    swimmerRecord["eventAge"] || sdifConst.EVENTAGECode025;
  const eventGender: string =
    swimmerRecord["eventGender"] || sdifConst.EVENTSEXCode011[2];
  const eventDate = meetStartDate;
  const dob = swimmerRecord["dob"];
  // const swimmerAge = swimmerRecord["swimmerAge"];
  const gender = swimmerRecord["gender"];
  const teamRecord = getTeamRecord(swimmerRecord["teamCode"]);
  const teamCode = teamRecord?.teamCode ?? "UNKNOWN";
  const teamLSC = teamRecord?.lscCode ?? "UNKNOWN";
  const teamName = teamRecord?.teamName ?? "UNKNOWN";
  const age =  swimmerRecord["schoolYear"] || swimmerRecord["swimmerAge"] || getSwimmerAge(dob);

  console.log(age);

  const fullName: string = getFullName(
    swimmerRecord["firstName"],
    swimmerRecord["lastName"]
  );
  const MMNumber = getMMNumber(swimmerRecord);

  for (const [index, ev] of registeredEvents.entries()) {

    const distanceStrokeCode = getDistanceAndStrokeCode(ev);
//const { eventDistance, eventStrokeCode, isValid }
    if (!distanceStrokeCode.isValid) {
      console.error("Invalid distanceStroke:", distanceStrokeCode.validationErrorMessage);
      // Notify ConvertForm.vue about the invalid input
      break;
    } else {
      // console.log("Valid event:", distanceStrokeCode.isValid);
    }

    seedTime = prepareSeedTime(seedTimes[index]);

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
  }

  const { d1Record } = emitD1Record({
    teamCode,
    teamLSC,
    fullName,
    MMNumber,
    dob,
    age,
    gender,
  });
  individualEventRecords.push(d1Record);
  // if (parseInt(swimmerRecord["eventCount"]) !== registeredEvents.length) {
  //   throw new Error ("Registered events do not match event count.");
  // }

  const getRegisteredEvents = () => {
    return registeredEvents;
  };

  const getEventsRecords = () => {
    return individualEventRecords;
  };
  // console.log(getEventsRecords());
  // D0 for every event D1 for a swimmer

  return { individualEventRecords, teamCode, teamLSC, teamName };
};
