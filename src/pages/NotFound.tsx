
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-realreview-gray-100 p-4">
      <div className="text-center max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-red-500 text-2xl font-bold">404</span>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-realreview-gray-900">Page Not Found</h1>
        <p className="text-realreview-gray-600 mb-6">
          Sorry, we couldn't find the page you were looking for. It might have been moved or doesn't exist.
        </p>
        <div className="space-y-3">
          <Link to="/">
            <Button className="w-full bg-realreview-teal hover:bg-realreview-teal/90">
              Go to Homepage
            </Button>
          </Link>
          <Link to="/signin">
            <Button variant="outline" className="w-full">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
