import {
  getDistanceAndStrokeCode,
  getFullName,
  getSwimmerAge,
  splitStringOnComma,
  getMMNumber,
  getTeamCode,
  getLSCCode,
} from "~/utils/utilFunctions";
import { sdifConst } from "~/schemas/eventInfo";

export const createSwimmerRecords = (
  swimmerRecord: {
    events: string;
    firstName: string;
    middleName: string;
    lastName: string;
    dob: string;
    teamCode: string;
    gender: string;
    eventAge?: string | undefined;
    eventGender?: string | undefined;
  },
  meetStartDate: string
) => {
  const individualEventRecords: string[] = [];

  const registeredEvents: string[] = splitStringOnComma(
    swimmerRecord["events"]
  );

  const seedTime: string = "NT";
  const eventAge: string =
    swimmerRecord["eventAge"] || sdifConst.EVENTAGECode025;
  const eventGender: string =
    swimmerRecord["eventGender"] || sdifConst.EVENTSEXCode011[2];
  const eventDate = meetStartDate;
  const dob = swimmerRecord["dob"];
  const gender = swimmerRecord["gender"];
  // const teamCode = swimmerRecord["teamCode"] || "LVW";
  const teamCode = getTeamCode(swimmerRecord["teamCode"]);
  const teamLSC = getLSCCode(swimmerRecord["teamCode"]);

  const age = getSwimmerAge(dob);

  const fullName: string = getFullName(
    swimmerRecord["firstName"],
    swimmerRecord["lastName"]
  );
  const MMNumber = getMMNumber(swimmerRecord);

  for (const ev of registeredEvents) {
    const { eventDistance, eventStrokeCode } = getDistanceAndStrokeCode(ev);
    const { d0Record } = emitD0Record({
      fullName,
      dob,
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
    fullName,
    MMNumber,
    dob,
    age,
    gender,
  });
  individualEventRecords.push(d1Record);
  // if (parseInt(swimmerRecord["eventCount"]) !== registeredEvents.length) {
  //   throw new Error("Registered events do not match event count.");
  // }

  const getRegisteredEvents = () => {
    return registeredEvents;
  };

  const getEventsRecords = () => {
    return individualEventRecords;
  };
  // console.log(getEventsRecords());
  // D0 for every event D1 for a swimmer

  return { individualEventRecords, teamCode, teamLSC };
};
