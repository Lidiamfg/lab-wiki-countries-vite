import { useEffect, useState } from "react";

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
    <>
    <h1>WikiCountries: Your Guide to the World</h1>
    <ul>
        {countries.map(currentCountry => (
            <li key={currentCountry._id}>
                <h4>{currentCountry.name.official}</h4>
            </li>
        ))}
    </ul>
    </>
  )
}

export default HomePage;
