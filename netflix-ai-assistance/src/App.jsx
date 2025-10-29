import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from './redux/userSlice';
import { RouterProvider } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import NetflixSpinner from "./components/NetflixSpinner"

const App = () => {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
      } else {
        dispatch(removeUser());
      }
      setAuthChecked(true); // wait until Firebase confirms
    },
      (error) => {
        // console.error("Auth state error:", error);
        setAuthChecked(true); // Continue even if auth check fails
      }
    );
    return () => unsubscribe();
  }, [dispatch]);

  if (!authChecked) return <div><NetflixSpinner /></div>;

  return <RouterProvider router={AppRoutes} />;
};

export default App;
