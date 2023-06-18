import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Checkout, Header } from './components';
import { 
  CategoriesPage, 
  HomePage, 
  LoginPage, 
  IndividualBook, 
  ProfilePage, 
  SignupPage, 
  BookDetailsPage 
} from './pages';
import { UserContext } from './contexts/UserContext';
import { CartContext } from './contexts/CartContext'
import { ShoppingCart, CheckoutForm } from './components';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import TestComponent from './components/testComponent';

const App = () => {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { cartItems, calculateTotalWithoutTax, calculateSalesTax, calculateShippingCost, calculateTotalWithTaxAndShipping } = useContext(CartContext);


  useEffect(() => {
    console.log("Testing App.js UseEffect for the'/me/' route");
    const authToken = localStorage.getItem("auth-token"); 
    if (authToken) {
      axios
        .get(`/api/user/me`, {
          headers: {
            "auth-token": authToken
          }
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={[user, setUser]}>
        <Header setSearchTerm={setSearchTerm} />
        <div className="pt-3 px-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/test" element={<TestComponent />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/books/works/:key" element={<BookDetailsPage />} />
            <Route path="/individual-book/:id" element={<IndividualBook searchTerm={searchTerm} />} />            
            <Route path="/book-details/:key" element={<BookDetailsPage />} />
            <CartContext.Provider value={{ 
                cartItems: cartItems, 
                calculateTotalWithoutTax, 
                calculateSalesTax, 
                calculateShippingCost, 
                calculateTotalWithTaxAndShipping
                }}>
                <Route path="/shoppingCart/:userId" element={<ShoppingCart />} />
                <Route path="/checkout/:userId" element={<CheckoutForm />} />
            </CartContext.Provider>
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
