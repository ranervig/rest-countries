import Image from "next/image";

const Card = ({ country }) => {
  return (
    <div>
      <Image
        src={country.flags.svg}
        alt={`Flag of ${country.name.common}`}
        height="100"
        width="200"
      />
      <h4>{country.name.common}</h4>
      <ul>
        <li>Population: {country.population.toLocaleString()}</li>
        <li>Region: {country.region}</li>
        <li>
          Capital:{" "}
          {country.capital
            ? country.capital.map(cap => <span key={cap}>{cap}</span>) // Solve outlier case for South Africa with 3 capitals
            : "Not Listed"}
        </li>
      </ul>
    </div>
  );
};

export default Card;
