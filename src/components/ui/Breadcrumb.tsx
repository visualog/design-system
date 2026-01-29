import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const rawPathnames = location.pathname.split('/').filter((x) => x);

  const foundationPaths = ["colors", "typography", "spacing", "layout", "radius", "icons", "shadows"];

  const pathMapping: Record<string, string> = {};

  let displayPathnames = [...rawPathnames];

  // Handle root path ('/') specifically for Colors page
  if (rawPathnames.length === 0) {
    displayPathnames = ['foundation', 'colors'];
  } else if (rawPathnames.length > 0 && foundationPaths.includes(rawPathnames[0])) {
    displayPathnames.unshift("foundation");
  }

  const capitalize = (s: string) => {
    if (typeof s !== 'string' || s.length === 0) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <nav className="flex items-center text-label-sm text-muted-foreground" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {displayPathnames.map((value, index) => {
          const last = index === displayPathnames.length - 1;
          const isFoundationSegment = (value === 'foundation');

          let currentPathSegment = '';
          let currentTo = '/';

          if (isFoundationSegment) {
            currentPathSegment = 'foundation';
            currentTo = '/';
          } else {
            const originalSegmentIndex = rawPathnames.indexOf(value);
            if (originalSegmentIndex !== -1) {
              currentPathSegment = value;
              currentTo = `/${rawPathnames.slice(0, originalSegmentIndex + 1).join('/')}`;
            } else {
              currentPathSegment = value;
              currentTo = `/${value}`;
            }
          }

          return (
            <li key={currentTo}>
              <div className="flex items-center">
                {index > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground/50" />}
                {
                  last ? (
                    <span className={`${index > 0 ? 'ml-1 md:ml-2' : ''} text-label-sm font-bold text-foreground`}>
                      {pathMapping[currentPathSegment] || capitalize(currentPathSegment)}
                    </span>
                  ) : isFoundationSegment ? (
                    <span className={`${index > 0 ? 'ml-1 md:ml-2' : ''} text-label-sm font-bold text-muted-foreground`}>
                      {pathMapping[currentPathSegment] || capitalize(currentPathSegment)}
                    </span>
                  ) : (
                    <NavLink to={currentTo} className={`${index > 0 ? 'ml-1 md:ml-2' : ''} text-label-sm font-bold text-muted-foreground hover:text-primary transition-colors`}>
                      {pathMapping[currentPathSegment] || capitalize(currentPathSegment)}
                    </NavLink>
                  )
                }
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;