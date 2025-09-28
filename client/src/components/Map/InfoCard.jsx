import React from "react";

const InfoCard = ({ data, onClose }) => {
  if (!data) return null;

  const { districtName, info } = data;

  return (
    <div
      className="fixed bottom-6 right-6 w-80 bg-gray-800 text-white rounded-lg shadow-lg p-4 border border-gray-700"
    >
      {/* Close button */}
      <button
        id="card-close-btn"
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-white text-xl font-bold"
      >
        ×
      </button>

      {/* Title */}
      <h3 id="card-title" className="text-lg font-semibold mb-2">
        {info?.title || districtName}
      </h3>

      {/* Body */}
      <div id="card-body" className="space-y-3 text-sm">
        {!info ? (
          <p className="text-gray-300">
            Information for this district is not yet available.
          </p>
        ) : (
          <>
            {info.info && Array.isArray(info.info) && (
              <ul className="list-disc pl-5 space-y-1">
                {info.info.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            )}

            {info.tourist_places && info.tourist_places.length > 0 && (
              <>
                <h4 className="text-md font-semibold mt-3 mb-1">
                  Famous Tourist Places
                </h4>
                <div className="space-y-2">
                  {info.tourist_places.map((place) => {
                    let mapUrl = "#";
                    if (
                      place.location_coords &&
                      place.location_coords.latitude &&
                      place.location_coords.longitude
                    ) {
                      mapUrl = `https://www.google.com/maps/search/?api=1&query=${place.location_coords.latitude},${place.location_coords.longitude}`;
                    } else if (place.map_link) {
                      mapUrl = place.map_link;
                    }

                    return (
                      <div key={place.name} className="text-gray-300">
                        <strong className="text-white">{place.name}</strong>
                        <br />
                        <span>{place.location} </span>
                        {mapUrl !== "#" && (
                          <a
                            href={mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            [View on Map]
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InfoCard;