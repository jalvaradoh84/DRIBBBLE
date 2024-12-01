import PropTypes from 'prop-types';

const SkeletonCard = ({ delay }) => (
  <div 
    className={`group relative rounded-lg overflow-hidden cursor-pointer hover-lift animation-delay-${delay}`}
  >
    {/* Project Image Skeleton */}
    <div className="w-full aspect-[4/3] rounded-lg skeleton" />

    {/* Content Skeleton */}
    <div className="mt-4">
      <div className="flex items-center gap-3">
        {/* Avatar Skeleton */}
        <div className="w-8 h-8 rounded-full skeleton" />
        
        <div className="flex-1">
          {/* Title Skeleton */}
          <div className="h-4 rounded w-3/4 mb-2 skeleton" />
          {/* Subtitle Skeleton */}
          <div className="h-3 rounded w-1/2 skeleton" />
        </div>
      </div>

      {/* Action Buttons Skeleton */}
      <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-8 h-8 rounded-lg skeleton" />
        <div className="w-8 h-8 rounded-lg skeleton" />
      </div>
    </div>

    {/* Hover Glow Effect */}
    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-[#f082ac]/10 to-[#ea4c89]/10 blur-xl" />
    </div>
  </div>
);

SkeletonCard.propTypes = {
  delay: PropTypes.oneOf(['0', '100', '200', '300']).isRequired,
};

export default SkeletonCard;
