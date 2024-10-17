import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import CarsAPI from "../services/CarsAPI";
import { FeaturesAPI } from "../services/FeaturesAPI";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState([]);
  const [features, setFeatures] = useState({
    exteriors: [],
    interiors: [],
    roofs: [],
    wheels: [],
  });

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const car = await CarsAPI.getCar(id);
        setCar(car);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCarDetails();

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
  
  }, []);

  const handleDelete = async (event) => {
    event.preventDefault();
    await CarsAPI.deleteCar(id);
    alert("Car deleted successfully!");
    window.location.href = "/customcars"; // Redirect after deletion
  };


  return (
    <main>
      <article className="car-full-details">
        <header>
          <h2>
            <img
              src="https://thumbs.dreamstime.com/b/accelerate-your-brand-our-racing-car-logo-icons-vector-art-featuring-sleek-black-outlines-racing-cars-circle-322294800.jpg"
              width="70px"
            />{" "}
            {car.name}
          </h2>
        </header>
        <div className="details-content">
          <div className="car-details-price">
            <p>💰 ${car.price}</p>
          </div>
          <div
            className="car-selection"
            style={{
              backgroundImage:
                'url("https://images-visualizer.gm.com/swatches/chevrolet/us/b2c/en/2023/corvette-stingray/small/g8g.png")',
            }}
          >
            <div className="car-selection-overlay">
              <div className="car-selection-details">
                <p>
                  <strong>🖌️ Exterior:</strong> {features.exteriors.find((feature) => feature.id === car.exterior)?.color || 'N/A'}
                </p>
                <p className="option-price">💵 ${features.exteriors.find((feature) => feature.id === car.exterior) ?.price || 'N/A'}</p>
              </div>
            </div>
          </div>
          <div
            className="car-selection"
            style={{
              backgroundImage:
                'url("https://images-visualizer.gm.com/swatches/chevrolet/us/b2c/en/2023/corvette-stingray/small/cc3.png")',
            }}
          >
            <div className="car-selection-overlay">
              <div className="car-selection-details">
                <p>
                  <strong>😎 Roof:</strong> {features.roofs.find((feature) => feature.id === car.roof) ?.color || 'N/A'}
                </p>
                <p className="option-price">💵 ${features.roofs.find((feature) => feature.id === car.roof) ?.price || 'N/A'}</p>
              </div>
            </div>
          </div>
          <div className="car-modify">
            <a href={`/edit/${id}`} role="button">
              Edit
            </a>
            <button onClick={handleDelete}>Delete</button>
          </div>
          <div
            className="car-selection"
            style={{
              backgroundImage:
                'url("https://images-visualizer.gm.com/swatches/chevrolet/us/b2c/en/2023/corvette-stingray/small/q9i.png")',
            }}
          >
            <div className="car-selection-overlay">
              <div className="car-selection-details">
                <p>
                  <strong>🛴 Wheels:</strong> Gloss Black 20 Spoke
                </p>
                <p className="option-price">💵 $600</p>
              </div>
            </div>
          </div>
          <div
            className="car-selection"
            style={{
              backgroundImage:
                'url("https://images-visualizer.gm.com/swatches/chevrolet/us/b2c/en/2023/corvette-stingray/small/o_jbicgs.png")',
            }}
          >
            <div className="car-selection-overlay">
              <div className="car-selection-details">
                <p>
                  <strong>💺 Interior:</strong> Jet Black Interior with Gray
                  Seat
                </p>
                <p className="option-price">💵 $2500</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
};

export default CarDetails;
