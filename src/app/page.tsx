import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-banner-bg bg-cover bg-center">
      <Navbar />
      <Banner />
      <Footer />
    </main>
  );
}
