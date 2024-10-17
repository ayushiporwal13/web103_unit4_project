import React, { useEffect, useState } from "react";
import "../App.css";
import CarsAPI from "../services/CarsAPI";
import { FeaturesAPI } from "../services/FeaturesAPI";

const ViewCars = () => {
  const [cars, setCars] = useState([]);
  const [features, setFeatures] = useState({
    exteriors: [],
    interiors: [],
    roofs: [],
    wheels: [],
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const cars = await CarsAPI.getAllCars();
        setCars(cars);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCars();

    const fetchFeatures = async () => {
      try {
        const exteriors = await FeaturesAPI.getExteriors();
        const interiors = await FeaturesAPI.getInterior();
        const roofs = await FeaturesAPI.getRoofs();
        const wheels = await FeaturesAPI.getWheels();

        setFeatures({
          exteriors,
          interiors,
          roofs,
          wheels,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchFeatures();

    // const fetchFeatures = async () => {
    //     try {
    //         const exteriors = await FeaturesAPI.getExteriors();
    //         setFeatures(prevFeatures => ({ ...prevFeatures, exteriors: exteriors }));

    //         const interiors = await FeaturesAPI.getInterior();
    //         setFeatures(prevFeatures => ({ ...prevFeatures,interiors : interiors}));

    //         const roofs = await FeaturesAPI.getRoofs();
    //         setFeatures(prevFeatures => ({ ...prevFeatures,roofs : roofs}));

    //         const wheels = await FeaturesAPI.getWheels();
    //         setFeatures(prevFeatures => ({ ...prevFeatures,wheels : wheels}));

    //         // console.log('features',features);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

  }, []);

  const getFeatureNameById = (features, id) => {
    const feature = features.find((feature) => feature.id === id);
    return feature ? feature.color : "Not Available";
  };

  return (
    <main>
      {cars &&
        cars.map((car) => {
          return (
            <article key={car.id}>
              <header>
                <h3>
                  <img src="https://thumbs.dreamstime.com/b/accelerate-your-brand-our-racing-car-logo-icons-vector-art-featuring-sleek-black-outlines-racing-cars-circle-322294800.jpg" width="70px" alt="Car" />{" "}
                  {car.name}
                </h3>
              </header>
              <div className="car-card">
                <div className="car-summary">
                  <p>
                    <strong>🖌️ Exterior:</strong>{" "}
                    {getFeatureNameById(features.exteriors, car.exterior)}{" "}
                  </p>
                  <p>
                    <strong>😎 Roof:</strong>{" "}
                    {getFeatureNameById(features.roofs, car.roof)}{" "}
                  </p>
                </div>
                <div className="car-summary">
                  <p>
                    <strong>🛴 Wheels:</strong> {getFeatureNameById(features.wheels, car.wheels)}
                  </p>
                  <p>
                    <strong>💺 Interior:</strong> {getFeatureNameById(features.interiors, car.interior)}
                  </p>
                </div>
                <div className="car-price">
                  <p>💰 ${car.price}</p>
                  <a href={`/customcars/${car.id}`} role="button">
                    Details
                  </a>
                </div>
              </div>
            </article>
          );
        })}
    </main>
  );
};

export default ViewCars;
