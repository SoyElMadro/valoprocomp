import type { Agent } from '../types';

export const agents: Agent[] = [
  { thumbnailUrl: '/agents/astra.avif', title: 'Astra', role: 'Controlador' },
  { thumbnailUrl: '/agents/breach.avif', title: 'Breach', role: 'Iniciador' },
  { thumbnailUrl: '/agents/brimstone.avif', title: 'Brimstone', role: 'Controlador' },
  { thumbnailUrl: '/agents/chamber.avif', title: 'Chamber', role: 'Centinela' },
  { thumbnailUrl: '/agents/clove.avif', title: 'Clove', role: 'Controlador' },
  { thumbnailUrl: '/agents/cypher.avif', title: 'Cypher', role: 'Centinela' },
  { thumbnailUrl: '/agents/deadlock.avif', title: 'Deadlock', role: 'Centinela' },
  { thumbnailUrl: '/agents/fade.avif', title: 'Fade', role: 'Iniciador' },
  { thumbnailUrl: '/agents/gekko.avif', title: 'Gekko', role: 'Iniciador' },
  { thumbnailUrl: '/agents/harbor.avif', title: 'Harbor', role: 'Controlador' },
  { thumbnailUrl: '/agents/iso.avif', title: 'Iso', role: 'Duelista' },
  { thumbnailUrl: '/agents/jett.avif', title: 'Jett', role: 'Duelista' },
  { thumbnailUrl: '/agents/kayo.avif', title: 'KAY/O', role: 'Iniciador' },
  { thumbnailUrl: '/agents/killjoy.avif', title: 'Killjoy', role: 'Centinela' },
  { thumbnailUrl: '/agents/neon.avif', title: 'Neon', role: 'Duelista' },
  { thumbnailUrl: '/agents/omen.avif', title: 'Omen', role: 'Controlador' },
  { thumbnailUrl: '/agents/phoenix.avif', title: 'Phoenix', role: 'Duelista' },
  { thumbnailUrl: '/agents/raze.avif', title: 'Raze', role: 'Duelista' },
  { thumbnailUrl: '/agents/reyna.avif', title: 'Reyna', role: 'Duelista' },
  { thumbnailUrl: '/agents/sage.avif', title: 'Sage', role: 'Centinela' },
  { thumbnailUrl: '/agents/skye.avif', title: 'Skye', role: 'Iniciador' },
  { thumbnailUrl: '/agents/sova.avif', title: 'Sova', role: 'Iniciador' },
  { thumbnailUrl: '/agents/tejo.avif', title: 'Tejo', role: 'Iniciador' },
  { thumbnailUrl: '/agents/veto.avif', title: 'Veto', role: 'Centinela' },
  { thumbnailUrl: '/agents/viper.avif', title: 'Viper', role: 'Controlador' },
  { thumbnailUrl: '/agents/vyse.avif', title: 'Vyse', role: 'Centinela' },
  { thumbnailUrl: '/agents/waylay.avif', title: 'Waylay', role: 'Duelista' },
  { thumbnailUrl: '/agents/yoru.avif', title: 'Yoru', role: 'Duelista' },
];

export const getAgentByName = (name: string): Agent | undefined => {
  return agents.find(a => a.title.toLowerCase() === name.toLowerCase());
};