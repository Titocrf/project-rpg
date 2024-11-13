export interface PlayerClass {
  id: number;
  name: string;
}

export interface Player {
  id: number;
  name: string;
  xp: number;
  class_id: number;
  class: PlayerClass;
  confirmed: boolean;
}

export interface Guild {
  id: number;
  name: string;
}

export interface Balance {
  id: number;
  name: string;
  players: Player[];
  totalXP: number;
}

export interface BalanceDistribution {
  guilds: Guild[];
  status: string;
}
