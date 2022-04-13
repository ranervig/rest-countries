import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Card.module.css";

const Card = ({ country }) => {
  return (
    <Link href={`/${country.cca3.toLowerCase()}`} passHref={true}>
      <div className={styles.card}>
        <div className={styles.image}>
          <Image
            src={country.flags.svg}
            alt={`Flag of ${country.name.common}`}
            layout={"fill"}
            objectFit={"scale-down"}
          />
        </div>
        <h3>{country.name.common}</h3>
        <ul>
          <li>
            <strong>Population:</strong> {country.population.toLocaleString()}
          </li>
          <li>
            <strong>Region:</strong> {country.region}
          </li>
          <li>
            <strong>Capital:</strong>{" "}
            {country.capital
              ? country.capital.map(cap => <span key={cap}>{cap}</span>) // Solve outlier case for South Africa with 3 capitals
              : "Not Listed"}
          </li>
        </ul>
      </div>
    </Link>
  );
};

export default Card;
