
import { Button } from "@/components/ui/button";
import WebsiteLink from "@/components/WebsiteLink";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
        <WebsiteLink text="Return to Homepage" url="/" internal={true} />
      </div>
    </div>
  );
};

export default NotFound;
