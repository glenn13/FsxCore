import React from 'react';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {Form, Formik, FormikProps} from 'formik';
import {Loader} from '@app/components/common';
import {RadialItem} from '@app/store/app/types';
import {StoreDispatch, RootState} from '@app/store/rootReducer';
import {useRadialMenu} from '@app/hooks/useRadialMenu';
import ProjectForm from '@app/views/settings/projects/Details/Project.Form';
import {projectShape, Project} from '@app/entities/catalog/Project';
import {
  addOrUpdateProject,
  loadProject,
  loadProjectSites,
} from '@app/store/catalog/projects/project.actions';
import {updateProject} from '@app/store/catalog/projects/reducers';
import {trackPromise} from 'react-promise-tracker';

import {
  clearProjectAssetCategories,
  loadProjectAssetCategories,
} from '@app/store/catalog/projectassetcategory/projectassetcategory.action';

const ProjectInformation = React.lazy(
  () => import('@app/views/settings/projects/Project.Information'),
);

interface RouteProps {
  id: string;
}

export interface EditProjectRouteProps {}

const EditProjectRoute: React.FC<EditProjectRouteProps> = () => {
  const history = useHistory();
  const route = useRouteMatch<RouteProps>();
  const dispatch: StoreDispatch = useDispatch();
  const radialMenu = useRadialMenu({rerenderDelayMS: 100});
  const formikRef = React.useRef<FormikProps<Project>>(null);
  const [project, setProject] = React.useState<Project>();
  const user = useSelector((state: RootState) => state.users.current);
  const id = route.params.id;

  const handleSubmit = async (project: Project) => {
    dispatch(addOrUpdateProject({...project, createdById: user?.id}))
      .then((response: any) => {
        formikRef.current?.setStatus(true);
        dispatch(updateProject(response.data));
        // window.location.href = '/app/projects';
        history.push('/app/projects');
      })
      .catch(response => {
        formikRef.current?.setErrors(response.data);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  React.useEffect(() => {
    const fetchProject = async () => {
      dispatch(loadProject(id)).then(project => setProject(project));
      dispatch(loadProjectSites(id));
      dispatch(loadProjectAssetCategories(id));
    };

    trackPromise(fetchProject());

    return () => {
      dispatch(clearProjectAssetCategories());
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  const handleCancel = React.useCallback(() => {
    if (formikRef.current && formikRef.current.dirty) {
      const willProceed = window.confirm('All information will be reverted. Press OK to proceed');

      if (!willProceed) return;
    }

    formikRef.current?.resetForm();
    history.push('/app/projects');

    /* eslint-disable react-hooks/exhaustive-deps */
  }, [formikRef]);

  React.useEffect(() => {
    const radialItems: RadialItem[] = [
      {onClick: () => formikRef.current?.submitForm(), icon: 'check', title: 'Save'},
      {onClick: handleCancel, icon: 'cross', title: 'Cancel'},
    ];

    radialMenu.generate(radialItems);
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [radialMenu]);

  if (!project) return <Loader />;

  return (
    <div className="">
      <Formik
        validationSchema={yup.object().shape(projectShape)}
        validateOnChange={false}
        initialValues={project}
        onSubmit={handleSubmit}
        innerRef={formikRef}>
        <Form>
          <React.Suspense fallback={<Loader />}>
            <ProjectInformation id={id}>
              <ProjectForm />
            </ProjectInformation>
          </React.Suspense>
        </Form>
      </Formik>
    </div>
  );
};

export default EditProjectRoute;
