module.exports.coordinates = async function (location) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=geojson&limit=1&q=${encodeURIComponent(location)}`,
    {
      headers: {
        "User-Agent": "listing-app",
      },
    },
  );

  const data = await response.json();

  return data.features[0].geometry;
};
