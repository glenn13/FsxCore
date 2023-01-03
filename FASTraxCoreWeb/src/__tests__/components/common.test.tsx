import React from 'react';
import {render} from '@testing-library/react';
import {Button, FsxDrawer} from '@app/components/common';
import Heading from '@app/views/common/Heading';
import {renderWithTheme} from '../../helpers/test';

describe('Heading', () => {
  it('displays its title props', () => {
    const title = 'Sample Heading';

    const {getByText} = render(<Heading title={title} />);

    expect(getByText(title)).toBeInTheDocument();
  });
});

describe('Button', () => {
  it('displays its children props', () => {
    const title = 'Sample Button';
    const {getByText} = renderWithTheme(<Button>{title}</Button>);

    expect(getByText(title)).toBeInTheDocument();
  });

  it('executes onClick props', () => {
    const mockClick = jest.fn();

    renderWithTheme(<Button onClick={mockClick} />);

    document.querySelector('button')?.click();

    expect(mockClick).toBeCalled();
  });
});

describe('FsxDrawer', () => {
  it('displays its title props', () => {
    const title = 'This is Model';
    const {getByText} = renderWithTheme(<FsxDrawer title={title} />);

    expect(getByText(title)).toBeInTheDocument();
  });

  it('unMounts its children when unMountChildren property is truthy and isOpen is falsy', () => {
    const children = <div>Sample Children Div</div>;
    const firstTestId = 'FsxDrawer1';
    const firstRender = renderWithTheme(
      <FsxDrawer unMountChildren testId={firstTestId}>
        {children}
      </FsxDrawer>,
    );
    const firstElement = firstRender.getByTestId(firstTestId);

    expect(firstElement.firstChild).toBeNull();

    const secondTestId = 'FsxDrawer2';
    const secondRender = renderWithTheme(
      <FsxDrawer unMountChildren isOpen testId={secondTestId}>
        {children}
      </FsxDrawer>,
    );
    const secondElement = secondRender.getByTestId(secondTestId);

    expect(secondElement.firstChild).toMatchSnapshot(`<div>Sample Children Div</div>`);
  });

  it('displays the drawer when isOpen is true', () => {
    const {container: firstContainer} = renderWithTheme(<FsxDrawer isOpen={true} />);

    expect(firstContainer.firstElementChild?.classList.contains('visible')).toBeTruthy();
    expect(firstContainer.firstElementChild?.classList.contains('invisible')).toBeFalsy();

    const {container: secondContainer} = renderWithTheme(<FsxDrawer isOpen={false} />);

    expect(secondContainer.firstElementChild?.classList.contains('visible')).toBeFalsy();
    expect(secondContainer.firstElementChild?.classList.contains('invisible')).toBeTruthy();
  });

  it('triggers property onClose when `ams-cross` icon is clicked and when user clicks outside of the actual drawer when closeOnOutsideClick is true (default is true)', () => {
    const firstMockOnClose = jest.fn();
    const firstTestId = 'FsxDrawer1';
    const {container: firstContainer} = renderWithTheme(
      <FsxDrawer testId={firstTestId} onClose={firstMockOnClose} />,
    );
    const buttonIcon = firstContainer.querySelector('button .ams-cross')?.parentElement;

    buttonIcon?.click();

    expect(firstMockOnClose).toBeCalledTimes(1);

    const firstWrapper = firstContainer.firstElementChild as HTMLElement;
    firstWrapper.click();

    expect(firstMockOnClose).toBeCalledTimes(2);

    const content = firstWrapper.firstElementChild as HTMLElement;
    content.click();

    expect(firstMockOnClose).toBeCalledTimes(2);

    const secondMockOnClose = jest.fn();
    const secondTestId = 'FsxDrawer2';
    const {container: secondContainer} = renderWithTheme(
      <FsxDrawer testId={secondTestId} onClose={secondMockOnClose} closeOnOutsideClick={false} />,
    );
    const secondWrapper = secondContainer.firstElementChild as HTMLElement;
    secondWrapper.click();

    expect(secondMockOnClose).not.toBeCalled();
  });
});
