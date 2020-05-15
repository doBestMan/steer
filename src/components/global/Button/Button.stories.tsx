import { css } from '@emotion/core';
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import { ReactChild, useState } from 'react';

import {
  BUTTON_STYLE,
  BUTTON_THEME,
  COLORS,
  LINK_TYPES,
} from '~/lib/constants';

import Button from './Button';
import FilterButton from './FilterButton';

export default {
  component: Button,
  title: 'Button',
};

const handleButtonClick = action('button-click');

const styles = {
  root: css({
    minHeight: '100vh',
  }),
};

function ButtonContainer({
  theme,
  children,
}: {
  children: ReactChild;
  theme: BUTTON_THEME;
}) {
  const themeMap = {
    [BUTTON_THEME.LIGHT]: COLORS.GLOBAL.WHITE,
    [BUTTON_THEME.DARK]: COLORS.GLOBAL.BLACK,
    [BUTTON_THEME.ORANGE]: COLORS.GLOBAL.ORANGE,
  };
  const backgroundColor = themeMap[theme];

  return <div css={[styles.root, { backgroundColor }]}>{children}</div>;
}

export function ButtonWithKnobs() {
  const as = select(
    'Element',
    [LINK_TYPES.BUTTON, LINK_TYPES.A],
    LINK_TYPES.BUTTON,
  );
  const style = select(
    'Style',
    [BUTTON_STYLE.SOLID, BUTTON_STYLE.OUTLINED],
    BUTTON_STYLE.SOLID,
  );
  const theme = select(
    'Theme',
    [BUTTON_THEME.LIGHT, BUTTON_THEME.DARK, BUTTON_THEME.ORANGE],
    BUTTON_THEME.LIGHT,
  );

  return (
    <ButtonContainer theme={theme}>
      <Button
        href={as === LINK_TYPES.A ? '/' : ''}
        onClick={handleButtonClick}
        isDisabled={boolean('Disabled', false)}
        {...{ as, style, theme }}
      >
        {text('Label', 'Button Label')}
      </Button>
    </ButtonContainer>
  );
}

export function LightButtonSolid() {
  return (
    <ButtonContainer theme={BUTTON_THEME.LIGHT}>
      <Button
        isDisabled={boolean('Disabled', false)}
        onClick={handleButtonClick}
      >
        {text('Label', 'Button Label')}
      </Button>
    </ButtonContainer>
  );
}

export function LightButtonSolidAsAnchor() {
  return (
    <ButtonContainer theme={BUTTON_THEME.LIGHT}>
      <Button
        as={LINK_TYPES.A}
        href="/"
        isDisabled={boolean('Disabled', false)}
        onClick={handleButtonClick}
      >
        {text('Label', 'Button Label')}
      </Button>
    </ButtonContainer>
  );
}

export function LightButtonOutlined() {
  return (
    <ButtonContainer theme={BUTTON_THEME.LIGHT}>
      <Button
        isDisabled={boolean('Disabled', false)}
        onClick={handleButtonClick}
        style={BUTTON_STYLE.OUTLINED}
        theme={BUTTON_THEME.LIGHT}
      >
        {text('Label', 'Button Label')}
      </Button>
    </ButtonContainer>
  );
}

export function DarkButtonSolid() {
  return (
    <ButtonContainer theme={BUTTON_THEME.DARK}>
      <Button
        isDisabled={boolean('Disabled', false)}
        onClick={handleButtonClick}
        style={BUTTON_STYLE.SOLID}
        theme={BUTTON_THEME.DARK}
      >
        {text('Label', 'Button Label')}
      </Button>
    </ButtonContainer>
  );
}

export function DarkButtonOutlined() {
  return (
    <ButtonContainer theme={BUTTON_THEME.DARK}>
      <Button
        isDisabled={boolean('Disabled', false)}
        onClick={handleButtonClick}
        style={BUTTON_STYLE.OUTLINED}
        theme={BUTTON_THEME.DARK}
      >
        {text('Label', 'Button Label')}
      </Button>
    </ButtonContainer>
  );
}

export function OrangeButtonSolid() {
  return (
    <ButtonContainer theme={BUTTON_THEME.ORANGE}>
      <Button
        isDisabled={boolean('Disabled', false)}
        onClick={handleButtonClick}
        style={BUTTON_STYLE.SOLID}
        theme={BUTTON_THEME.ORANGE}
      >
        {text('Label', 'Button Label')}
      </Button>
    </ButtonContainer>
  );
}

export function OrangeButtonOutlined() {
  return (
    <ButtonContainer theme={BUTTON_THEME.ORANGE}>
      <Button
        isDisabled={boolean('Disabled', false)}
        onClick={handleButtonClick}
        style={BUTTON_STYLE.OUTLINED}
        theme={BUTTON_THEME.ORANGE}
      >
        {text('Label', 'Button Label')}
      </Button>
    </ButtonContainer>
  );
}

export function FilterButtonWithKnobs() {
  const theme = select(
    'Theme',
    [BUTTON_THEME.DARK, BUTTON_THEME.ORANGE],
    BUTTON_THEME.DARK,
  );

  return (
    <ButtonContainer theme={theme}>
      <FilterButton
        isActive={boolean('Active', false)}
        isDisabled={boolean('Disabled', false)}
        hasDropDown={boolean('Drop down', false)}
        onClick={handleButtonClick}
        theme={theme}
      >
        {text('Label', 'Button Label')}
      </FilterButton>
    </ButtonContainer>
  );
}

export function DarkFilterButtonInactive() {
  return (
    <ButtonContainer theme={BUTTON_THEME.DARK}>
      <FilterButton
        hasDropDown={boolean('Drop down', false)}
        isActive={false}
        isDisabled={boolean('Disabled', false)}
        onClick={handleButtonClick}
      >
        {text('Label', 'Button Label')}
      </FilterButton>
    </ButtonContainer>
  );
}

export function DarkFilterButtonActive() {
  return (
    <ButtonContainer theme={BUTTON_THEME.DARK}>
      <FilterButton
        hasDropDown={boolean('Drop down', false)}
        isActive
        isDisabled={boolean('Disabled', false)}
        onClick={handleButtonClick}
      >
        {text('Label', 'Button Label')}
      </FilterButton>
    </ButtonContainer>
  );
}

export function OrangeFilterButtonInactive() {
  return (
    <ButtonContainer theme={BUTTON_THEME.ORANGE}>
      <FilterButton
        hasDropDown={boolean('Drop down', false)}
        isActive={false}
        isDisabled={boolean('Disabled', false)}
        onClick={handleButtonClick}
        theme={BUTTON_THEME.ORANGE}
      >
        {text('Label', 'Button Label')}
      </FilterButton>
    </ButtonContainer>
  );
}

export function OrangeFilterButtonActive() {
  return (
    <ButtonContainer theme={BUTTON_THEME.ORANGE}>
      <FilterButton
        hasDropDown={boolean('Drop down', false)}
        isActive
        isDisabled={boolean('Disabled', false)}
        onClick={handleButtonClick}
        theme={BUTTON_THEME.ORANGE}
      >
        {text('Label', 'Button Label')}
      </FilterButton>
    </ButtonContainer>
  );
}

export function FilterButtonWithToggleState() {
  const [isActive, setIsActive] = useState(false);

  const theme = select(
    'Theme',
    [BUTTON_THEME.DARK, BUTTON_THEME.ORANGE],
    BUTTON_THEME.DARK,
  );

  return (
    <ButtonContainer theme={theme}>
      <FilterButton
        hasDropDown={boolean('Drop down', false)}
        isActive={isActive}
        isDisabled={boolean('Disabled', false)}
        onClick={function () {
          setIsActive(!isActive);
        }}
        theme={theme}
      >
        {text('Label', 'Button Label')}
      </FilterButton>
    </ButtonContainer>
  );
}
