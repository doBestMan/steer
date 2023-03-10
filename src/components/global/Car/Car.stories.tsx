import { boolean, select } from '@storybook/addon-knobs';

import Scenary from '~/components/global/Scenery/Scenery';
import { Sceneries } from '~/components/global/Scenery/Scenery.types';
import { COLORS, StylesMap, Z_INDEX } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import Car from './Car';
import { Cars } from './Car.enums';

export default {
  component: Car,
  title: 'Global/Cars',
};

const styles: StylesMap = {
  container: {
    backgroundColor: COLORS.LIGHT.OFF_WHITE,
    height: 500,
    position: 'relative',
  },
  scenery: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    width: '100%',
  },
  vehicle: {
    bottom: 0,
    right: 50,
    position: 'absolute',
    zIndex: Z_INDEX.BETWEEN_ZERO_TOP,
  },
};

export function CarWithKnobs() {
  const car = select('Car', Object.keys(Cars), Object.keys(Cars)[0]);
  const animateWheel = boolean('animate Wheel', false);
  const solid = boolean('solid background', false);
  const showLandscapeBackground = boolean('show Landscape Background', false);

  return (
    <div css={styles.container}>
      <Car
        css={styles.vehicle}
        animateWheel={animateWheel}
        carId={car}
        solid={solid}
      />

      {showLandscapeBackground && (
        <Scenary css={styles.scenery} sceneryID={Sceneries['scenery--urban']} />
      )}
    </div>
  );
}

export function AllCars() {
  return (
    <ul>
      {Object.keys(Cars).map((car) => {
        return (
          <li key={car}>
            <p css={typography.primaryHeadline}>{car}</p>
            <Car carId={car} />
          </li>
        );
      })}
    </ul>
  );
}
