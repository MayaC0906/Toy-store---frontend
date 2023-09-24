import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'

import './assets/style/main.css'
import { HomePage } from './pages/HomePage'
import { store } from './store/store'
import { AboutUs } from './pages/AboutUs'
import { AppHeader } from './cmps/AppHeader'
import { ToyIndex } from './pages/ToyIndex'
import { ToyDetails } from './pages/ToyDetails'
import { ToyEdit } from './pages/ToyEdit'
import { Stores } from './pages/Stores'
import { LabelsChart } from './cmps/LabelsChart'

function App() {
  return (
    <Provider store={store}>
    <Router>
        <section className="main-layout app">
            <AppHeader />
            <main>
                <Routes>
                    <Route element={<HomePage />} path="/" />
                    <Route element={<AboutUs />} path="/about" />
                    <Route element={<Stores />} path="/store" />
                    <Route element={<ToyIndex />} path="/toy" />
                    <Route element={<LabelsChart />} path="/dashBoard" />
                    <Route element={<ToyDetails />} path="/toy/:toyId" />
                    <Route element={<ToyEdit />} path="/toy/edit" />
                    <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
                </Routes>
            </main>
            {/* <AppFooter /> */}
        </section>
    </Router>
 </Provider>
  )
}

export default App
