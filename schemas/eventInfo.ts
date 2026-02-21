import organiserInfo from "@/schemas/organiserInfo.json";

type MeetOrganiser = {
  orgCode: string;
  lscCode: string;
  orgName: string;
  orgAddress: string;
  orgCity: string;
  orgPostcode: string;
  orgState: string;
};

const DEFAULT_ORGANISER_DETAILS = {
  orgCode: "LVW",
  lscCode: "BP",
  orgName: "Liz Van Welie Aquatics Swimming Club",
  orgAddress: "79 Pyes Pa Road",
  orgCity: "Tauranga",
  orgPostcode: "3112",
  orgState: "BOP"
};

export const meetConfig = {
  organiserInfo: organiserInfo as MeetOrganiser[], // Type safety for `organiserInfo`

  getOrganiserByCode(code: string) {
    const organiser = this.organiserInfo.find((o) => o.orgCode === code);
    return organiser
      ? {
        meetOrganiser: organiser.orgName,
        meetAddress: organiser.orgAddress,
        meetCity: organiser.orgCity,
        meetPostcode: organiser.orgPostcode,
        meetState: organiser.orgState,
      }
      : DEFAULT_ORGANISER_DETAILS;
  },

  getAllClubNamesFormSelect() {
    const getStoredTeams = () => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('custom_swimming_teams');
        if (stored) {
          try {
            return JSON.parse(stored);
          } catch (e) {
            return [];
          }
        }
      }
      return [];
    };

    const customTeams = getStoredTeams();
    const allOrganisers = [...this.organiserInfo];

    // Add custom teams as organisers if they are not already there
    customTeams.forEach((team: any) => {
      if (!allOrganisers.find(o => o.orgCode === team.teamCode)) {
        allOrganisers.push({
          orgCode: team.teamCode,
          lscCode: team.lscCode,
          orgName: team.teamName,
          orgAddress: "",
          orgCity: "",
          orgPostcode: "",
          orgState: team.lscCode
        });
      }
    });

    return allOrganisers.map((organiser) => ({
      label: organiser.orgName,
      value: organiser.orgCode,
    }));
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
  EVENTAGECode025: "",
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
