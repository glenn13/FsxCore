import React, {Suspense} from 'react';
import {Loader} from '../components/common';
const Projects = React.lazy(() => import('../views/projects/selection'));

export interface ProjectsRouteProps {}

const ProjectsRoute: React.FC<ProjectsRouteProps> = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Projects />
      </Suspense>
    </>
  );
};

export default ProjectsRoute;
