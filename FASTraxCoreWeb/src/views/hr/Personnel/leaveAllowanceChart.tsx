import {attachmentToDataURL, attachmentToFile} from '@app/helpers/files';
import {useField, useFormikContext} from 'formik';

import {AvatarUploader} from '@app/components/common';
import React from 'react';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import Personnel from '@app/entities/hr/Personnel';

export interface IUserFormProps {}

interface AssetAttachment {
  createdUserId: number;
}

const LeaveAllowanceChart: React.FC<IUserFormProps> = () => {
    const parentFormik = useFormikContext();

    const [firstName] = useField('firstName');
    const [lastName] = useField('lastName');
    const field = useFormikContext<Personnel>();
    const [userAdmin] = useField('userAdmin');
    const [file, setFile] = React.useState<File>();
    const [uri, setUri] = React.useState<string>();
    const [isInitial, setIsInitial] = React.useState<boolean>(false);
    const dispatch = useDispatch();

    const handleLoad = async (value: any) => {
        if (!value) return;

        const fileAttachment = await attachmentToFile({
        ...value,
        });

        const imageUri = attachmentToDataURL({...value});

        imageUri && setUri(imageUri);

        setFile(fileAttachment);
    };

    React.useEffect(() => {
    setIsInitial(true);
    handleLoad(field.values);
    }, []);

    React.useEffect(() => {
        if (!file) return;
        if (!isInitial) parentFormik.setFieldValue('imageString', uri);
    }, [file, uri]);

    React.useEffect(() => {
        if (!parentFormik.isSubmitting) return;
        if (!file) return;

        parentFormik.setFieldValue('file', uri);
        parentFormik.setFieldValue('filename', file?.name);
        parentFormik.setFieldValue('fileType', file?.type);
        parentFormik.setFieldValue('fileSize', file?.size);
    }, [parentFormik.isSubmitting]);

    return (
        <div className="shadow-lg p-4 bg-white widget-box">
            <div className="flex flex-wrap flex-col-reverse md:flex-row items-start py-4 px-3">
                <div className="w-full md:w-3/4">
                </div>
                <div className="w-full md:w-1/4 px-5 py-10">
                    <div className="rounded-full h-48 w-48 flex items-center justify-center bg-gray-300 mx-auto my-0 relative">
                        <AvatarUploader
                        image={
                            !file
                            ? `https://avatars.dicebear.com/api/initials/${firstName.value} ${lastName.value}.svg`
                            : file
                        }
                        onChange={(imageFile: any, imageUri: string | null) => {
                            if (imageFile) setFile(imageFile);
                            if (imageUri) setUri(imageUri);
                        }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaveAllowanceChart;



// import {Form, Formik} from 'formik';
// import { FsxAttachmentField } from '@app/components/common';
// import React, {Suspense} from 'react';
// import {Carousel} from '@app/components/common';
// import {FileAttachment} from '@app/helpers/files';
// import {HighChartOption} from '@app/components/common/Chart/HighChart/highchart.default';
// import {Chart} from '../../../components/common';
// import Highcharts from 'highcharts';
// import {makeStyles} from '@material-ui/styles';
// import TransitionWrapper from '../../../components/common/TransitionWrapper';
// import { readFile } from '@app/helpers/file';
// import {AvatarUploader} from '@app/components/common';
// import Personnel from '@app/entities/hr/Personnel';
// import {useFormikContext} from 'formik';
// import {attachmentToDataURL, attachmentToFile} from '@app/helpers/files';


// const useStyle = makeStyles({
//     widgetCards: {
//         backgroundColor: `var(--panel-bg-color)`,
//         borderRadius: 4,
//         boxShadow: '0px 3px 13px -5px var(--shadow-color)',
//         minHeight: 150,
//         paddingTop: 15,
//         paddingBottom: 15,
//         paddingLeft: 15,
//         paddingRight: 15,
//         position: 'relative',
//         marginBottom: 15,
//     },
//     sideCountTitle: {
//         borderBottom: '1px solid #f7f5f5',
//         marginBottom: 4,
//         paddingBottom: 4,
//         fontSize: 12,
//         fontWeight: 500,
//         fontFamily: 'Roboto',
//         color: '#757c84',
//         display: 'block',
//     },
//     sideCoundSubTitle: {
//         fontSize: 12,
//         fontWeight: 300,
//         fontFamily: 'Roboto',
//         color: '#7b8591',
//         paddingBottom: 1,
//         display: 'block',
//         textAlign: 'center',
//     },
//     sideCoundSubData: {
//         fontSize: '1.875rem',
//         fontWeight: 400,
//         fontFamily: 'Roboto',
//         paddingBottom: 1,
//         textAlign: 'center',
//         marginBottom: -5,
//     },
// });
  
// interface AttachmentFormState {
//     varIFile?: File;
//     varIFileAttachment?: File;
// }

// // const inputFileRef = React.createRef<HTMLInputElement>();
// // const getFile = () => inputFileRef.current?.files?.item(0);

// const LeaveAllowanceChart = () => {
   
//     const [uri, setUri] = React.useState<string | null>();
//     const [file, setFile] = React.useState<File>();
    

//     const handleLoad = async (value: any) => {
//         if (!value) return;
    
//         const fileAttachment = await attachmentToFile({
//           ...value,
//         });
//         // console.log(fileAttachment)
//         const imageUri = attachmentToDataURL({...value});
    
//         imageUri && setUri(imageUri);
    
//         setFile(fileAttachment);
//     };

      
//     const formikPersonnel = useFormikContext<Personnel>();
    
//     React.useEffect(() => {
//         if (file) {
//             formikPersonnel.values.file = ''+uri+'';
//             formikPersonnel.values.fileName = file?.name || '';
//             formikPersonnel.values.fileSize = file?.size || 0;
//             formikPersonnel.values.fileType = file?.type || '';
//         }
        
//         handleLoad(formikPersonnel.values);
//     }, [uri, file]);
    

//     // console.log(formikPersonnel.values.image);
    


//     const [carouselImages, setCarouselImages] = React.useState<FileAttachment[]>();

//     const classes = useStyle();

//     const Highchart = Chart.HighChart;

//     const WorkOrderByMaintenanceType: HighChartOption = {
//         title: {
//             text: 'Last 12 Months Personnel Attendance Performance',
//         },
//         legend: {
//             enabled: false,
//         },
//         yAxis: {
//             max: 100,
//             labels: {
//                 formatter: function () {
//                     var _this: any = this;
//                     return Highcharts.numberFormat(_this.value, 0, ',') + '%';
//                 },
//             },
//         },
//         tooltip: {
//             useHTML: true,
//             formatter: function () {
//                 var _this: any = this;
//                 return (
//                     '<table class="tooltip_hc_custom">' +
//                         '<tr><td>Type</td><td>' +
//                             _this.series.name +
//                         '</td></tr>' +
//                         '<tr><td>WO (%)</td><td>' +
//                             _this.point.y +
//                         '%</td></tr>' +
//                     '</table>'
//                 );
//             },
//         },
//         series: [],
//         buildType: {
//             valueField: 'y',
//             xField: 'name',
//             seriesFromField: 'name',
//         },
//     };
    

//     const WorkOrderByMaintenanceTypeData = [
//         {
//             name: 'Present',
//             y: 49,
//         },
//         {
//             name: 'Tardy',
//             y: 33,
//         },
//         {
//             name: 'Absent',
//             y: 2,
//         },
//         {
//             name: 'Sick Leave',
//             y: 6,
//         },
//         {
//             name: 'Vacation Leave',
//             y: 34,
//         },
//     ];



//     const AssetAvailabilityStatus: any = {
//         title: {
//             text: 'Personal Leave Allowance',
//         },
//         series: [],
//         buildType: {
//             valueField: 'y',
//             xField: 'name',
//             seriesFromField: 'category',
//         },
//     };
    
//     const AssetAvailabilityStatusData = [
//         {
//             category: 'Total',
//             name: 'Consumed',
//             y: 30,
//         },
//         {
//             category: 'Total',
//             name: 'Scheduled',
//             y: 60,
//         },
//         {
//             category: 'Total',
//             name: 'Available',
//             y: 10,
//         },
//     ];

//     return (
//         <TransitionWrapper className="flex flex-1 flex-col">
//             <div className="m-2">
//                 <div className="grid flex-2 grid-cols-5 gap-4">

//                     <div className="col-span-full lg:col-span-4">
//                         <div className="m-2">
//                             <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
//                                 <div className="col-span-1 bg-white rounded shadow-lg" style={{height: '170px'}}>
                                    
//                                     <div className="p-4 mb-4">
//                                         {/* <Highchart
//                                             data={AssetAvailabilityStatusData}
//                                             chartType="pie"
//                                             options={AssetAvailabilityStatus}
//                                             columns={['Name', 'Count']}
//                                         /> */}
//                                     </div>
//                                 </div>
//                                 <div className="col-span-2 bg-white rounded shadow-lg">
//                                     <div className="p-4 mb-4">
//                                         {/* <Highchart
//                                             data={WorkOrderByMaintenanceTypeData}
//                                             chartType="line"
//                                             options={WorkOrderByMaintenanceType}
//                                             columns={['Maintenance Type', 'Count']}
//                                         /> */}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-span-full lg:col-span-1 bg-white rounded shadow-lg" style={{width: '250px'}}>
//                         <div className="m-2">
//                             <div className="col-auto">

//                             <AvatarUploader
//                                 image={
//                                     !file
//                                     ? `https://avatars.dicebear.com/api/initials/$P.svg`
//                                     : file
//                                 }
//                                 onChange={(imageFile: any, imageUri: string | null) => {
//                                     if (imageFile) setFile(imageFile);
//                                     if (imageUri) setUri(imageUri);
//                                 }}
//                                 />

//                                 {/* <Carousel images={carouselImages || []} />
                                
//                                 <FsxAttachmentField
//                                     fileAttachment={varIFile}
//                                     type="images" 
//                                     readFileAttachment={varIFileAttachmentx}
//                                 /> */}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </TransitionWrapper>
//     );
// };

// export default LeaveAllowanceChart;
