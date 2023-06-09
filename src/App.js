import UserLogin from './component/Authentication/Login';
// import Navbar from './component/Navbar';
import { Routes, Route } from 'react-router-dom'
import Registration from './component/Authentication/Registration';
import ResetPassword from './component/Authentication/ResetPassword';
import ConfirmPassword from './component/Authentication/ConfirmPassword';
import ShopAdd from './component/ShopOwner/ShopAdd';
import LoginRedirect from './component/Authentication/LoginRedirect';
import ShopView from './component/ShopOwner/ShopView';
import AddPizza from './component/Pizza/AddPizza';
import NoShopOwner from './component/ShopOwner/NoShopOwner';
import Frontend from './component/commonFolder/Frontend';
import ShopOwner from './component/commonFolder/ShopOwner';
import NoPage from './component/commonFolder/NoPage';
import User from './component/userFunctionality/User';
import Sidebar from './component/userFunctionality/Sidebar';
import CartItem from './component/userFunctionality/cart/CartItem';
import ShowAddress from './component/userFunctionality/ShowAddress';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Frontend />}>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/password_reset/confirm/" element={<ConfirmPassword />} />
          <Route path="/shopAdd" element={<ShopAdd />} />
          <Route path="/loginredirect" element={<LoginRedirect />} />
          <Route path='/shop-list' element={<ShopView />} />
          <Route path='/no-shop-owner' element={<NoShopOwner />} />
          <Route path='*' element={<NoPage/>}/>
        </Route>
        <Route path='shop-owner' element={<ShopOwner/>}>
          <Route path="add-pizza" element={<AddPizza/>}/>
          <Route path='*' element={<NoPage/>}/>
        </Route>
        <Route path='user' element={<User/>}>
          <Route index  element={<Sidebar/>}/>
          <Route path='show-address' element={<ShowAddress/>}/>
          <Route path='cart' element={<CartItem/>}/>
        </Route>
        
      </Routes>
    </>
  );
}

export default App;
