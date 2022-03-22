import styles from "../styles/Country.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

export const getStaticPaths = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();

  const paths = data.map(country => {
    return {
      params: { cca3: country.cca3.toLowerCase() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async context => {
  const cca3 = context.params.cca3;
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${cca3}`);
  const data = await res.json();
  const country = data[0];
  //Get border countries for linking on page
  if (country.borders?.length) {
    const borderRes = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${country.borders.join(",")}`
    );
    const borderData = await borderRes.json();
    const borders = borderData.map(country => {
      return { name: country.name.common, cca3: country.cca3.toLowerCase() };
    });
    return {
      props: { country, borders },
    };
  }

  return {
    props: { country, borders: null },
  };
};

const Details = ({ country, borders }) => {
  //console.log(country);
  return (
    <main className={styles.country}>
      <Link href={"/"} passHref={true}>
        <button className={styles.back}>
          <FontAwesomeIcon icon={faAngleLeft} size={"1x"} />
          &nbsp; Back
        </button>
      </Link>
      <div className={styles.info}>
        <img alt={`${country.name.common} flag`} src={country.flags.svg} />
        <div>
          <h1>
            {country.name.common}
            {country.flag}
          </h1>
          <p>
            Native Name:{" "}
            {country.name.nativeName
              ? Object.values(country.name.nativeName)[0].official
              : country.name.official}
            <br />
            Population: {country.population.toLocaleString()}
            <br />
            Region: {country.region}
            <br />
            Sub Region: {country.subregion}
            <br />
            Capital:{" "}
            {country.capital
              ? country.capital.map(cap => <span key={cap}>{cap}</span>) // Solve outlier case for South Africa with 3 capitals
              : "Not Listed"}
            <br />
          </p>
          <p>
            Top Level Domain: {country.tld ? country.tld[0] : "None"}
            <br />
            Currencies:{" "}
            {country.currencies
              ? Object.values(country.currencies).map(cur => (
                  <span key={cur.name}>
                    {cur.name} {cur.symbol}
                  </span>
                ))
              : "Not Listed"}
            <br />
            Languages:{" "}
            {country.languages
              ? Object.values(country.languages).join(", ")
              : "Not Listed"}
            <br />
          </p>
          <h3>Border Countries: </h3>
          <div>
            {borders ? (
              borders.map(border => (
                <Link
                  href={`/${border.cca3}`}
                  key={border.cca3}
                  passHref={true}
                >
                  <button>{border.name}</button>
                </Link>
              ))
            ) : (
              <div>None</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Details;
