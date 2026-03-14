import { BrowserRouter } from "react-router"
import { AppRoutes } from "./app/routes"
import { Suspense } from "react"
import Loader from "./components/loader"

function App() {

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader show={true} />}>
        {AppRoutes}
      </Suspense>
    </BrowserRouter>
  )
}

export default App
