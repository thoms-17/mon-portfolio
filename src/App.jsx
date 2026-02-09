import Layout from "./layout/Layout";
import Home from "./pages/Home";
import SEO from "./components/SEO";

function App() {
  return (
    <>
      <SEO />
      <Layout>
        <Home />
      </Layout>
    </>
  );
}

export default App;
