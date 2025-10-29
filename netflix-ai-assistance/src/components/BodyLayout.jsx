// components/BodyLayout.js
import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './Header';

const BodyLayout = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user && location.pathname === '/') {
      navigate('/browse');
    }

    if (!user && location.pathname !== '/') {
      navigate('/');
    }
  }, [user, location.pathname, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow "> {/* Adjust pt-16 based on your header height */}
        <Outlet />
      </main>
    </div>
  );
};

export default BodyLayout;