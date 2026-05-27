import { maps } from '../data/maps';
import './MapSelector.css';

interface MapSelectorProps {
  selectedMap: number | null;
  onSelectMap: (mapId: number) => void;
}

export const MapSelector = ({ selectedMap, onSelectMap }: MapSelectorProps) => {
  return (
    <div className="map-selector notched">
      <label className="map-label" htmlFor="map-select">
        <span className="title-icon">&#9651;</span>
        Select Map
      </label>
      <div className="map-select-wrapper">
        <select
          id="map-select"
          className="map-select"
          value={selectedMap ?? ''}
          onChange={(e) => onSelectMap(Number(e.target.value))}
        >
          <option value="" disabled>
            Choose a map...
          </option>
          {maps.map((map) => (
            <option key={map.id} value={map.id}>
              {map.name}
            </option>
          ))}
        </select>
        <div className="map-select-accent" />
      </div>
    </div>
  );
};
