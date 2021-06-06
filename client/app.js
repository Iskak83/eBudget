import React, {Suspense, lazy} from 'react'
const Navbar = lazy(() => import('./components/navbar'))
import Routes from './routes'

const App = () => {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
        <Routes />
      </Suspense>
    </div>
  )
}

export default App
