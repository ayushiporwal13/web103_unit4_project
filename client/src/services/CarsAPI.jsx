const getAllCars = async () => {
  const response = await fetch("api/cars"); //realtive path
  // console.log('response',response);
  const data = await response.json();
  // console.log(data);
  if (response.status !== 200) {
    throw Error(data.message);
  }
  return data;
};

const getCar = async (id) => {
  // Relative Path Without Leading Slash (api/cars/${id}):
  // When you use a relative path without a leading slash, it is appended to the current path of the document.
  // For example, if your current URL is http://localhost:5173/customcars, the relative path api/cars/${id} will be resolved to http://localhost:5173/customcars/api/cars/${id}.

  // Relative Path With Leading Slash (/api/cars/${id}):
  // When you use a relative path with a leading slash, it is resolved relative to the root of the current origin.
  // For example, if your current URL is http://localhost:5173/customcars, the relative path /api/cars/${id} will be resolved to http://localhost:5173/api/cars/${id}.

  const response = await fetch(`/api/cars/${id}`); //relative path
  const data = await response.json();
//   console.log("data", data);
  if (response.status !== 200) {
    throw Error(data.message);
  }
  return data;
};

const createCar = async (car) => {
  const response = await fetch("/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(car),
  });

  const data = await response.json();
  if (response.status !== 201) {
    throw Error(data.message);
  }
  return data;
};

const updateCar = async (id, car) => {
  const response = await fetch(`/api/edit/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(car),
  });

  const data = await response.json();
  if (response.status !== 200) {
    throw Error(data.message);
  }
  return data;
};

const deleteCar = async (id) => {
  const response = await fetch(`/api/delete/${id}`, {
    method: "DELETE"
  });

  // const data = await response.json();
  // if (response.status !== 200) {
  //   throw Error(data.message);
  // }
  // return data;
};

export default { getAllCars, getCar, createCar, updateCar, deleteCar };
