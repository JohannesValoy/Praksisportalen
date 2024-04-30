/**
 * A standard loading spinner used throughout the application.
 * @returns A loading spinner.
 */
export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
}
