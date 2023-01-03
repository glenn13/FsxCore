import React from 'react';

import GridToolbarCounter, {counterColors} from '@app/components/common/GridToolbarCounter';
import GridToolbar, {ViewOptionTypes} from '@app/components/common/GridToolbar';
import GridToolbarItem from '@app/components/common/GridToolbar/GridToolbarItem';

export interface PersonnelViewOptionProps {}

const PersonnelViewOption: React.FC<PersonnelViewOptionProps> = () => {
    const [viewOption, setViewOption] = React.useState<keyof ViewOptionTypes>();

    return (
        <GridToolbar
        options={['Summary', 'PerRecord']}
        defaultView="Summary"
        onViewOptionsChange={e => setViewOption(e.value)}
        >
            <GridToolbarItem.Right>
                <GridToolbarCounter
                    className="mr-4"
                    title="WO In-Progress"
                    color={counterColors.portage}
                    value={0}
                />
                <GridToolbarCounter
                    className="mr-4"
                    title="Proforma"
                    color={counterColors.glacier}
                    value={0}
                />
                <GridToolbarCounter title="Awaiting Approval" color={counterColors.chardonnay} value={0} />
            </GridToolbarItem.Right>
        </GridToolbar>
    );
};

export default React.memo(PersonnelViewOption);
