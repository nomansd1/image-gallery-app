import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ImageGrid from "@/components/ImageGrid";
import ProtectedRoute from "@/components/RouteProtected";
export default function Home() {
  return (
   
       <main>
      <Header />
      <Banner />
      <ImageGrid />
      <Footer />
    </main>
    

  )
}
