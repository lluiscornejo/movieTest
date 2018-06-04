import React from 'react';
import PropTypes from 'prop-types';
import { mergeClasses } from '@Common/utils/css';
import style from './grid.pcss';

const defaultTag = 'div';

const getConfigClasses = config => Object.entries(config).reduce((configClasses, [prop, value]) => {
  const configClass = `${prop}${value}`;
  if (configClass) {
    configClasses.push(style[configClass]);
  }
  return configClasses;
}, []);

export const Container = ({
  children,
  fluid,
  tag: ContainerTag = defaultTag,
}) => (
  <ContainerTag className={mergeClasses(style.container, !fluid && style.notFluid)}>
    {children}
  </ContainerTag>
);

Container.propTypes = {
  /** Html tag to render as column */
  tag: PropTypes.string,
  fluid: PropTypes.bool,
};

export const Row = ({ children, tag: RowTag = defaultTag }) => (
  <RowTag className={style.row}>
    {children}
  </RowTag>
);

Row.propTypes = {
  /** Html tag to render as column */
  tag: PropTypes.string,
};

export const Col = ({
  children,
  className = '',
  tag: ColTag = defaultTag,
  ...config
}) => (
  <ColTag className={mergeClasses(className, style.col, ...getConfigClasses(config))}>
    {children}
  </ColTag>
);

Col.propTypes = {
  /** Html tag to render as column */
  tag: PropTypes.string,
  /** Small */
  small: PropTypes.number,
  smallOffset: PropTypes.number,
  smallOrder: PropTypes.number,
  /** Medium */
  medium: PropTypes.number,
  mediumOffset: PropTypes.number,
  mediumOrder: PropTypes.number,
  /** Large */
  large: PropTypes.number,
  largeOffset: PropTypes.number,
  largeOrder: PropTypes.number,
  /** xLarge */
  xlarge: PropTypes.number,
  xlargeOffset: PropTypes.number,
  xlargeOrder: PropTypes.number,
};

