import React, { useState, useMemo, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

// Component to fly to a location when coordinates change
const FlyToLocation = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 12, { duration: 1.5 });
    }
  }, [position, map]);

  return null;
};

const Coverage = () => {
  const serviceCenters = useLoaderData();

  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  const regions = useMemo(
    () => [...new Set(serviceCenters.map((c) => c.region))],
    [serviceCenters]
  );

  const districts = useMemo(() => {
    const filtered = selectedRegion
      ? serviceCenters.filter((c) => c.region === selectedRegion)
      : serviceCenters;
    return [...new Set(filtered.map((c) => c.district))];
  }, [serviceCenters, selectedRegion]);

  const cities = useMemo(() => {
    const filtered = serviceCenters.filter(
      (c) =>
        (!selectedRegion || c.region === selectedRegion) &&
        (!selectedDistrict || c.district === selectedDistrict)
    );
    return [...new Set(filtered.map((c) => c.city))];
  }, [serviceCenters, selectedRegion, selectedDistrict]);

  const areas = useMemo(() => {
    const filtered = serviceCenters.filter(
      (c) =>
        (!selectedRegion || c.region === selectedRegion) &&
        (!selectedDistrict || c.district === selectedDistrict) &&
        (!selectedCity || c.city === selectedCity)
    );
    return [...new Set(filtered.flatMap((c) => c.covered_area))];
  }, [serviceCenters, selectedRegion, selectedDistrict, selectedCity]);

  const filteredCenters = serviceCenters.filter((center) => {
    const matchesSearch =
      center.city.toLowerCase().includes(search.toLowerCase()) ||
      center.district.toLowerCase().includes(search.toLowerCase()) ||
      center.covered_area.some((area) =>
        area.toLowerCase().includes(search.toLowerCase())
      );

    const matchesRegion = selectedRegion
      ? center.region === selectedRegion
      : true;
    const matchesDistrict = selectedDistrict
      ? center.district === selectedDistrict
      : true;
    const matchesCity = selectedCity ? center.city === selectedCity : true;
    const matchesArea = selectedArea
      ? center.covered_area.includes(selectedArea)
      : true;

    return (
      matchesSearch &&
      matchesRegion &&
      matchesDistrict &&
      matchesCity &&
      matchesArea
    );
  });

  // Fly to first filtered marker
  const flyPosition =
    filteredCenters.length > 0
      ? [filteredCenters[0].latitude, filteredCenters[0].longitude]
      : [23.8103, 90.4125]; // default Dhaka

  return (
    <div className="w-full px-4 md:px-8 py-10">
      <div className="mb-8 text-center">
        <p className="text-2xl md:text-3xl font-semibold">
          We are available in{" "}
          <span className="italic font-bold text-primary">
            {serviceCenters.length}
          </span>{" "}
          centers
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center items-center flex-wrap">
        <input
          type="text"
          placeholder="Search by city, district, or area"
          className="border p-2 rounded w-full md:w-1/4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded w-full md:w-1/5"
          value={selectedRegion}
          onChange={(e) => {
            setSelectedRegion(e.target.value);
            setSelectedDistrict("");
            setSelectedCity("");
            setSelectedArea("");
          }}
        >
          <option value="">All Regions</option>
          {regions.map((region, i) => (
            <option key={i} value={region}>
              {region}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded w-full md:w-1/5"
          value={selectedDistrict}
          onChange={(e) => {
            setSelectedDistrict(e.target.value);
            setSelectedCity("");
            setSelectedArea("");
          }}
          disabled={!districts.length}
        >
          <option value="">All Districts</option>
          {districts.map((district, i) => (
            <option key={i} value={district}>
              {district}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded w-full md:w-1/5"
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value);
            setSelectedArea("");
          }}
          disabled={!cities.length}
        >
          <option value="">All Cities</option>
          {cities.map((city, i) => (
            <option key={i} value={city}>
              {city}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded w-full md:w-1/5"
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          disabled={!areas.length}
        >
          <option value="">All Areas</option>
          {areas.map((area, i) => (
            <option key={i} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>

      {/* Map */}
      <div className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-md">
        <MapContainer
          center={flyPosition}
          zoom={8}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <FlyToLocation position={flyPosition} />
          {filteredCenters.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>
                  {center.city}, {center.district}
                </strong>
                <br />
                Areas: {center.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
