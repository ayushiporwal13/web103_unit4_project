import React from 'react';

const FeatureSelector = ({ featureType, features, selectedFeature, onSelect }) => {
  return (
    <div className="feature-selector">
      <h3>{featureType.toUpperCase()}</h3>
      <div className="feature-grid">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`feature-item ${selectedFeature === feature ? 'selected' : ''}`}
            onClick={() => onSelect(featureType, feature)}
          >
            <img src={feature.image} alt={feature.name} />
            <p>{feature.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSelector;
