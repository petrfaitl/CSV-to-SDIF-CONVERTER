export const meetConfig = {
  organiserInfo: [
    {
      orgCode: "LVW",
      lscCode: "BP",
      orgName: "Liz Van Welie Aquatics Swimming Club",
      orgAddress: "79 Pyes Pa Road",
      orgCity: "Tauranga",
      orgPostcode: "3112",
      orgState: "BOP",
    },
    {
      orgCode: "EVO",
      lscCode: "BP",
      orgName: "Evolution Aquatics Swimming Club",
      orgAddress: "77 Windsor Road, Otūmoetai",
      orgCity: "Tauranga",
      orgPostcode: "3110",
      orgState: "BOP",
    },
  ],
  getOrganiserByCode(code) {
    for (let org of this.organiserInfo) {
      if (org.orgCode.includes(code)) {
        return {
          meetOrganiser: org.orgName,
          meetAddress: org.orgAddress,
          meetCity: org.orgCity,
          meetPostcode: org.orgPostcode,
          meetState: org.orgState,
        };
      }
    }
    return {
      meetOrganiser: "",
      meetAddress: "",
      meetCity: "",
      meetPostcode: "",
      meetState: "",
    };
  },
  getAllClubNamesFormSelect() {
    let clubs = [];
    for (const club of this.organiserInfo) {
      const label = club.orgName;
      const value = club.orgCode;
      clubs.push({ label, value });
    }
    return clubs;
  },
};

export const strokeCodes = {
  strokes: {
    free: 1,
    freestyle: 1,
    back: 2,
    backstroke: 2,
    breast: 3,
    breaststroke: 3,
    fly: 4,
    butterfly: 4,
    im: 5,
    "individual medley": 5,
    medley: 5,
  },
};

/**
 * Team Codes for Swimmer definitions
 *
 */
export const teamCodes = {
  lvwbp: {
    teamCode: "LVW",
    lscCode: "BP",
    teamName: "LVW Aquatics Swim Club",
  },
  evobp: {
    teamCode: "EVO",
    lscCode: "BP",
    teamName: "Evolution Swimming Club",
  },
  undefined: {
    teamCode: "LVW",
    lscCode: "BP",
    teamName: "LVW Aquatics Swim Club",
  },
};

export const sdifConst = {
  ORGCode001: "8",
  FILECode003: "01",
  COUNTRYCode004: "NZL",
  MEETCode005: "7",
  SEXCode010: ["M", "F"],
  EVENTSEXCode011: ["M", "F", "X"],
  STROKECode012: {
    free: 1,
    back: 2,
    breast: 3,
    fly: 4,
    im: 5,
  },
  COURSECode013: "S",
  EVENTAGECode025: "13UN",
};
// File should contain one row per swimmer per event that they have entered.
//   So if a swimmer has entered 6 events, there should be 6 rows for that swimmer.
//   The swimmer and club details should be repeated on each row.
//   Order of rows in the file is not important, they will be sorted by Club/Swimmer

// Input to this module is a CSV file in the following format:
//
//   RegNo	    Registration number of the swimmer, eg NZMS number or Swimming NZ number.
//   No specific format is required, should be unique per swimmer in the file
// LastName	Swimmer last name
// FirstName	Swimmer first name
// DOB	        Swimmer date of birth in the format YYYY-MM-DD
// Gender	    M or F
// EventDistance	Numeric distance of the event, ie 50, 100, 200, 400, 800, 1500
// EventStroke	Event stroke name - Freestyle, Backstroke, Breaststroke, Butterfly, IM (or Individual)
// SeedTime	Event entry time in the format MM:SS.ff or NT (right padded) if no time has been provided
// ClubCode	NZMS club code, eg NS1, DN5, etc or UNAT for Unattached, or another club code that can be invented (max 4
// chars) ClubName	NZMS club name  File should contain one row per swimmer per event that they have entered. So if a
// swimmer has entered 6 events, there should be 6 rows for that swimmer. The swimmer and club details should be
// repeated on each row. Order of rows in the file is not important, they will be sorted by Club/Swimmer
