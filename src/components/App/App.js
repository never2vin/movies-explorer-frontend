import { useState, useEffect, useRef } from 'react';

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from 'contexts/AppContext';
import { CurrentUserContext } from 'contexts/CurrentUserContext';
import useWindowSize from 'hooks/useWindowSize';
import useLocalStorage from 'hooks/useLocalStorage';
import Layout from 'components/Layout/Layout';
import Login from 'components/Login/Login';
import Landing from 'components/Landing/Landing';
import Movies from 'components/Movies/Movies';
import Profile from 'components/Profile/Profile';
import Register from 'components/Register/Register';
import SavedMovies from 'components/SavedMovies/SavedMovies';
import PageNotFound from 'components/PageNotFound/PageNotFound';
import ProtectedRoute from 'hoc/ProtectedRoute';
import api from 'utils/MainApi';
import { getAllMovies } from 'utils/MoviesApi';
import {
  MOVIES_API_URL,
  MIDDLE,
  SMALL,
  LARGE_PARAMS,
  MIDDLE_PARAMS,
  SMALL_PARAMS,
} from 'utils/constants';

import './App.css';

function App() {
  const { width } = useWindowSize();

  const [token, setToken] = useLocalStorage('jwt', '');
  const [currentUser, setCurrentUser] = useState({});

  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [moviesState, setMoviesState] = useLocalStorage('moviesState', {});
  const [savedState, setSavedState] = useLocalStorage('savedState', {});

  const [isFirstSearch, setIsFirstSearch] = useState(false);

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [state, setState] = useState('idle');
  const [status, setStatus] = useState(null);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const [isLargeDevice, setIsLargeDevice] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const paramRef = useRef({});

  useEffect(() => {
    if (width > SMALL + 1) {
      setIsLargeDevice(true);
    } else {
      setIsLargeDevice(false);
    }
  }, [width]);

  useEffect(() => {
    if (width > MIDDLE) {
      paramRef.current = LARGE_PARAMS;
    } else if (width > SMALL) {
      paramRef.current = MIDDLE_PARAMS;
    } else {
      paramRef.current = SMALL_PARAMS;
    }
  }, [width]);

  useEffect(() => {
    if (!token) {
      return;
    }

    setLoading(true);

    api
      .getUserInfo(token)
      .then((data) => {
        setCurrentUser(data);
        setLoggedIn(true);

        if (pathname === '/signin' || pathname === '/signup') {
          navigate('/movies', { replace: true });
        } else {
          navigate(pathname);
        }

        setLoading(false);
      })
      .catch(console.error);
  }, [token]);

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);

      api
        .getAllInitialData(token)
        .then((data) => {
          const [user, movies] = data;
          setCurrentUser(user);
          setSavedMovies(movies.filter((i) => i.owner === user._id));
          setMoviesState({
            ...moviesState,
            isShortChecked: false,
            isShortDisabled: false,
            searchValue: '',
          });
        })
        .catch(console.error)
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isLoggedIn, token]);

  useEffect(() => {
    if (isFirstSearch) {
      setLoading(true);

      getAllMovies()
        .then((res) =>
          setMovies(
            res.map(
              ({
                id,
                country,
                director,
                duration,
                year,
                description,
                image,
                trailerLink,
                nameRU,
                nameEN,
              }) => ({
                country,
                director,
                duration,
                year,
                description,
                image: `${MOVIES_API_URL}${image.url}`,
                trailerLink,
                thumbnail: `${MOVIES_API_URL}${image.formats.thumbnail.url}`,
                movieId: id,
                nameRU,
                nameEN,
              })
            )
          )
        )
        .catch((error) => {
          console.log(error);

          setIsError(true);
          setMoviesState({
            ...moviesState,
            isShortChecked: false,
            isShortDisabled: true,
            isSubmitDisabled: false,
            searchValue: '',
            errorMessage:
              '«Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз»',
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isFirstSearch]);

  useEffect(() => {
    if (!isLoggedIn) return;

    if (savedMovies.length === 0)
      return setSavedState({
        ...savedState,
        isShortDisabled: true,
        isSubmitDisabled: true,
        errorMessage: '«Нет сохраненных фильмов.»',
      });

    return setSavedState({
      ...savedState,
      isShortDisabled: false,
      isSubmitDisabled: false,
      errorMessage: '',
    });
  }, [savedMovies]);

  function onRegister(data) {
    setLoading(true);

    api
      .registerUser(data)
      .then((res) => {
        if (res) onLogin(data);
      })
      .catch((error) => {
        console.log(error);

        setState('error');
        setStatus(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function onLogin(data) {
    setLoading(true);

    api
      .authorizeUser(data)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setToken(res.token);
      })
      .catch((error) => {
        console.log(error);

        setState('error');
        setStatus(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function onProfileEdit(data) {
    console.log('Profile submit click!', data);

    if (isLoading) return;

    setLoading(true);

    api
      .setUserInfo(data, token)
      .then((res) => {
        console.log('Обновление профиля прошло успешно!', res);

        setCurrentUser(res);
        setState('success');
        setStatus('ok');
      })
      .catch((error) => {
        console.log(error);

        setState('error');
        setStatus(error);
      })
      .finally(() => setLoading(false));
  }

  function onSaveMovie(data) {
    api
      .saveMovie(data, token)
      .then((res) => {
        setSavedMovies([...savedMovies, res]);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  function onRemoveMovie(movie) {
    api
      .removeMovie(movie._id, token)
      .then((res) => {
        setSavedMovies((state) => state.filter((i) => i._id !== movie._id));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  function handleMenuClick() {
    setMenuOpen((state) => !state);
  }

  function onSignOut() {
    setLoggedIn(false);
    setIsFirstSearch(false);
    setCurrentUser({});
    setMoviesState({});
    setSavedState({});
    setMovies([]);
    setToken('');

    localStorage.clear();

    navigate('/', { replace: true });
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
        state,
        status,
        paramRef,
        savedMovies,
        movies,
        setMovies,
        moviesState,
        setMoviesState,
        savedState,
        setSavedState,
        isFirstSearch,
        setIsFirstSearch,
        setState,
        setLoading,
        onClickMenu: handleMenuClick,
        onSaveMovie,
        onRemoveMovie,
      }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route
              path="movies"
              element={
                <ProtectedRoute>
                  <Movies />
                </ProtectedRoute>
              }
            />
            <Route
              path="saved-movies"
              element={
                <ProtectedRoute>
                  <SavedMovies />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile onSubmit={onProfileEdit} onLogout={onSignOut} />
                </ProtectedRoute>
              }
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
