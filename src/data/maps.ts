import type { MapData } from '../types';

export const maps: MapData[] = [
  { id: 1, name: 'Split', image: 'https://cdn.thespike.gg/maps/split_1617652187644.png' },
  { id: 2, name: 'Bind', image: 'https://cdn.thespike.gg/maps/bind_1617652202999.png' },
  { id: 3, name: 'Haven', image: 'https://cdn.thespike.gg/maps/haven_1617652217055.png' },
  { id: 4, name: 'Ascent', image: 'https://cdn.thespike.gg/maps/ascent_1617652228579.png' },
  { id: 5, name: 'Icebox', image: 'https://cdn.thespike.gg/maps/icebox_1617652241308.png' },
  { id: 6, name: 'Breeze', image: 'https://cdn.thespike.gg/maps/breeze_1617652253892.png' },
  { id: 7, name: 'Fracture', image: 'https://cdn.thespike.gg/maps/fracture_1617652266529.png' },
  { id: 8, name: 'Pearl', image: 'https://cdn.thespike.gg/maps/pearl_1648136883628.png' },
  { id: 9, name: 'Lotus', image: 'https://cdn.thespike.gg/maps/lotus_1674053237648.png' },
  { id: 10, name: 'Sunset', image: 'https://cdn.thespike.gg/maps/sunset_1696432610389.png' },
  { id: 11, name: 'Abyss', image: 'https://cdn.thespike.gg/maps/abyss_1714058485473.png' },
  { id: 12, name: 'Corrode', image: 'https://cdn.thespike.gg/maps/corrode_1724856965842.png' },
];

export const getMapName = (id: number): string => {
  const map = maps.find(m => m.id === id);
  return map ? map.name : 'Unknown';
};

export const getMapImage = (id: number): string | undefined => {
  const map = maps.find(m => m.id === id);
  return map?.image;
};