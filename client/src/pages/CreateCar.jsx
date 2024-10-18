import React, { useEffect, useState } from "react";
import "../App.css";
import { FeaturesAPI } from "../services/FeaturesAPI";
import CarsAPI from "../services/CarsAPI";

const CreateCar = () => {
  const [features, setFeatures] = useState({
    exteriors: [],
    roofs: [],
    wheels: [],
    interiors: [],
  });
  
  const [selectedCarName, setSelectedCarName] = useState("");
const [selectedFeatureType, setSelectedFeatureType] = useState(null);

  const [selectedFeature, setSelectedFeature] = useState({
    exterior: {},
    roof: {},
    wheel: {},
    interior: {},
  });
const [totalPrice, setTotalPrice] = useState(65000);
const [isConvertible, setIsConvertible] = useState(false);


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

  const renderFeatureDetails = (featureType) => {
    return features[`${featureType}s`].map((feature, key) => {
    return (
      <div
        id={`${featureType}${key}`}
        className={`option-card ${selectedFeature[featureType]?.id === feature.id ? 'selected' : ''}`}
        style={{
        backgroundImage:
          'url("https://images-visualizer.gm.com/swatches/chevrolet/us/b2c/en/2023/corvette-stingray/small/gsj.png")',
        border: selectedFeature[featureType]?.id === feature.id ? '2px solid green' : 'none',
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
    );
    });
  };


const handleFeatureButtonClick = (featureType) => {
    featureType = featureType.slice(0, -1); // Remove the 's' from the feature type
    setSelectedFeatureType(featureType);
};

const handleSelectFeature = (featureType, feature) => {
    
    if(!isConvertible && featureType === "roof" && feature.isconvertible) {
        return alert("Sorry you cannot put that roof on a coupe! /n Please select a different roof.");
    }
    if(isConvertible && featureType === "roof" && !feature.isconvertible) {
        return alert("Sorry you cannot put that roof on a convertible! /n Please select a different roof.");
    }

    setSelectedFeature((prev) => ({ ...prev, [featureType]: feature }));

    setTotalPrice((prevPrice) => {
        let newPrice = prevPrice;
    
        // Subtract the price of the previously selected feature
        if (selectedFeature[featureType].id) {
          newPrice -= selectedFeature[featureType].price;
        }
        // Add the price of the newly selected feature
        newPrice += feature.price;
    
        return newPrice;
      }); // Update total price
  };

const handleCreate = async () => {
    const createCar = {
        name: selectedCarName,
        isconvertible: isConvertible,
        exterior: selectedFeature["exterior"].id,
        roof: selectedFeature["roof"].id,
        wheels: selectedFeature["wheel"].id,
        interior: selectedFeature["interior"].id,
        price: totalPrice,
    };

    try {
      await CarsAPI.createCar(createCar);
      alert("Car created successfully!");
      // Redirect to custom cars page
      window.location.href = "/customcars";
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

return (
    <>
        <div className="create-car">
            <label>
                <input type="checkbox" id="isconvertible" onChange={() => setIsConvertible(!isConvertible)}/>
                Convertible
            </label>
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
            <div className="create-car-price">💰${totalPrice}</div>
            <div className="create-car-name">
                <input type="text" id="name" name="name" placeholder="My New Car" onChange={(e) => setSelectedCarName(e.target.value)}/>
                <input type="submit" className="create-car-button" value="Create" onClick={handleCreate}/>
            </div>
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

export default CreateCar;
