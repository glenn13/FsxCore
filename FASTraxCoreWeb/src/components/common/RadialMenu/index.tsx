import React, {useState} from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import {RadialItem} from '../../../store/app/types';
import amsIcon from '../SvgIcon/ams-icons.svg';
import selectionJS from '../SvgIcon/selection.json';
import {iconList} from '../SvgIcon/IconExtractor';
import ReactDOM from 'react-dom';

interface IRadialProps {
  radialItems: RadialItem[];
  position?: 'bottom-left' | 'bottom-right';
  iconColor?: string;
}

const RadialMenuStyled = styled.div``;
const ClickerDiv = styled.div`
  position: absolute;
  background-color: transparent;
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;
`;

const allIcons = iconList(selectionJS);
const scaleXY = 'scale(' + 22 / 1024 + ',' + 22 / 1024 + ')';

export const RadialMenu: React.FC<IRadialProps> = ({radialItems, iconColor, position}) => {
  const [isOpen, setIsOpen] = useState<boolean>();
  const [currentMenuItems, setCurrentMenuItems] = React.useState<RadialItem[]>();
  const [previousMenuItems, setPreviousMenuItems] = React.useState<Array<RadialItem[]>>([]);
  const size = 250;
  const width = size,
    height = size,
    radius = size / 2;

  const checkItemIfDisabled = React.useCallback((menuItem: RadialItem) => {
    const isDisabled = menuItem.disabled;
    return `${isDisabled ? 'disabled' : ''}`;
  }, []);

  const getPreviousMenu = () =>
    previousMenuItems && previousMenuItems[previousMenuItems.length - 1];

  const replaceCenterData = (svg: any, title: string, icon: string) => {
    svg.selectAll('use.center_icon').remove();
    svg.selectAll('text').remove();

    const centerGroup = svg.selectAll('g.inner__center__group');

    centerGroup
      .append('use')
      .attr('class', 'center_icon')
      .attr('width', 22)
      .attr('height', 22)
      .attr('y', -25)
      .attr('x', -12)
      .attr('fill', `${iconColor || '#333'}`)
      .attr('xlink:xlink:href', (d: any) => `${amsIcon}#icon-${icon}`);

    centerGroup
      .selectAll('text.center__text')
      .data((c: any) => title.split(' '))
      .enter()
      .append('text')
      .text((c: any) => c as any)
      .attr('fill', `${iconColor || '#333'}`)
      .attr('font-size', radius * 0.099)
      .attr('text-anchor', 'middle')
      .attr('style', 'font-family: Roboto !important; font-size: 12px; user-select: none;')
      .attr('x', 0)
      .attr('y', (_: any, i: any) => {
        return i * 15 + 15;
      });
  };

  const createCircle = React.useCallback(
    (svg: any) => {
      if (!currentMenuItems) return;

      svg.selectAll('g.inner__center__group').remove();

      var innerCenterGrp = svg
        .append('g')
        .attr('class', 'inner__center__group')
        .on('click', function () {
          const previous = getPreviousMenu();
          if (previous) {
            setCurrentMenuItems(previous);
            previousMenuItems && previousMenuItems.splice(previousMenuItems.length - 1, 1);
          } else document.body.classList.remove('radial-open');
        });

      innerCenterGrp
        .append('circle')
        .attr('r', radius * 0.45)
        .attr('stroke', '#7392b3')
        .attr('stroke-width', '5px')
        .attr('fill', '#FFFFFF');
    },
    [currentMenuItems],
  );

  const createRadialMenu = React.useCallback(
    (menuItems: RadialItem[]) => {
      var _percentage = 100 / menuItems.length / 100,
        angle = 360 * _percentage,
        rotateAnge = angle / 2;

      var arc: any = d3
        .arc()
        .outerRadius(radius - 10)
        .innerRadius(0)
        .startAngle(d => rotateAnge * 0.0174 - d.startAngle + Math.PI / 180)
        .endAngle(d => rotateAnge * 0.0174 - d.endAngle + Math.PI / 180);

      var pie = d3.pie().sort(null).value(1);

      var svg = d3
        .select('body')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('class', `radial-menu-svg radial-${position || 'bottom-right'}-aligned`)
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

      // filters go in defs element
      var defs = svg.append('defs');

      var filter = defs.append('filter').attr('id', 'drop-shadow');

      filter
        .append('feGaussianBlur')
        .attr('in', 'SourceAlpha')
        .attr('stdDeviation', 10)
        .attr('result', 'blur');

      filter
        .append('feOffset')
        .attr('in', 'blur')
        .attr('dx', 2)
        .attr('dy', 5)
        .attr('result', 'offsetBlur');

      var feMerge = filter.append('feMerge');

      feMerge.append('feMergeNode').attr('in', 'offsetBlur');
      feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

      // Circle Shadow
      svg
        .append('circle')
        .attr('r', radius)
        .attr('transform', 'scale(.85)')
        .style('filter', 'url(#drop-shadow)')
        .attr('fill', '#d3d3d3');

      const dataIndexes = menuItems.map((_, index) => index);

      var g = svg
        .selectAll('.arc')
        .data(pie(dataIndexes))
        .enter()
        .append('g')
        .attr('class', d => `pie__slice__group ${checkItemIfDisabled(menuItems[d.data.valueOf()])}`)
        .attr('style', 'font-size: 24px; font-family: Roboto')
        .on('click', d => {
          const radialItem = menuItems[d.data.valueOf()];

          if (radialItem.children) {
            setPreviousMenuItems([...previousMenuItems, menuItems]);
            setCurrentMenuItems(radialItem.children);
          }
          if (!radialItem || !radialItem.onClick || radialItem.disabled) return;

          radialItem.onClick();

          setIsOpen(false);
          document.body.classList.remove('radial-open');
        })
        .on('mouseover', d => {
          if (!currentMenuItems) return;

          const radialItem = currentMenuItems[d.data.valueOf()];
          replaceCenterData(svg, radialItem.title, radialItem.icon);
        })
        .on('mouseleave', d => {
          previousMenuItems.length > 0
            ? replaceCenterData(svg, 'Back', 'back')
            : replaceCenterData(svg, 'Close', 'cross');
        });

      g.append('path')
        .attr('d', arc)
        .attr('class', 'slicepath')
        .attr('stroke', '#E8E8E8')
        .attr('stroke-width', '1px')
        .style('fill', '#FFF');

      g.append('g')
        .attr('width', 22)
        .attr('height', 22)
        .attr('transform', d => {
          var _d = arc.centroid(d);
          _d[0] *= 1.5; //multiply by a constant factor
          _d[1] *= 1.5; //multiply by a constant factor

          _d[0] = _d[0] - 10;
          _d[1] = _d[1] - 10;
          return 'translate(' + _d + ')';
        })
        .attr('class', 'radial__icon')
        .selectAll('path')
        .data((d: any) => {
          const currentIcon = allIcons.filter(c => c.name === menuItems[d.data.valueOf()].icon);
          return currentIcon[0]?.path;
        })
        .enter()
        .append('svg:path')
        .attr('d', d => d)
        .attr('transform', scaleXY);

      createCircle(svg);

      previousMenuItems.length > 0
        ? replaceCenterData(svg, 'Back', 'back')
        : replaceCenterData(svg, 'Close', 'cross');
    },
    [iconColor, position, radialItems, currentMenuItems],
  );

  React.useEffect(() => {
    if (!currentMenuItems || currentMenuItems.length === 0) return;

    const previousSVG = document.querySelector('.radial-menu-svg');
    if (previousSVG) previousSVG.remove();

    createRadialMenu(currentMenuItems);
  }, [currentMenuItems]);

  React.useEffect(() => {
    if (radialItems.length === 0) return;

    setCurrentMenuItems(radialItems);

    return () => {
      setPreviousMenuItems([]);
      setCurrentMenuItems([]);
    };
  }, [radialItems]);

  const handleAnchorClick = React.useCallback(() => {
    document.body.classList.add('radial-open');
    setIsOpen(true);
  }, []);

  return (
    <>
      {radialItems.length > 0 &&
        ReactDOM.createPortal(
          <RadialMenuStyled>
            {isOpen && (
              <ClickerDiv
                onClick={() => {
                  if (document.body.classList.contains('radial-open'))
                    document.body.classList.remove('radial-open');
                  setIsOpen(false);
                }}
              />
            )}
            <button
              onClick={handleAnchorClick}
              className={`ellipsis radial-menu-nav radial-${position || 'bottom-right'}-aligned`}>
              <svg width={22} height={22} fill="#333">
                <use xlinkHref={`${amsIcon}#icon-radial-menu`} />
              </svg>
            </button>
          </RadialMenuStyled>,
          document.body,
        )}
    </>
  );
};

export default React.memo(RadialMenu);
