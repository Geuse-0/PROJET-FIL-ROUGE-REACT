import DetailProduits from './Frontend/Page/DetailProduit'
import Catalogue from "./Frontend/Page/Catalogue"
import Panier from './Frontend/Page/Panier'
import Login from './Frontend/Page/Login'
import PrivateRoute from './Backend/PrivateRoute'
import Admin from './Frontend/Page/Admin'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./Frontend/Page/Header";
function App() {


  return (
    <BrowserRouter>
     <Header/>
     <Routes>
      <Route path="/" element={<Catalogue/>}/>
      <Route path="/product/:id" element={<DetailProduits/>}/> 
      <Route path='/panier' element={<Panier/>}/>

      <Route path="/login" element={<Login />} />
      <Route  path="/admin" element={<PrivateRoute> <Admin/> </PrivateRoute>
          }/>
     </Routes>
    </BrowserRouter>
  )
}

export default App
