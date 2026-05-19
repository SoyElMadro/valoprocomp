import type { MapData } from '../types';

export const maps: MapData[] = [
  { id: 1, name: 'Split', image: '/maps/split.avif' },
  { id: 2, name: 'Bind', image: '/maps/bind.avif' },
  { id: 3, name: 'Haven', image: '/maps/haven.avif' },
  { id: 4, name: 'Ascent', image: '/maps/ascent.avif' },
  { id: 5, name: 'Icebox', image: '/maps/icebox.avif' },
  { id: 6, name: 'Breeze', image: '/maps/breeze.avif' },
  { id: 7, name: 'Fracture', image: '/maps/fracture.avif' },
  { id: 8, name: 'Pearl', image: '/maps/pearl.avif' },
  { id: 9, name: 'Lotus', image: '/maps/lotus.avif' },
  { id: 10, name: 'Sunset', image: '/maps/sunset.avif' },
  { id: 11, name: 'Abyss', image: '/maps/abyss.avif' },
  { id: 12, name: 'Corrode', image: '/maps/corrode.avif' },
];

export const getMapName = (id: number): string => {
  const map = maps.find(m => m.id === id);
  return map ? map.name : 'Unknown';
};

export const getMapImage = (id: number): string | undefined => {
  const map = maps.find(m => m.id === id);
  return map?.image;
};