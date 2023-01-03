import React, {Suspense} from 'react';
import {Loader} from '../../components/common';
// const HumanResourcesMain = React.lazy(() => import('../../views/hr'));
const HumanResourcesMain = React.lazy(() => import('@app/views/hr/Personnel'));

export interface HumanResourcesRouteProps {}

const HumanResourcesRoute: React.FC<HumanResourcesRouteProps> = () => {
    return (
        <>
            <Suspense fallback={<Loader />}>
                <HumanResourcesMain />
            </Suspense>
        </>
    );
};

export default HumanResourcesRoute;
