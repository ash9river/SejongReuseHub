import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <>
      <header />
      <main>
        <Outlet />
      </main>
      <footer />
    </>
  );
}

export default MainLayout;
