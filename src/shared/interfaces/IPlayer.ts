export interface PlayerData {
  id: number;
  name: string;
  group_id: number;
  account_id: number;
  level: number;
  vocation: number;
  health: number;
  healthmax: number;
  experience: string;
  lookbody: number;
  lookfeet: number;
  lookhead: number;
  looklegs: number;
  looktype: number;
  lookaddons: number;
  lookmount: number;
  lookmounthead: number;
  lookmountbody: number;
  lookmountlegs: number;
  lookmountfeet: number;
  direction: number;
  maglevel: number;
  mana: number;
  manamax: number;
  manaspent: string;
  soul: number;
  town_id: number;
  posx: number;
  posy: number;
  posz: number;
  conditions: null;
  cap: number;
  sex: number;
  lastlogin: string;
  lastip: number;
  save: number;
  skull: number;
  skulltime: string;
  lastlogout: string;
  blessings: number;
  onlinetime: string;
  deletion: string;
  balance: string;
  offlinetraining_time: number;
  offlinetraining_skill: number;
  stamina: number;
  skill_fist: number;
  skill_fist_tries: string;
  skill_club: number;
  skill_club_tries: string;
  skill_sword: number;
  skill_sword_tries: string;
  skill_axe: number;
  skill_axe_tries: string;
  skill_dist: number;
  skill_dist_tries: string;
  skill_shielding: number;
  skill_shielding_tries: string;
  skill_fishing: number;
  skill_fishing_tries: string;
}

type PlayerDataArray = PlayerData[];