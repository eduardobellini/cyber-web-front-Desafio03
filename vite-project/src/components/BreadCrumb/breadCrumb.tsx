import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface CustomPath {
    name: string;
    path: string;
}

interface BreadcrumbProps {
    customPaths?: CustomPath[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ customPaths }) => {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);

  const pathTranslations: { [key: string]: string } = {
    shop: 'Shop',
    smartphones: 'SmartPhones',
    computers: 'Computers',
    gaming: 'Gaming',
    smartwatch: 'SmartWatch',
    headphones: 'HeadPhones',
    cameras: 'Cameras',
  };

  return (
    <nav aria-label="breadcrumb" className="hidden md:block mb-8">
      <ol className="flex items-center space-x-2 text-sm text-gray-500">
        <li>
          <Link to="/" className="hover:text-gray-800">Home</Link>
        </li>

        {customPaths ? (
            customPaths.map((path, index) => (
                <React.Fragment key={path.path}>
                    <li><span className="mx-2 text-gray-400">&gt;</span></li>
                    <li>
                        {index === customPaths.length - 1 ? (
                            <span className="text-gray-800 font-semibold">{path.name}</span>
                        ) : (
                            <Link to={path.path} className="hover:text-gray-800">{path.name}</Link>
                        )}
                    </li>
                </React.Fragment>
            ))
        ) : (
            pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                const displayName = pathTranslations[value] || value.charAt(0).toUpperCase() + value.slice(1);

                return (
                    <React.Fragment key={to}>
                        <li><span className="mx-2 text-gray-400">&gt;</span></li>
                        <li>
                            {last ? (
                                <span className="text-gray-800 font-semibold">{displayName}</span>
                            ) : (
                                <Link to={to} className="hover:text-gray-800">{displayName}</Link>
                            )}
                        </li>
                    </React.Fragment>
                );
            })
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;