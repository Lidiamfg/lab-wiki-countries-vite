import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllCountries = async () => {
    const response = await fetch(
      "https://ih-countries-api.herokuapp.com/countries"
    );
    if (response.ok) {
      const parsed = await response.json();
      setCountries(parsed);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCountries();
  }, []);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="container" style={{maxHeight: "90vh", overflow: scroll}}>
      <h1 style={{fontSize: "24px"}}>WikiCountries: Your Guide to the World</h1>
      <div className="list-group">
        {countries.map((currentCountry) => (
          <Link className="list-group-item list-group-item-action" to={`${currentCountry.alpha3Code}`} key={currentCountry._id}>
            
              <img
                src={`https://flagpedia.net/data/flags/icon/72x54/${currentCountry.alpha2Code.toLowerCase()}.png`}
              />
              <h4>{currentCountry.name.official}</h4>
            
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
