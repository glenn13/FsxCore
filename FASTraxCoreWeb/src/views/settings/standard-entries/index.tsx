import React from 'react';
import {FsxDropdown} from '@app/components/common';
import StandardEntryViewer from './StandardEntryViewer';
import {useModulesList} from '@app/services/catalog/modules.service';
import {Modules} from '@app/entities/catalog/Modules';
import {ModulesStandardEntries} from '@app/entities/catalog/ModulesStandardEntries';

export interface IStandardEntryViewProps {}

const StandardEntryView: React.FC<IStandardEntryViewProps> = () => {
  const {data: modulesList, isLoading, refetch} = useModulesList();

  const [selectedModule, setSelectedModule] = React.useState(modulesList?.data[0]);

  const [modules, setModules] = React.useState<Modules[]>();
  const [standardEntries, setStandardEntries] = React.useState<ModulesStandardEntries[]>();

  const [selectedStandardEntry, setSelectedStandardEntry] = React.useState<any>();

  const [initialStandardEntry, setInitialStandardEntry] = React.useState<boolean>(false);

  React.useMemo(() => {
    if (!modulesList?.data) return;

    setModules(modulesList.data);
    setInitialStandardEntry(false);

    if (!selectedModule) {
      setStandardEntries(modulesList?.data[0].standardEntries);
      setSelectedStandardEntry(
        standardEntries?.filter(i =>
          modulesList?.data[0].standardEntries.filter(x => x.id == i.id),
        )[0],
      );
      setInitialStandardEntry(true);
      return;
    }

    setStandardEntries(selectedModule?.standardEntries);
  }, [
    modulesList,
    selectedModule,
    standardEntries,
    setSelectedStandardEntry,
    setInitialStandardEntry,
  ]);

  const currentStandardEntry = React.useMemo(() => {
    const filtered = standardEntries?.filter(i => i.modulesId === selectedModule?.id);
    if (!selectedStandardEntry) {
      return standardEntries?.[0];
    } else if (initialStandardEntry == true) {
      return selectedStandardEntry;
    } else {
      return filtered?.filter(i => i.id === selectedStandardEntry.id)[0] || standardEntries?.[0];
    }
  }, [standardEntries, selectedModule, selectedStandardEntry]);

  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="widget-box" style={{minHeight: 100}}>
        <div className="flex flex-row">
          <div className="w-col">
            <FsxDropdown
              data={modules}
              value={selectedModule}
              textField="title"
              dataItemKey="id"
              label="Module"
              styles={{width: '200px'}}
              defaultValue={modulesList?.data[0]}
              onSelect={e => modules && setSelectedModule(modules.filter(i => i.id === e)[0])}
            />
          </div>
          <div className="w-col">
            <FsxDropdown
              data={standardEntries}
              value={currentStandardEntry}
              textField="title"
              dataItemKey="id"
              label="Standard Entry"
              styles={{width: '300px'}}
              onSelect={e => setSelectedStandardEntry(standardEntries?.filter(i => i.id === e)[0])}
            />
          </div>
        </div>
      </div>
      <div className="widget-box flex-grow overflow-auto">
        {currentStandardEntry && currentStandardEntry.title && (
          <StandardEntryViewer standardEntryName={currentStandardEntry.title} />
        )}
      </div>
    </div>
  );
};

export default React.memo(StandardEntryView);

/** ORIGINAL CODE **/

// import React from 'react';
// import {FsxDropdown} from '@app/components/common';
// import StandardEntryViewer from './StandardEntryViewer';

// interface Modules {
//   id: number;
//   name: string;
// }

// interface StandardEntries {
//   id: number;
//   name: string;
//   moduleId: number;
//   module?: Modules;
// }

// const modulesOpts: Modules[] = [
//   {id: 1, name: 'CRM'},
//   {id: 2, name: 'Asset'},
//   {id: 3, name: 'Maintenance'},
//   {id: 4, name: 'Stock'},
//   {id: 5, name: 'Sales'},
//   {id: 6, name: 'Human Resource'},
//   {id: 7, name: 'Finance'},
// ];

// const standardEntryOpts: StandardEntries[] = [
//   {id: 1, name: 'Customer Type', moduleId: 1},
//   {id: 2, name: 'Contract Type', moduleId: 1},
//   {id: 3, name: 'Credit Term', moduleId: 1},
//   {id: 4, name: 'Customer Group', moduleId: 1},
//   {id: 5, name: 'Customer Personnel Position', moduleId: 1},
//   {id: 6, name: 'Customer Tier', moduleId: 1},
//   {id: 7, name: 'Customer Type', moduleId: 1},
//   {id: 8, name: 'Asset Category', moduleId: 2},
//   {id: 9, name: 'Asset Group', moduleId: 2},
//   {id: 10, name: 'Asset Unit', moduleId: 2},
//   {id: 11, name: 'Asset Type', moduleId: 2},
//   {id: 12, name: 'Failure Cause', moduleId: 3},
//   {id: 13, name: 'Asset Color', moduleId: 2},
//   {id: 14, name: 'Asset Make', moduleId: 2},
//   {id: 15, name: 'Asset Model', moduleId: 2},
//   {id: 16, name: 'Asset Ownership', moduleId: 2},
//   {id: 17, name: 'Asset Meter Type', moduleId: 2},
//   {id: 18, name: 'Fuel Type', moduleId: 2},
//   {id: 19, name: 'Transmission Type', moduleId: 2},
//   {id: 20, name: 'Engine Type', moduleId: 2},
//   {id: 21, name: 'Maintenance Service', moduleId: 3},
//   {id: 22, name: 'Maintenance Department', moduleId: 3},
//   {id: 23, name: 'Maintenance Schedule', moduleId: 3},
//   {id: 24, name: 'Service Group', moduleId: 3},
//   {id: 25, name: 'Service Type', moduleId: 3},
//   {id: 26, name: 'Repair Category', moduleId: 3},
//   {id: 27, name: 'Repair Type', moduleId: 3},
//   {id: 28, name: 'Repair Group', moduleId: 3},
//   {id: 29, name: 'Repair Level', moduleId: 3},
//   {id: 30, name: 'Repair Sub-Group', moduleId: 3},
//   {id: 31, name: 'Repair Operation', moduleId: 3},
//   {id: 32, name: 'Repair Action', moduleId: 3},
//   {id: 33, name: 'Repair Operation Action - Vehicle', moduleId: 3},
//   {id: 34, name: 'Repair Operation Action - Component', moduleId: 3},
//   {id: 35, name: 'Repair Operation Action - General Asset', moduleId: 3},
//   {id: 36, name: 'Repair Status', moduleId: 3},
//   {id: 37, name: 'Priority Level', moduleId: 3},
//   {id: 38, name: 'Estimation Type', moduleId: 3},
//   {id: 39, name: 'Type Of Fault', moduleId: 3},
//   {id: 40, name: 'Parts Usage', moduleId: 3},
//   {id: 41, name: 'Submission Type', moduleId: 3},
//   {id: 42, name: 'Repair Actions for Vehicle and Component', moduleId: 3},
//   {id: 43, name: 'Repair Actions for General Asset', moduleId: 3},
//   {id: 44, name: 'Service Package', moduleId: 3},
//   {id: 45, name: 'Service Package Parts', moduleId: 3},
//   {id: 46, name: 'Service Package Services', moduleId: 3},
//   {id: 47, name: 'Submission Type', moduleId: 3},
//   {id: 48, name: 'Department', moduleId: 6},
//   {id: 49, name: 'Personnel Group', moduleId: 6},
//   {id: 50, name: 'Personnel Position', moduleId: 6},
//   {id: 51, name: 'Skill Level', moduleId: 6},
//   {id: 52, name: 'Personnel Category', moduleId: 6},
//   {id: 53, name: 'Personnel Status', moduleId: 6},
//   {id: 54, name: 'Job Code', moduleId: 6},
//   {id: 55, name: 'Chart of Account', moduleId: 7},
//   {id: 56, name: 'Cost Center', moduleId: 7},
//   {id: 57, name: 'Currency', moduleId: 7},
//   {id: 58, name: 'Payment Type', moduleId: 7},
//   {id: 59, name: 'Finance Account Type', moduleId: 7},
//   {id: 60, name: 'Finance Account Group', moduleId: 7},
// ];

// export interface IStandardEntryViewProps {}

// const StandardEntryView: React.FC<IStandardEntryViewProps> = () => {
//   console.log("qwe");
//   const [selectedModule, setSelectedModule] = React.useState(modulesOpts[0]);

//   const standardEntries = React.useMemo(() => standardEntryOpts.filter(i => i.moduleId === selectedModule.id) || [], [selectedModule]);

//   const [selectedStandardEntry, setSelectedStandardEntry] = React.useState<any>();

//   const currentStandardEntry = React.useMemo(() => {
//     const filtered = standardEntries.filter(i => i.moduleId === selectedModule.id);
//     if (!selectedStandardEntry) {
//       return standardEntries[0];
//     } else return filtered.filter(i => i.id === selectedStandardEntry.id)[0] || standardEntries[0];
//   }, [standardEntries, selectedModule, selectedStandardEntry]);

//   return (
//     <div className="flex flex-1 flex-col h-full">
//       <div className="widget-box" style={{minHeight: 100}}>
//         <div className="flex flex-row">
//           <div className="w-col">
//             <FsxDropdown
//               data={modulesOpts}
//               value={selectedModule}
//               textField="name"
//               dataItemKey="id"
//               label="Module"
//               styles={{width: '200px'}}
//               onSelect={e => setSelectedModule(modulesOpts.filter(i => i.id === e)[0])}
//             />
//           </div>
//           <div className="w-col">
//             <FsxDropdown
//               data={standardEntries}
//               value={currentStandardEntry}
//               textField="name"
//               dataItemKey="id"
//               label="Standard Entry"
//               styles={{width: '300px'}}
//               onSelect={e => setSelectedStandardEntry(standardEntries.filter(i => i.id === e)[0])}
//             />
//           </div>
//         </div>
//       </div>
//       <div className="widget-box flex-grow overflow-auto">{currentStandardEntry && currentStandardEntry.name && <StandardEntryViewer standardEntryName={currentStandardEntry.name} />}</div>
//     </div>
//   );
// };

// export default React.memo(StandardEntryView);
