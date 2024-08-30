import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import './App.css';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json";

// African countries and their capitals
const africanCountries = {
  "Algeria": "Algiers",
  "Angola": "Luanda",
  "Benin": "Porto-Novo",
  "Botswana": "Gaborone",
  "Burkina Faso": "Ouagadougou",
  "Burundi": "Bujumbura",
  "Cape Verde": "Praia",
  "Cameroon": "Yaoundé",
  "Central African Rep.": "Bangui",
  "Chad": "N'Djamena",
  "Comoros": "Moroni",
  "Dem. Rep. Congo": "Kinshasa",
  "Congo": "Brazzaville",
  "Côte d'Ivoire": "Yamoussoukro",
  "Djibouti": "Djibouti",
  "Egypt": "Cairo",
  "Equatorial Guinea": "Malabo",
  "Eritrea": "Asmara",
  "Swaziland": "Mbabane",
  "Ethiopia": "Addis Ababa",
  "Gabon": "Libreville",
  "Gambia": "Banjul",
  "Ghana": "Accra",
  "Guinea": "Conakry",
  "Guinea-Bissau": "Bissau",
  "Kenya": "Nairobi",
  "Lesotho": "Maseru",
  "Liberia": "Monrovia",
  "Libya": "Tripoli",
  "Madagascar": "Antananarivo",
  "Malawi": "Lilongwe",
  "Mali": "Bamako",
  "Mauritania": "Nouakchott",
  "Mauritius": "Port Louis",
  "Morocco": "Rabat",
  "Mozambique": "Maputo",
  "Namibia": "Windhoek",
  "Niger": "Niamey",
  "Nigeria": "Abuja",
  "Rwanda": "Kigali",
  "Sao Tome and Principe": "Sao Tome",
  "Senegal": "Dakar",
  "Seychelles": "Victoria",
  "Sierra Leone": "Freetown",
  "Somalia": "Mogadishu",
  "South Africa": "Pretoria",
  "S. Sudan": "Juba",
  "Sudan": "Khartoum",
  "Tanzania": "Dodoma",
  "Togo": "Lomé",
  "Tunisia": "Tunis",
  "Uganda": "Kampala",
  "W. Sahara": "Laayoune",
  "Zambia": "Lusaka",
  "Zimbabwe": "Harare",
  "eSwatini": "Mbabane"
};

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  console.log("Rendering App component");

  return (
    <div className="App">
      <h1>Map of Africa</h1>
      <div className="map-container">
        <ComposableMap 
          projection="geoMercator" 
          projectionConfig={{ 
            scale: 450,
            center: [20, 3]  // Adjust these values to center the map as desired
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) => 
              geographies.map((geo) => {
                const isAfrican = africanCountries.hasOwnProperty(geo.properties.name);
                return isAfrican ? (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={selectedCountry?.name === geo.properties.name ? "#F53" : "#EAEAEC"}
                    stroke="#D6D6DA"
                    onClick={() => {
                      const name = geo.properties.name;
                      const capital = africanCountries[name];
                      setSelectedCountry({ name, capital });
                      console.log("Clicked country:", name);
                    }}
                    style={{
                      default: { outline: 'none' },
                      hover: { fill: "#F53", outline: 'none' },
                      pressed: { outline: 'none' },
                    }}
                  />
                ) : null;
              })
            }
          </Geographies>
        </ComposableMap>
      </div>
      {selectedCountry && (
        <div className="country-info">
          <h2>{selectedCountry.name}</h2>
          <p>Capital: {selectedCountry.capital || 'N/A'}</p>
        </div>
      )}
    </div>
  );
};

export default App;