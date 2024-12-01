import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Logo = ({ className = '' }) => {
  return (
    <Link 
      to="/" 
      className={`inline-flex items-center ${className}`}
      aria-label="RIBBBLE Home"
    >
      <h1 className="text-[24px] font-black tracking-tighter text-[#0d0c22] transition-all duration-300 group">
        <span className="inline-flex">
          <span className="transition-transform duration-300 group-hover:-rotate-6 group-hover:text-[#ea4c89]">R</span>
          <span className="transition-transform duration-300 group-hover:rotate-3 group-hover:text-[#ea4c89]">I</span>
          <span className="transition-transform duration-300 group-hover:-rotate-3 group-hover:text-[#f082ac]">B</span>
          <span className="transition-transform duration-300 group-hover:rotate-6 group-hover:text-[#f082ac]">B</span>
          <span className="transition-transform duration-300 group-hover:-rotate-3 group-hover:text-[#f082ac]">B</span>
          <span className="transition-transform duration-300 group-hover:rotate-6 group-hover:text-[#ea4c89]">L</span>
          <span className="transition-transform duration-300 group-hover:-rotate-3 group-hover:text-[#ea4c89]">E</span>
        </span>
      </h1>
    </Link>
  );
};

Logo.propTypes = {
  className: PropTypes.string
};

export default Logo;
