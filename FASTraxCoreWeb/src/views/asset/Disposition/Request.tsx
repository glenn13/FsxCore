// import React from 'react';
// import format from 'date-fns/format';
// import {useFormikContext} from 'formik';
// import {TabStrip, TabStripTab} from '@progress/kendo-react-layout';
// import differenceInCalendarMonths from 'date-fns/differenceInCalendarMonths';
// import DispositionDetails from './Details';
// import AssetFormDisposition from './AssetForm';
// import Heading from '@app/views/common/Heading'; 
// import AssignedEmployee from './AssignedEmployee';
// import AssignedTo from '@app/entities/types/AssignedTo';
// import {useAttachments} from '@app/hooks/useAttachments';
// import {Asset} from '@app/entities/asset/inventory/Asset';
// import DispositionAssetInformation from './AssetInformation';
// import {getTypeSafePropertyAsString} from '@app/helpers/types';
// import {Carousel, FsxNumericTextBox} from '@app/components/common';
// import DispositionAttachmentsAndApprovals from './AttachmentsApprovals';
// import EntityAttachmentDocument from '@app/entities/global/EntityAttachment';
// import {EntityAttachmentImage} from '@app/entities/global/EntityAttachmentImage';
// import EntityDisposition from '@app/entities/asset/disposition/EntityDisposition';

// export interface DispositionRequestProps {
//   asset: Asset;
//   assignedTo?: AssignedTo;
// }

// const imagesProperty = getTypeSafePropertyAsString<EntityDisposition>('images');
// const documentsProperty = getTypeSafePropertyAsString<EntityDispositio n>('documents');

// const DispositionRequest: React.FC<DispositionRequestProps> = ({asset, assignedTo}) => {
//   const [selected, setSelected] = React.useState(0);
//   const formik = useFormikContext<EntityDisposition<Asset>>();
//   const reference = formik.values.reference;
//   const assetOwnership = reference?.assetOwnership;

//   const totalPurchaseCost = React.useMemo(() => {
//     if (!assetOwnership) return 0;

//     return (
//       assetOwnership.shippingCharges +
//       assetOwnership.acquisitionAmount +
//       assetOwnership.otherCharges +
//       assetOwnership.taxCharges
//     );
//   }, [assetOwnership]);

//   const assetAge = React.useMemo(() => {
//     if (!reference) return 0;

//     const inventoryDate = format(new Date(reference.inventoryDate), 'M-d-Y');

//     return differenceInCalendarMonths(new Date(), new Date(inventoryDate));
//   }, [reference]);

//   useAttachments<EntityAttachmentImage>({
//     attachments: formik.values.images,
//     updateAttachments: (attachments: EntityAttachmentImage[]) =>
//       formik.setFieldValue(imagesProperty, attachments),
//   });

//   useAttachments<EntityAttachmentDocument>({
//     attachments: formik.values.documents,
//     updateAttachments: (attachments: EntityAttachmentDocument[]) =>
//       formik.setFieldValue(documentsProperty, attachments),
//   });

//   return (
//     <div className="flex flex-col pb-4">
//       <div className="flex flex-1 flex-row items-start sm:flex-wrap md:flex-wrap lg:flex-no-wrap">
//         <div className="w-full lg:w-3/4 pr-2 flex flex-col">
//           <AssetFormDisposition />
//           <DispositionAssetInformation asset={asset}>
//             <AssignedEmployee
//               assignedTo={
//                 assignedTo || {
//                   name: '',
//                   department: '',
//                   email: '',
//                   contactNo: '',
//                 }
//               }
//             />
//           </DispositionAssetInformation>
//         </div>
//         <div className="w-full lg:w-1/4 ml-2">
//           <div className="p-4 shadow bg-white">
//             {/* <Carousel images={formik.values.images} /> */}
//           </div>
//           <div className="flex flex-1 flex-col mt-4 shadow bg-white">
//             <Heading title="Asset Value" />
//             <div className="grid grid-cols-2 gap-4 p-4">
//               <FsxNumericTextBox disabled label="Total Purchase Cost:" value={totalPurchaseCost} />
//               <FsxNumericTextBox disabled label="Current Asset Value:" />
//               <FsxNumericTextBox disabled label="Asset Age (in Months):" value={assetAge} />
//               <FsxNumericTextBox disabled label="Asset Residual Value:" />
//             </div>
//           </div>
//         </div>
//       </div>
//       <TabStrip
//         className="flex flex-1 mt-4"
//         selected={selected}
//         onSelect={e => setSelected(e.selected)}>
//         <TabStripTab title="Details">
//           <DispositionDetails assetTypeId={asset.assetTypeId} />
//         </TabStripTab>
//         <TabStripTab title="Attachment & Approval">
//           <DispositionAttachmentsAndApprovals />
//         </TabStripTab>
//       </TabStrip>
//     </div>
//   );
// };

// export default React.memo(DispositionRequest);
