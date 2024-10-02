// ProductCardSkeleton.tsx
const ProductCardSkeleton = () => {
  return (
    <div className="select-none animate-pulse">
      <div className="relative overflow-hidden">
        {/* Image skeleton */}
        <div className="relative w-full aspect-[3/4] bg-gray-200 " />

        {/* Badge skeleton */}
        <div className="absolute flex flex-col gap-2 top-4 left-4">
          <div className="w-12 h-6 bg-gray-200 rounded-full" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="flex flex-col items-start gap-2 mt-3">
        {/* Rating skeleton */}
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-4 h-4 bg-gray-200 rounded-full" />
          ))}
        </div>

        {/* Title skeleton */}
        <div className="w-3/4 h-5 bg-gray-200 rounded" />

        {/* Price skeleton */}
        <div className="flex items-center gap-3 pb-3">
          <div className="w-16 h-5 bg-gray-200 rounded" />
          <div className="w-16 h-5 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
