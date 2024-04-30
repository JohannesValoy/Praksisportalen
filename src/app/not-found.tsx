"use client";
import { useRouter } from "next/navigation";

const NotFound: React.FC = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col gap-3 justify-center items-center h-full w-full">
      <h1 className="text-3xl">404 - Page Not Found</h1>
      <p className="text-xl">The page you are looking for does not exist.</p>
      <div className="flex flex-row gap-4 p-4">
        <button className="btn btn-primary" onClick={handleGoBack}>
          Go Back
        </button>
        <button className="btn btn-primary" onClick={handleGoHome}>
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
