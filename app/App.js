
import ScrollToTop from "../app/components/UI/ScrollToTop"
import { Suspense } from "react";
import Home from "@/app/landingPage/Home"
import Loader from "./components/Shared/Loader";

const App = () => {
    return (
      <div className="App">
        <ScrollToTop />
        <Suspense fallback={<Loader/>}>
          <Home />
        </Suspense>
      </div>     
    );
  }
  
  export default App;
  