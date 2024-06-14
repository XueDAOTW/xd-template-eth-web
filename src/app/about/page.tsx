import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
    return(
        <main className="bg-test bg-cover bg-center">
            <Navbar />
            <h1 className="flex min-h-screen justify-center items-center text-center text-3xl font-bold">This is About Page</h1>
            <Footer />
        </main>
    )
}