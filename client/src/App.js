import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header, HomePage } from './components'
import { ProfilePage } from './components/Profile'
import { Login, SignUp } from './components/LoginOrSignUp'
import { UserContext } from './contexts/UserContext';
import { ShoppingCart, CheckoutForm, ThankYou } from './components/ShoppingCart&Checkout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import Account from './components/Profile/Account';
import Orders from './components/Profile/Orders';
import { CategoriesPage, CategoryComponent } from './components/Categories'
import Loading from './components/Loading';
import { BookDetailsPage, IndividualBook } from './components/SearchForBook'

const RouterContent = ({ setSearchTerm, searchTerm }) => {
  const location = useLocation();
  
  return (
    <div>
      {/* Making sure that the header is not shown on the login or sign up page */}
      {location.pathname !== '/login' && location.pathname !== '/signUp' && <Header setSearchTerm={setSearchTerm} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/profile/account/:userId" element={<Account />} />
        <Route path="/profile/orders/:userId" element={<Orders />} />

        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} /> 

        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/books/works/:key" element={<BookDetailsPage />} />
        <Route path="/individual-book/:id" element={<IndividualBook searchTerm={searchTerm} />} />            
        <Route path="/shoppingCart/:userId" element={<ShoppingCart />} />
        <Route path="/checkout/:userId" element={<CheckoutForm />} />
        <Route path="/thankYou/:userId" element={<ThankYou />} />

        <Route path="/categories/:category" element={<CategoryComponent />} />
      </Routes>
    </div>
  )
}

const App = () => {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const authToken = localStorage.getItem("auth-token");
  
      if (authToken && !user) {
        try {
          const response = await axios.get(`/api/user/me`, {
            headers: {
              "auth-token": authToken
            }
          });
          setUser(response.data);
        } catch (error) {
          console.error(error);
        }
      }
      setIsLoading(false);
    };
  
    fetchUser();
    // eslint-disable-next-line
  }, []);
  

  if (isLoading) {
    return <Loading />;
  }


  return (
    <BrowserRouter>
      <UserContext.Provider value={[user, setUser]}>
        <RouterContent setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      </UserContext.Provider>
    </BrowserRouter>

  );
}



export default App;
