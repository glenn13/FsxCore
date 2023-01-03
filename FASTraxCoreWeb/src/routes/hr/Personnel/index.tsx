import React, {Suspense} from 'react';
import {Loader} from '@app/components/common';
const PersonnelMain = React.lazy(() => import('@app/views/hr/Personnel'));

export interface PersonnelRouteProps {}

const PersonnelRoute: React.FC<PersonnelRouteProps> = () => {
    return (
        <>
            <Suspense fallback={<Loader />}>
                <PersonnelMain />
            </Suspense>
        </>
    );
};

export default PersonnelRoute;
