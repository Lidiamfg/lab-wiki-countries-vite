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
      console.log(parsed)
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCountries();
  }, []);

  

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <>
    <h1>WikiCountries: Your Guide to the World</h1>
    <ul>
        {countries.map(currentCountry => (
            <Link to={`${currentCountry.alpha3Code}`} key={currentCountry._id}>
            <li>
                <img src={`https://flagpedia.net/data/flags/icon/72x54/${currentCountry.alpha2Code.toLowerCase()}.png`} />
                <h4>{currentCountry.name.official}</h4>
            </li>
            </Link>
        ))}
    </ul>
    </>
  )
}

export default HomePage;
