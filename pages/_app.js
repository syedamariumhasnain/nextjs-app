import Layout from "../components/layout/Layout";
import "../styles/globals.css";

// some commponents or settings that affects all your pages
// are done inside _app.js file i.e. Layout 

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
