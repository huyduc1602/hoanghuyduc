import { Link } from 'react-router-dom';
import { Meta } from "../components";

const NotFound = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-5">
      <Meta
        title="404 Not Found"
        description="The page you're looking for doesn't exist"
        keywords="404, not found, error"
        image="notfound-preview.png"
      />
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Oops! Page not found</p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Go back home
      </Link>
    </section>
  );
};

export default NotFound;