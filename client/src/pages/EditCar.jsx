import React, { useEffect, useState } from "react";
import "../App.css";
import { useParams } from "react-router-dom";
import { FeaturesAPI } from "../services/FeaturesAPI";
import CarsAPI from "../services/CarsAPI";

const EditCar = ({}) => {
  const { id } = useParams();
  const [car, setCar] = useState(null); // Car details
  const [exteriors, setExteriors] = useState([]);
  const [roofs, setRoofs] = useState([]);
  const [wheels, setWheels] = useState([]);
  const [interiors, setInteriors] = useState([]);

  const [selectedExterior, setSelectedExterior] = useState({});
  const [selectedRoof, setSelectedRoof] = useState({});
  const [selectedWheels, setSelectedWheels] = useState({});
  const [selectedInterior, setSelectedInterior] = useState({});

  const [totalPrice, setTotalPrice] = useState(0);
  const [modalType, setModalType] = useState(null); // Track which modal to show

  useEffect(() => {
    // Fetch car details
    const fetchCarDetails = async () => {
        try {
          const car = await CarsAPI.getCar(id);
          console.log("car", car);
          setCar(car);
          setTotalPrice(car.price);
        } catch (err) {
          console.log(err);
        }
      };
    
      fetchCarDetails();
  }, [id]);
  
  


  const fetchFeatures = async () => {
    try {
      const [exteriorData, roofData, wheelsData, interiorData] =
        await Promise.all([
          FeaturesAPI.getExteriors(),
          FeaturesAPI.getRoofs(),
          FeaturesAPI.getWheels(),
          FeaturesAPI.getInterior(),
        ]);
      setExteriors(exteriorData);
      setRoofs(roofData);
      setWheels(wheelsData);
      setInteriors(interiorData);
    } catch (error) {
      console.error("Error fetching feature data:", error);
    }
  };

  useEffect(() => {
    fetchFeatures(); // Fetch feature options when the component loads
  }, []);

  // Handle selection of features
  const handleSelectFeature = (featureType, feature) => {
    // console.log(`Feature selected: ${featureType}`, feature);

    if (!car.isConvertible && feature.isConvertible) {
      alert("This feature option cannot be selected for a non-convertible car.");
      return;
    }

    switch (featureType) {
      case "exterior":
        setSelectedExterior(feature);
        break;
      case "roof":
        setSelectedRoof(feature);
        break;
      case "wheels":
        setSelectedWheels(feature);
        break;
      case "interior":
        setSelectedInterior(feature);
        break;
      default:
        break;
    }
    setTotalPrice((prevPrice) => {
      let newPrice = prevPrice;

      // Subtract the price of the previously selected feature
      if (featureType === "exterior" && selectedExterior.id) {
        newPrice -= selectedExterior.price;
      } else if (featureType === "roof" && selectedRoof.id) {
        newPrice -= selectedRoof.price;
      } else if (featureType === "wheels" && selectedWheels.id) {
        newPrice -= selectedWheels.price;
      } else if (featureType === "interior" && selectedInterior.id) {
        newPrice -= selectedInterior.price;
      }

      // Add the price of the newly selected feature
      newPrice += feature.price;

      return newPrice;
    }); // Update total price
    setModalType(null); // Close modal
  };

  // Function to display all properties of a feature
  const renderFeatureDetails = (feature) => {
    return Object.keys(feature).map((key) => (
      <p key={key}>
        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
        {feature[key]}
      </p>
    ));
  };

  // Update the car details on backend
  const handleUpdate = async () => {
    const updatedCar = {
      ...car,
      exterior: selectedExterior.name,
      roof: selectedRoof.name,
      wheels: selectedWheels.name,
      interior: selectedInterior.name,
      price: totalPrice,
    };

    try {
      await CarsAPI.updateCar(id, updatedCar);
      alert("Car updated successfully!");
      // Redirect to custom cars page
      window.location.href = "/customcars";
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  // Handle car deletion
  const handleDelete = async (event) => {
    event.preventDefault();
    await CarsAPI.deleteCar(id);
    alert("Car deleted successfully!");
    window.location.href = "/customcars"; // Redirect after deletion
  };

  return (
    <div>
      <article className="car-full-details">
        <header>
          <h2>
            <img
              src="https://thumbs.dreamstime.com/b/accelerate-your-brand-our-racing-car-logo-icons-vector-art-featuring-sleek-black-outlines-racing-cars-circle-322294800.jpg"
              width="70px"
              alt="Car Icon"
            />{" "}
            {car?.name || "Car Name"}
          </h2>
          <div className="create-car-options">
            <div id="customization-options" className="car-options">
              <button onClick={() => setModalType("exterior")}>Exterior</button>
              <button onClick={() => setModalType("roof")}>Roof</button>
              <button onClick={() => setModalType("wheels")}>Wheels</button>
              <button onClick={() => setModalType("interior")}>Interior</button>
            </div>
          </div>
        </header>
        <div className="details-content">
          <div className="car-details-price">
            <p>💰 ${totalPrice}</p>
          </div>

          {/* Feature Selection */}
          <div className="car-selection-overlay">
            <div className="car-selection-details">
              <p>
                <strong>🖌️ Exterior:</strong>{" "}
                {selectedExterior.name || "Arctic White"}
              </p>
              <p className="option-price">
                💵 ${selectedExterior.price || 500}
              </p>
            </div>
          </div>
          <div className="car-selection-overlay">
            <div className="car-selection-details">
              <p>
                <strong>😎 Roof:</strong> {selectedRoof.name || "Transparent"}
              </p>
              <p className="option-price">💵 ${selectedRoof.price || 1000}</p>
            </div>
          </div>
          <div className="car-selection-overlay">
            <div className="car-selection-details">
              <p>
                <strong>🛴 Wheels:</strong>{" "}
                {selectedWheels.name || "Carbon Flash Open Spoke"}
              </p>
              <p className="option-price">💵 ${selectedWheels.price || 1000}</p>
            </div>
          </div>
          <div className="car-selection-overlay">
            <div className="car-selection-details">
              <p>
                <strong>💺 Interior:</strong>{" "}
                {selectedInterior.name || "Jet Black Interior with Gray Seat"}
              </p>
              <p className="option-price">
                💵 ${selectedInterior.price || 2500}
              </p>
            </div>
          </div>

          <div className="car-modify">
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </article>

      {/* Modal for feature selection */}
      {modalType && (
        <div className="modal">
          <h3>
            Select {modalType.charAt(0).toUpperCase() + modalType.slice(1)}
          </h3>
          <ul>
            {modalType === "exterior" &&
              exteriors.map((exterior) => (
                <li
                  key={exterior.id}
                  className={
                    selectedExterior?.id === exterior.id
                      ? "selected-feature"
                      : ""
                  }
                  onClick={() => handleSelectFeature("exterior", exterior)}
                >
                  {renderFeatureDetails(exterior)}
                </li>
              ))}
            {modalType === "roof" &&
              roofs.map((roof) => (
                <li
                  key={roof.id}
                  className={
                    selectedRoof?.id === roof.id ? "selected-feature" : ""
                  }
                  onClick={() => handleSelectFeature("roof", roof)}
                >
                  {renderFeatureDetails(roof)}
                </li>
              ))}
            {modalType === "wheels" &&
              wheels.map((wheel) => (
                <li
                  key={wheel.id}
                  className={
                    selectedWheels?.id === wheel.id ? "selected-feature" : ""
                  }
                  onClick={() => handleSelectFeature("wheels", wheel)}
                >
                  {renderFeatureDetails(wheel)}
                </li>
              ))}
            {modalType === "interior" &&
              interiors.map((interior) => (
                <li
                  key={interior.id}
                  className={
                    selectedInterior?.id === interior.id
                      ? "selected-feature"
                      : ""
                  }
                  onClick={() => handleSelectFeature("interior", interior)}
                >
                  {renderFeatureDetails(interior)}
                </li>
              ))}
          </ul>
          {/* <ul>
            {modalType === "exterior" &&
              exteriors.map((exterior) => (
                <li key={exterior.id} onClick={() => handleSelectFeature("exterior", exterior)}>
                  {renderFeatureDetails(exterior)}
                </li>
              ))}
            {modalType === "roof" &&
              roofs.map((roof) => (
                <li key={roof.id} onClick={() => handleSelectFeature("roof", roof)}>
                  {renderFeatureDetails(roof)}
                </li>
              ))}
            {modalType === "wheels" &&
              wheels.map((wheel) => (
                <li key={wheel.id} onClick={() => handleSelectFeature("wheels", wheel)}>
                  {renderFeatureDetails(wheel)}
                </li>
              ))}
            {modalType === "interior" &&
              interiors.map((interior) => (
                <li key={interior.id} onClick={() => handleSelectFeature("interior", interior)}>
                  {renderFeatureDetails(interior)}
                </li>
              ))}
          </ul> */}
          <button onClick={() => setModalType(null)}>Done</button>
        </div>
      )}
    </div>
  );
};

export default EditCar;
