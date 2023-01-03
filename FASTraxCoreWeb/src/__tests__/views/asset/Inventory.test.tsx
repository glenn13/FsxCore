import React from 'react';
import thunk from 'redux-thunk';
import {Formik, Form} from 'formik';
import {Provider} from 'react-redux';
import {render, waitFor} from '@testing-library/react';
import configureStore, {MockStoreEnhanced} from 'redux-mock-store';
import GeneralAssetsTab from '@app/views/asset/Inventory/GeneralAssets';
import VehiclesTab from '@app/views/asset/Inventory/Vehicles';
import ComponentsTab from '@app/views/asset/Inventory/Components';
import {mockGeneralAssetsGroups} from '@app/__mocks__/asset/inventory/generalAssets';
import {mockVehiclesQuery} from '@app/__mocks__/asset/inventory/vehicles';
import {mockComponentsQuery} from '@app/__mocks__/asset/inventory/components';
import {initialMockState, RootState} from '@app/store/rootReducer';
import * as generalAssetService from '@app/services/asset/assets.service';
import * as vehicleService from '@app/services/asset/vehicles.service';
import * as componentService from '@app/services/asset/inventory/components.service';
import AssetForm from '@app/views/asset/Inventory/AssetForm';
import {newAsset} from '@app/entities/asset/inventory/Asset';
import {renderWithTheme} from '@app/helpers/test';
import { AssetCategoryEnum } from '@app/helpers/asset/enum'

let store: MockStoreEnhanced;
const middlewares = [thunk];
const mockStore = configureStore<RootState>(middlewares);

beforeEach(() => {
  store = mockStore(initialMockState);
});

describe('GeneralAssetsTab Component', () => {
  it('renders table of General Asset Groups', async () => {
    jest
      .spyOn(generalAssetService, 'getGeneralAssetGroups')
      .mockResolvedValueOnce(mockGeneralAssetsGroups());

    const {getByTestId, asFragment} = render(
      <Provider store={store}>
        <GeneralAssetsTab />
      </Provider>,
    );

    const node = await waitFor(() => getByTestId('generalAssetGroups'));
    expect(node.querySelectorAll('.k-master-row').length).toBe(3);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('VehiclesTab Component', () => {
  it('renders table of Vehicles', async () => {
    jest.spyOn(vehicleService, 'useVehiclesGrid').mockImplementation(mockVehiclesQuery);
    const wrapper = render(
      <Provider store={store}>
        <VehiclesTab />
      </Provider>,
    );

    expect(wrapper.container.querySelectorAll('.k-master-row').length).toBe(2);
  });
});

describe('ComponentsTab Component', () => {
  it('renders table of Components', async () => {
    jest.spyOn(componentService, 'useComponentsGrid').mockImplementation(mockComponentsQuery);
    const wrapper = render(
      <Provider store={store}>
        <ComponentsTab />
      </Provider>,
    );

    expect(wrapper.container.querySelectorAll('.k-master-row').length).toBe(3);
  });
});

describe('AssetForm Component', () => {
  const initialValues = newAsset();
  it('displays VIN as label when category is Vehicle', () => {
    const {getByText, queryByText} = renderWithTheme(
      <Formik initialValues={initialValues} onSubmit={() => {}}>
            <Form>
                <AssetForm images={[]} categoryId={AssetCategoryEnum.Vehicle} onCategoryChange={() => { }} />
        </Form>
      </Formik>,
    );

    expect(getByText(new RegExp('VIN', 'i'))).toBeInTheDocument();
    expect(queryByText(new RegExp('Serial No', 'i'))).not.toBeInTheDocument();
  });

  it('displays Serial No as label when category is General Asset', () => {
    const {getByText, queryByText} = renderWithTheme(
      <Formik initialValues={initialValues} onSubmit={() => {}}>
            <Form>
                <AssetForm images={[]} categoryId={AssetCategoryEnum.GeneralAsset} onCategoryChange={() => { }} />
        </Form>
      </Formik>,
    );

    expect(queryByText(new RegExp('VIN', 'i'))).not.toBeInTheDocument();
    expect(getByText(new RegExp('Serial No', 'i'))).toBeInTheDocument();
  });

  it('displays Serial No as label when category is Components', () => {
    const {getByText, queryByText} = renderWithTheme(
      <Formik initialValues={initialValues} onSubmit={() => {}}>
            <Form>
                <AssetForm images={[]} categoryId={AssetCategoryEnum.GeneralAsset} onCategoryChange={() => { }} />
        </Form>
      </Formik>,
    );

    expect(queryByText(new RegExp('VIN', 'i'))).not.toBeInTheDocument();
    expect(getByText(new RegExp('Serial No', 'i'))).toBeInTheDocument();
  });
});
