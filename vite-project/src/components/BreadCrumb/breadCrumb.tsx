import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  
  const pathnames = location.pathname.split('/').filter((x) => x);

  const pathTranslations: { [key: string]: string } = {
    shop: 'Shop',
    phones: 'Phones',
    computers: 'Computers',
    gaming: 'Gaming',
  };

  return (
    <nav aria-label="breadcrumb" className="hidden md:block mb-8">
      <ol className="flex items-center space-x-2 text-sm text-gray-500">
        <li>
          <Link to="/" className="hover:text-gray-800">
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const displayName = pathTranslations[value] || value.charAt(0).toUpperCase() + value.slice(1);

          return (
            <React.Fragment key={to}>
              <li>
                <span className="mx-2 text-gray-400">&gt;</span>
              </li>
              <li>
                {last ? (
                  <span className="text-gray-800 font-semibold">{displayName}</span>
                ) : (
                  <Link to={to} className="hover:text-gray-800">
                    {displayName}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;