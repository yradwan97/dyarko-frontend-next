import Header from "../components/Shared/Header/Header"
import Footer from "../components/Shared/Footer/Footer"
import SearchPageContent from "./components/SearchPageContent";
import { Suspense } from "react";

function PropertySearch() {
  return (
    <>
      <Header />
      <Suspense>
        <SearchPageContent />
      </Suspense>
      <Footer />
    </>
  );
}

export default PropertySearch;
