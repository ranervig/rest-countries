import Head from "next/head";
import { useState, useEffect } from "react/cjs/react.development";
import Card from "../components/Card";
import styles from "../styles/Home.module.css";

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();

  return {
    props: { countries: data },
  };
};

export default function Home({ countries }) {
  const [region, setRegion] = useState("All");
  const [displayCountries, setDisplayCountries] = useState(countries);

  useEffect(() => {
    setDisplayCountries(
      region === "All"
        ? countries
        : countries.filter(country => country.region === region)
    );
  }, [region, countries]);

  const chooseRegion = event => {
    setRegion(event.target.value);
  };

  return (
    <div className={styles.countries}>
      <Head>
        <title>REST Countries</title>
        <meta name="description" content="Country Information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.input}>
        <input type={"search"}></input>
        <select onChange={chooseRegion} className={styles.region}>
          <option value={"All"}>All</option>
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
