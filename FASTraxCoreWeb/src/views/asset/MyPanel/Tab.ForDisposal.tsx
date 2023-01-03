import React, {useRef} from 'react';
import Heading from '@app/views/common/Heading';
import {FsxTable} from '@app/components/common';
import {useDispositionGeneralAsset} from '@app/hooks/useDispositionGeneralAsset';
import {useDispositionVehicle} from '@app/hooks/useDispositionVehicle';
import {useDispositionComponent} from '@app/hooks/useDispositionComponent';
import DispositionGeneralAsset from '@app/entities/asset/disposition/generalasset/DispositionGeneralAsset';
import DispositionVehicle from '@app/entities/asset/disposition/vehicle/DispositionVehicle';
import DispositionComponent from '@app/entities/asset/disposition/component/DispositionComponent';
import {getDispositionGeneralAssets} from '@app/services/asset/disposition/dispositionGeneralAsset.service';
import {getDispositionVehicles} from '@app/services/asset/disposition/dispositionVehicle.service';
import {getDispositionComponents} from '@app/services/asset/disposition/dispositionComponent.service';
import FsxExcelExport from '@app/components/common/FsxExcelExport';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import moment from 'moment';

export interface TabForDisposalProps {}

const TabForDisposal: React.FC<TabForDisposalProps> = () => {
  const dispositionGeneralAssetColumns = useDispositionGeneralAsset();
  const dispositionVehicleColumns = useDispositionVehicle();
  const dispositionComponentColumns = useDispositionComponent();

  const [dispositionGeneralAsset, setDispositionGeneralAsset] = React.useState<
    DispositionGeneralAsset[]
  >();
  const [dispositionVehicle, setDispositionVehicle] = React.useState<DispositionVehicle[]>();
  const [dispositionComponent, setDispositionComponent] = React.useState<DispositionComponent[]>();

  const excelExportRefGeneralAsset = useRef<any>(null);
  const exportToExcelGeneralAsset = () => excelExportRefGeneralAsset.current?.exportAsExcel();

  const excelExportRefVehicle = useRef<any>(null);
  const exportToExcelVehicle = () => excelExportRefVehicle.current?.exportAsExcel();

  const excelExportRefComponent = useRef<any>(null);
  const exportToExcelComponent = () => excelExportRefComponent.current?.exportAsExcel();

  React.useEffect(() => {
    getDispositionGeneralAssets().then(response => setDispositionGeneralAsset(response.data));
    getDispositionVehicles().then(response => setDispositionVehicle(response.data));
    getDispositionComponents().then(response => setDispositionComponent(response.data));
  }, []);

  return (
    <div className="w-full grid grid-cols-1">
      <div className="w-full">
        <div className="flex flex-col h-full">
          <Heading shadow title="General Assets" />
          <FsxExcelExport
            fileName={`ForDisposal_GeneralAssets_${moment().format('YYYYMMDDHHmm')}`}
            data={dispositionGeneralAsset}
            ref={excelExportRefGeneralAsset}
            columns={dispositionGeneralAssetColumns.columns}>
            <FsxTable
              className="flex-grow"
              data={dispositionGeneralAsset}
              columns={dispositionGeneralAssetColumns.columns}>
              <FsxTableActions onExport={exportToExcelGeneralAsset} />
            </FsxTable>
          </FsxExcelExport>
        </div>
      </div>
      <div className="w-full">
        <div className="flex flex-col h-full">
          <Heading shadow title="Vehicles" />
          <FsxExcelExport
            fileName={`ForDisposal_Vehicles_${moment().format('YYYYMMDDHHmm')}`}
            data={dispositionVehicle}
            ref={excelExportRefVehicle}
            columns={dispositionVehicleColumns.columns}>
            <FsxTable
              className="flex-grow"
              data={dispositionVehicle}
              columns={dispositionVehicleColumns.columns}>
              <FsxTableActions onExport={exportToExcelVehicle} />
            </FsxTable>
          </FsxExcelExport>
        </div>
      </div>
      <div className="w-full">
        <div className="flex flex-col h-full">
          <Heading shadow title="Components" />
          <FsxExcelExport
            fileName={`ForDisposal_Components_${moment().format('YYYYMMDDHHmm')}`}
            data={dispositionComponent}
            ref={excelExportRefComponent}
            columns={dispositionComponentColumns.columns}>
            <FsxTable
              className="flex-grow"
              data={dispositionComponent}
              columns={dispositionComponentColumns.columns}>
              <FsxTableActions onExport={exportToExcelComponent} />
            </FsxTable>
          </FsxExcelExport>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TabForDisposal);
