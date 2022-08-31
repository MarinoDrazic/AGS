import Navbar from "./shared/navbar";
import Footer from "./shared/footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
