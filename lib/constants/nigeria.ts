import NaijaStates from 'naija-state-local-government';

// Get all states from the package
const allStates = NaijaStates.states();

export const NIGERIAN_STATES = allStates.map((state: string) => ({
  value: state,
  label: state,
}));

// Build cities/LGAs from the package
const buildCitiesMap = () => {
  const citiesMap: Record<string, string[]> = {};

  allStates.forEach((state) => {
    const lgasData = NaijaStates.lgas(state);
    citiesMap[state] = lgasData.lgas;
  });

  return citiesMap;
};

export const NIGERIAN_CITIES = buildCitiesMap();

export const getCitiesByState = (state: string) => {
  return NIGERIAN_CITIES[state] || [];
};
