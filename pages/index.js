import Head from "next/head";
import { useState, useEffect } from "react/cjs/react.development";
import Card from "../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Home.module.css";

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();
  //eliminate unnecessary data for page load
  const countries = data.map(country => {
    return {
      name: country.name,
      cca3: country.cca3,
      region: country.region,
      flags: country.flags,
      population: country.population,
      capital: country.capital ? country.capital : null,
    };
  });
  //sort  countries alphabetically
  countries.sort((a, b) => (a.name.common > b.name.common ? 1 : -1));
  return {
    props: { countries },
  };
};

export default function Home({ countries }) {
  const [region, setRegion] = useState("All");
  const [displayCountries, setDisplayCountries] = useState(countries);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setDisplayCountries(
      region === "All"
        ? countries
        : countries.filter(country => country.region === region)
    );
  }, [search, region, countries]);

  useEffect(() => {
    if (search) {
      document.querySelector("input");
      setDisplayCountries(
        countries.filter(country =>
          country.name.common.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, countries]);

  const chooseRegion = event => {
    setRegion(event.target.value);
  };

  const changeSearch = event => {
    setSearch(event.target.value);
  };

  return (
    <div className={styles.countries}>
      <Head>
        <title>REST Countries</title>
        <meta name="description" content="Country Information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.input}>
        <div className={styles.search}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.icon} />
          <input
            type={"search"}
            placeholder={"Search for a country..."}
            onChange={changeSearch}
          />
        </div>

        <select onChange={chooseRegion} className={styles.region}>
          <option value={"All"}>Filter by region</option>
          <option value={"Africa"}>Africa</option>
          <option value={"Americas"}>Americas</option>
          <option value={"Asia"}>Asia</option>
          <option value={"Europe"}>Europe</option>
          <option value={"Oceania"}>Oceania</option>
        </select>
      </div>
      {displayCountries.map(country => (
        <Card country={country} key={country.cca3} />
      ))}
    </div>
  );
}
