import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import cookie from "js-cookie";
import { Header } from "./components";
import {
  CategoriesPage,
  HomePage,
  LoginPage,
  IndividualBook,
  ProfilePage,
  SignupPage,
  BookDetailsPage,
} from "./pages";
import { UserContext } from "./contexts/UserContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";
import TestComponent from "./components/testComponent";

function App() {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const verifyUser = async () => {
      const authCookie = cookie.get("auth-token");
      if (authCookie) {
        const query = await fetch("/api/user/verify", {
          method: "post",
          body: JSON.stringify({}),
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": authCookie,
          },
        });
        const result = await query.json();
        if (result) {
          setUser(result);
        }
      }
    };
    verifyUser();
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
            {/* <Route path="/categories" element={<CategoriesPage />} /> */}
            <Route path="/books/works/:id" element={<BookDetailsPage />} />
            <Route
              path="/individual-book/:id"
              element={<IndividualBook searchTerm={searchTerm} />}
            />
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
