// components/Skeleton.js
const Skeleton = () => {
  return (
    <div className="animate-pulse space-y-4 relative z-10 bg-red">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="h-4 bg-gray-300 rounded w-full"></div>
    </div>
  );
};

export default Skeleton;
