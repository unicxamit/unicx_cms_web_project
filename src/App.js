import RootLayout from "./layouts/root-layout";
import Loader from "./app/common/loader";
import ScrollToTop from "./globals/scroll-to-top";
import { useState, useEffect } from "react";


function App() {

  const [isLoading, setLoading] = useState(true);
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <ScrollToTop />
      <RootLayout />
    </>
  )
}

export default App;
