import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const rawPathnames = location.pathname.split('/').filter((x) => x);

  const foundationPaths = ["overview", "colors", "typography", "spacing", "layout", "radius", "icons", "shadows"];
  const isGuideComponentsPath = rawPathnames[0] === 'guide' && rawPathnames[1] === 'components';

  const pathMapping: Record<string, string> = {
    foundation: 'Foundation',
    overview: 'Overview',
    colors: 'Colors',
    typography: 'Typography',
    spacing: 'Spacing',
    layout: 'Layout',
    radius: 'Radius',
    icons: 'Icons',
    shadows: 'Shadows',
    guide: 'Guide',
    components: 'Components',
    button: 'Button',
    'site-settings': 'Site Settings',
    theme: 'Theme',
    component: 'Components',
  };

  let displayPathnames = [...rawPathnames];

  // Handle root path ('/') as Foundation > Overview
  if (rawPathnames.length === 0) {
    displayPathnames = ['foundation', 'overview'];
  } else if (isGuideComponentsPath) {
    displayPathnames = ['components'];
    if (rawPathnames[2]) {
      displayPathnames.push(rawPathnames[2]);
    }
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

            if (isGuideComponentsPath && currentPathSegment === 'components') {
              currentTo = '/guide/components';
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
