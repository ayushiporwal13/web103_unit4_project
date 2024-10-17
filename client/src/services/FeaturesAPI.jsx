const getExteriors = async () => {
  const response = await fetch('/api/exteriors');
  const data = await response.json();
  if (response.status !== 200) {
    throw Error(data.message);
  }

  return data;
};

const getInterior = async () => {
  const response = await fetch('/api/interiors');
  const data = await response.json();
  if (response.status !== 200) {
    throw Error(data.message);
  }

  return data;
};

const getRoofs = async () => {
  const response = await fetch('/api/roofs');
  const data = await response.json();
  if (response.status !== 200) {
    throw Error(data.message);
  }

  return data;
};

const getWheels = async () => {
  const response = await fetch('/api/wheels');
  const data = await response.json();
  if (response.status !== 200) {
    throw Error(data.message);
  }

  return data;
};

export const FeaturesAPI = ({
  getExteriors,
  getInterior,
  getRoofs,
  getWheels
});
