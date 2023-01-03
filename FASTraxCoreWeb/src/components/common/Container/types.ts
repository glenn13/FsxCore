import clx from 'classnames';

export interface TailwindCSSProperties {
  className?: string;
}

export interface SizeProperties extends TailwindCSSProperties {
  fullWidth?: boolean;
  fullHeight?: boolean;
}

export interface TextProperties extends TailwindCSSProperties {
  textAlignment?: 'left' | 'center' | 'right' | 'justify';
}

export interface FlexProperties extends TailwindCSSProperties {
  flex?: boolean;
  col?: boolean;
  row?: boolean;
  grow?: boolean;
  shrink?: boolean;
  items?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
}

export interface SpacingProperties extends TailwindCSSProperties {
  p?: number;
  px?: number;
  py?: number;
  pl?: number;
  pt?: number;
  pr?: number;
  pb?: number;
  m?: number;
  mx?: number;
  my?: number;
  ml?: number;
  mt?: number;
  mr?: number;
  mb?: number;
}

const generateSizeProperties = ({fullWidth, fullHeight}: SizeProperties) => {
  return clx({
    'w-full': fullWidth,
    'h-full': fullHeight,
  });
};

const generateTextProperties = ({textAlignment}: TextProperties) => {
  return clx({
    ['text-' + textAlignment]: textAlignment,
  });
};

const generateFlexProperties = (props: FlexProperties) => {
  const {flex, shrink, row, col, grow, items, justify} = props;

  return clx({
    flex: flex === true || Object.keys(props).length > 0,
    'flex-shrink-1': shrink,
    'flex-row': row,
    'flex-col': col,
    'flex-1': grow,
    ['items-' + items]: items,
    ['justify-' + justify]: justify,
  });
};

const generateSpacingProperties = ({
  p,
  px,
  py,
  pl,
  pt,
  pr,
  pb,
  m,
  mx,
  my,
  ml,
  mt,
  mr,
  mb,
}: SpacingProperties) => {
  return clx({
    ['p-' + p]: p,
    ['px-' + px]: px,
    ['py-' + py]: py,
    ['pl-' + pl]: pl,
    ['pt-' + pt]: pt,
    ['pr-' + pr]: pr,
    ['pb-' + pb]: pb,
    ['m-' + m]: m,
    ['mx-' + mx]: mx,
    ['my-' + my]: my,
    ['ml-' + ml]: ml,
    ['mt-' + mt]: mt,
    ['mr-' + mr]: mr,
    ['mb-' + mb]: mb,
  });
};

export const generateClasses = (props: TailwindCSSProperties) => {
  return clx(
    generateSizeProperties(props),
    generateTextProperties(props),
    generateFlexProperties(props),
    generateSpacingProperties(props),
  );
};
