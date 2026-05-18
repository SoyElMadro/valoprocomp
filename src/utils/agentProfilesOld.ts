export const COMPATIBLE_CONTROLLER_PAIRS = [
  ['Omen', 'Viper'],
  ['Brimstone', 'Viper'],
  ['Omen', 'Astra'],
  ['Brimstone', 'Astra'],
  ['Omen', 'Clove'],
  ['Omen', 'Harbor'],
  ['Brimstone', 'Clove'],
  ['Viper', 'Clove'],
  ['Viper', 'Harbor'],
];

export const isCompatibleControllerPair = (
  agent1: string,
  agent2: string
): boolean => {
  return COMPATIBLE_CONTROLLER_PAIRS.some(
    pair => (pair[0] === agent1 && pair[1] === agent2) ||
            (pair[0] === agent2 && pair[1] === agent1)
  );
};