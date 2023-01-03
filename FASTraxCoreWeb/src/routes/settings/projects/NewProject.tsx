import * as yup from 'yup';

import {Form, Formik, FormikProps} from 'formik';
import {Project, newProject, projectShape} from '@app/entities/catalog/Project';
import {
  addOrUpdateProject,
  loadStaticRolesRoles,
} from '@app/store/catalog/projects/project.actions';

import {Loader} from '@app/components/common';
import ProjectForm from '@app/views/settings/projects/Details/Project.Form';
import {RadialItem} from '@app/store/app/types';
import React from 'react';
import {StoreDispatch, RootState} from '@app/store/rootReducer';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useRadialMenu} from '@app/hooks/useRadialMenu';

const ProjectInformation = React.lazy(
  () => import('@app/views/settings/projects/Project.Information'),
);

export interface NewProjectRouteProps {}

const NewProjectRoute: React.FC<NewProjectRouteProps> = () => {
  const history = useHistory();
  const dispatch: StoreDispatch = useDispatch();
  const radialMenu = useRadialMenu({rerenderDelayMS: 100});
  const [project] = React.useState(() => newProject());
  const formikRef = React.useRef<FormikProps<Project>>(null);
  const user = useSelector((state: RootState) => state.users.current);

  const handleSubmit = async (project: Project) => {
    dispatch(addOrUpdateProject({...project, createdById: user?.id}))
      .then(() => {
        formikRef.current?.setStatus(true);
        window.location.href = '/app/projects';
      })
      .catch(response => {
        formikRef.current?.setErrors(response.data);
      });
  };

  const handleCancel = React.useCallback(() => {
    if (formikRef.current && formikRef.current.dirty) {
      const willProceed = window.confirm('All information will be reverted. Press OK to proceed');

      if (!willProceed) return;
    }

    formikRef.current?.resetForm();
    history.push('/app/projects');
  }, [formikRef]);

  React.useEffect(() => {
    const radialItems: RadialItem[] = [
      {onClick: () => formikRef.current?.submitForm(), icon: 'check', title: 'Save'},
      {onClick: handleCancel, icon: 'cross', title: 'Cancel'},
    ];

    dispatch(loadStaticRolesRoles());

    radialMenu.generate(radialItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radialMenu]);

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
            <ProjectInformation>
              <ProjectForm />
            </ProjectInformation>
          </React.Suspense>
        </Form>
      </Formik>
    </div>
  );
};

export default NewProjectRoute;
