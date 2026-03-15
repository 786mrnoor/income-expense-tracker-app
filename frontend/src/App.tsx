import { BrowserRouter } from "react-router"
import { AppRoutes } from "./app/routes"
import { Suspense } from "react"
import Loader from "./components/loader"
import { Toaster } from "react-hot-toast"

function App() {

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader show={true} />}>
        {AppRoutes}
      </Suspense>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
