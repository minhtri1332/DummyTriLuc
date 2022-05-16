export interface RawStat {
  endurance: number;
  hard: number;
  hits: number;
  reflex: number;
  strength: number;
}

export interface RawProfile {
  avatar: string;
  date_of_birth: string;
  height: number;
  weight: number;
  name: string;
  sex: string;
  stat: RawStat;
}
