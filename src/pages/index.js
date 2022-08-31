import Layout from "../components/layoutMain";
import LandingPage from "../components/landingPage/landingPage";

export default function Home() {
  const openTests = () => {
    const path = "mochawesome-report\\mochawesome.html";
    window.open(path);
  };

  return (
    <Layout>
      <LandingPage />
    </Layout>
  );
}
