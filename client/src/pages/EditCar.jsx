import React, { useEffect, useState } from "react";
import "../App.css";
import { useParams } from "react-router-dom";
import { FeaturesAPI } from "../services/FeaturesAPI";
import CarsAPI from "../services/CarsAPI";

const EditCar = () => {
  const { id } = useParams();
  const [features, setFeatures] = useState({
    exteriors: [],
    roofs: [],
    wheels: [],
    interiors: [],
  });

  const [selectedCar, setSelectedCar] = useState("");
  const [selectedFeatureType, setSelectedFeatureType] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState({
    exterior: {},
    roof: {},
    wheel: {},
    interior: {},
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [isConvertible, setIsConvertible] = useState(false);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const car = await CarsAPI.getCar(id);
        setSelectedCar(car);
        setTotalPrice(car.price);
        setIsConvertible(car.isConvertible);
        setSelectedFeature({
          exterior: car.exterior,
          roof: car.roof,
          wheel: car.wheels,
          interior: car.interior,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchCarDetails();
  }, [id]);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const [exteriorData, roofData, wheelsData, interiorData] =
          await Promise.all([
            FeaturesAPI.getExteriors(),
            FeaturesAPI.getRoofs(),
            FeaturesAPI.getWheels(),
            FeaturesAPI.getInterior(),
          ]);
        setFeatures({
          exteriors: exteriorData,
          roofs: roofData,
          wheels: wheelsData,
          interiors: interiorData,
        });
      } catch (error) {
        console.error("Error fetching feature data:", error);
      }
    };

    fetchFeatures();

  }, []);


  const getFeatureNameById = (features, id, featureType) => {
    if(featureType !== "wheels"){
      const feature = features[`${featureType}s`].find((feature) => feature.id === id);
      return feature;
    } else{
      const feature = features[`${featureType}`].find((feature) => feature.id === id);
      return feature;
    }
    
    return feature;
  };

  const renderFeatureDetails = (featureType) => {
    return features[`${featureType}s`].map((feature, key) => (
      <div
        id={`${featureType}${key}`}
        className={`option-card ${
          selectedFeature[featureType]?.id === feature.id ? "selected" : ""
        }`}
        style={{
          backgroundImage:
            'url("https://images-visualizer.gm.com/swatches/chevrolet/us/b2c/en/2023/corvette-stingray/small/gsj.png")',
          border:
            selectedFeature[featureType]?.id === feature.id
              ? "2px solid green"
              : "none",
        }}
        onClick={() => handleSelectFeature(featureType, feature)}
      >
        <div className="option-card-overlay">
          <div id={key} className="option-card-details">
            <p>
              {feature.color}
              <br /> 💵 ${feature.price}
            </p>
            <p></p>
          </div>
        </div>
      </div>
    ));
  };

  const handleFeatureButtonClick = (featureType) => {
    featureType = featureType.slice(0, -1); // Remove the 's' from the feature type
    setSelectedFeatureType(featureType);
  };

  const handleSelectFeature = (featureType, feature) => {
    if (!isConvertible && featureType === "roof" && feature.isconvertible) {
      return alert(
        "Sorry you cannot put that roof on a coupe! /n Please select a different roof."
      );
    }
    if (isConvertible && featureType === "roof" && !feature.isconvertible) {
      return alert(
        "Sorry you cannot put that roof on a convertible! /n Please select a different roof."
      );
    }

    setSelectedFeature((prev) => ({ ...prev, [featureType]: feature }));

    setTotalPrice((prevPrice) => {
      let newPrice = prevPrice;

      // Subtract the price of the previously selected feature
      if (selectedFeature[featureType]?.id) {
        newPrice -= selectedFeature[featureType].price;
      }
      // Add the price of the newly selected feature
      newPrice += feature.price;

      return newPrice;
    }); // Update total price
  };

  const handleUpdate = async () => {
    const updatedCar = {
      name: selectedCar.name,
      isconvertible: selectedCar.isconvertible,
      exterior: selectedFeature.exterior ? selectedFeature.exterior : selectedFeature["exterior"].id,
      roof: selectedFeature.roof ? selectedFeature.roof : selectedFeature["roof"].id,
      wheels: selectedFeature.wheel ? selectedFeature.wheel : selectedFeature["wheel"].id,
      interior: selectedFeature.interior ? selectedFeature.interior : selectedFeature["interior"].id,
      price: totalPrice,
    };

    try {
      await CarsAPI.updateCar(id, updatedCar);
      alert("Car updated successfully!");
      window.location.href = "/customcars";
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    await CarsAPI.deleteCar(id);
    alert("Car deleted successfully!");
    window.location.href = "/customcars"; // Redirect after deletion
  };

  const renderSelectedFeature = (featureType) => {

    return (
      <div
              className="car-selection"
              style={{
                backgroundImage:
                  'url("https://images-visualizer.gm.com/swatches/chevrolet/us/b2c/en/2023/corvette-stingray/small/gs7.png")',
              }}
            >
              <div className="car-selection-overlay">
                <div className="car-selection-details">
                  <p>
                    {console.log('selectedCar',selectedCar)}
                    <strong>{featureType}</strong> {getFeatureNameById(features, selectedCar[featureType], featureType)?.color}{" "}
                  </p>
                  <p className="option-price">💵 ${getFeatureNameById(features, selectedCar[featureType], featureType)?.price}</p>
                </div>
              </div>
            </div>
    );

  };


  return (
    <>
      <div className="edit-car">
        <article className="car-full-details">
          <header>
            <h2>
            <img
              src="https://thumbs.dreamstime.com/b/accelerate-your-brand-our-racing-car-logo-icons-vector-art-featuring-sleek-black-outlines-racing-cars-circle-322294800.jpg"
              width="70px"
              alt="Car Icon"
            />{" "}
            {selectedCar?.name || "Car Name"}
            </h2>
            <div className="create-car-options">
              <div id="customization-options" className="car-options">
              {["exteriors", "roofs", "wheels", "interiors"].map((featureType) => (
                        <div id="car-options" key={featureType}>
                            <button onClick={() => handleFeatureButtonClick(featureType)}>
                                {featureType}
                            </button>
                        </div>
                    ))}
              </div>
            </div>
          </header>
          <div className="details-content">
            <div className="car-details-price">
              <p>💰 ${totalPrice}</p>
            </div>
            
            
            <div className="car-selection">
            {["exterior", "roof", "wheels", "interior"].map((featureType) => renderSelectedFeature(featureType))}
              </div>
              <div className="car-modify">
              <input type="submit" value="Update" onClick={handleUpdate}/>
              <button onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </article>
      </div>
      {selectedFeatureType && (
            <div className="ReactModalPortal">
                <div className="ReactModal__Overlay ReactModal__Overlay--after-open modal-overlay">
                    <div
                        className="ReactModal__Content ReactModal__Content--after-open option-modal"
                        tabIndex="-1"
                        role="dialog"
                        aria-label="Customize Car Option"
                        aria-modal="true"
                    >
                        <div className="available-options">
                            {renderFeatureDetails(selectedFeatureType)}
                        </div>
                        <button onClick={() => setSelectedFeatureType(null)}>Done</button>
                    </div>
                </div>
            </div>
        )}
    </>
  );
};

export default EditCar;
