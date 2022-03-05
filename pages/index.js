import Head from "next/head";
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
  return (
    <div className={styles.countries}>
      <Head>
        <title>REST Countries</title>
        <meta name="description" content="Country Information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {countries.map(country => (
        <Card country={country} key={country.cca3} />
      ))}
    </div>
  );
}
