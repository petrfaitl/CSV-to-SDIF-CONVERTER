import { ref, watch, onMounted } from 'vue';
import teamDirectory from '@/schemas/swimming_team_directory.json';

export interface Team {
  id: string;
  teamCode: string;
  lscCode: string;
  teamName: string;
}

const CUSTOM_TEAMS_KEY = 'custom_swimming_teams';

export const useTeamDirectory = () => {
  const customTeams = ref<Team[]>([]);

  const loadCustomTeams = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(CUSTOM_TEAMS_KEY);
      if (stored) {
        try {
          customTeams.value = JSON.parse(stored);
        } catch (e) {
          console.error('Failed to parse custom teams from localStorage', e);
          customTeams.value = [];
        }
      }
    }
  };

  const saveCustomTeams = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CUSTOM_TEAMS_KEY, JSON.stringify(customTeams.value));
    }
  };

  const addTeam = (team: Omit<Team, 'id'>) => {
    const id = team.teamCode.toLowerCase().trim() + team.lscCode.toLowerCase().trim();
    const newTeam = { ...team, id };
    
    // Check if team already exists (either in static or custom)
    const exists = getAllTeams().find(t => t.id === id);
    if (exists) {
      // If it exists in custom, update it, otherwise maybe don't allow overwrite of static
      const customIndex = customTeams.value.findIndex(t => t.id === id);
      if (customIndex !== -1) {
        customTeams.value[customIndex] = newTeam;
      } else {
        // It's in static, we can add it to custom to "override" or just ignore
        customTeams.value.push(newTeam);
      }
    } else {
      customTeams.value.push(newTeam);
    }
    saveCustomTeams();
  };

  const removeTeam = (id: string) => {
    customTeams.value = customTeams.value.filter(t => t.id !== id);
    saveCustomTeams();
  };

  const getAllTeams = (): Team[] => {
    // Merge static and custom teams. Custom teams take precedence if IDs match.
    const teamsMap = new Map<string, Team>();
    
    teamDirectory.forEach(team => {
      teamsMap.set(team.id, team as Team);
    });
    
    customTeams.value.forEach(team => {
      teamsMap.set(team.id, team);
    });
    
    return Array.from(teamsMap.values());
  };

  const getTeamRecord = (teamStr: string): Team => {
    const normalizedTeam = teamStr.toLowerCase().trim();
    const allTeams = getAllTeams();
    
    return (
      allTeams.find(t => t.id === normalizedTeam) ||
      allTeams.find(t => t.teamCode.toLowerCase() === normalizedTeam) ||
      allTeams.find(t => t.id === "undefined")
    ) as Team;
  };

  onMounted(() => {
    loadCustomTeams();
  });

  return {
    customTeams,
    addTeam,
    removeTeam,
    getAllTeams,
    getTeamRecord,
    loadCustomTeams
  };
};
