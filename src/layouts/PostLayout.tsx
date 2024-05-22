import Footer from 'components/UI/Footer';
import Header from 'components/UI/Header';
import { Outlet } from 'react-router-dom';

function PostLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default PostLayout;
