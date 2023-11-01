import { useState, useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';
import { AppContext } from 'contexts/AppContext';
import { CurrentUserContext } from 'contexts/CurrentUserContext';
import useWindowSize from 'hooks/useWindowSize';
import Layout from 'components/Layout/Layout';
import Login from 'components/Login/Login';
import Landing from 'components/Landing/Landing';
import Movies from 'components/Movies/Movies';
import Profile from 'components/Profile/Profile';
import Register from 'components/Register/Register';
import SavedMovies from 'components/SavedMovies/SavedMovies';
import PageNotFound from 'components/PageNotFound/PageNotFound';

import './App.css';

function App() {
  const { width } = useWindowSize();

  const [currentUser, setCurrentUser] = useState({
    name: 'Виталий',
    email: 'pochta@yandex.ru',
    password: '**************',
  });

  const [isLoggedIn, SetIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isLargeDevice, setIsLargeDevice] = useState(false);

  useEffect(() => {
    if (width > 768) {
      setIsLargeDevice(true);
    } else {
      setIsLargeDevice(false);
    }
  }, [width]);

  function onRegister() {
    console.log('Register submit click!');
  }

  function onLogin() {
    console.log('Login submit click!');
  }

  function onProfileEdit() {
    console.log('Profile submit click!');
  }

  function handleMenuClick() {
    setIsMenuOpen((state) => !state);
  }

  return (
    <AppContext.Provider
      value={{
        width,
        isLargeDevice,
        isLoggedIn,
        isLoading,
        isError,
        isMenuOpen,
        onClickMenu: handleMenuClick,
      }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="movies" element={<Movies />} />
            <Route path="saved-movies" element={<SavedMovies />} />
            <Route
              path="profile"
              element={<Profile onSubmit={onProfileEdit} />}
            />
          </Route>
          <Route path="signup" element={<Register onSubmit={onRegister} />} />
          <Route path="signin" element={<Login onSubmit={onLogin} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
