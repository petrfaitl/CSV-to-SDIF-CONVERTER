import {
  getDistanceAndStrokeCode,
  getFullName,
  splitStringOnComma,
} from "~/utils/utilFunctions";

interface SwimmerRecord {
  events: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  teamCode: string;
  gender: string;
  eventCount: string;
}
export const createSwimmerRecords = (
  swimmerRecord: any,
  meetStartDate: string
) => {
  const registeredEvents: string[] = splitStringOnComma(
    swimmerRecord["events"]
  );

  const swimmerEventArr = [];
  let swimmerD1Record = "";

  const seedTime: string = "NT";
  const eventAge = "13UN";
  const eventGender = "X";
  const eventDate = meetStartDate;
  const dob = swimmerRecord["dob"];
  const gender = swimmerRecord["gender"];

  const fullName: string = getFullName(
    swimmerRecord["firstName"],
    swimmerRecord["lastName"]
  );
  const MMNumber = getMMNumber(
    swimmerRecord.teamCode,
    swimmerRecord.firstName,
    swimmerRecord.lastName,
    swimmerRecord.dob,
    swimmerRecord.middleName
  );

  for (const ev of registeredEvents) {
    const { eventDistance, eventStrokeCode } = getDistanceAndStrokeCode(ev);
    const eventD0Record = emitD0Record({
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
    console.log(eventD0Record);
    swimmerEventArr.push(eventD0Record);
  }

  // if (parseInt(swimmerRecord["eventCount"]) !== registeredEvents.length) {
  //   throw new Error("Registered events do not match event count.");
  // }

  const getRegisteredEvents = () => {
    return registeredEvents;
  };

  // D0 for every event D1 for a swimmer

  const swimmerD0Records = swimmerEventArr;
  return { swimmerD0Records, swimmerD1Record };
};
