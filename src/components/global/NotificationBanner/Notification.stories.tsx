import { withDesign } from 'storybook-addon-designs';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { COLORS, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import Notification from './Notification';

export default {
  component: Notification,
  title: 'Global/Notification',
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/n4o7nhjUg04HvTZ4PyyJIo/Black-Friday-(UX)?node-id=145%3A11944',
    },
  },
};

const styles: StylesMap = {
  paddingBottom: {
    paddingBottom: SPACING.SIZE_20,
    backgroundColor: COLORS.GLOBAL.BLACK,
  },
  root: [
    typography.bodyCopy,
    {
      textAlign: 'center',
      backgroundColor: COLORS.GLOBAL.BLACK,
    },
  ],
};

function Container({ children }: { children: React.ReactChild }) {
  return (
    <Grid>
      <GridItem gridColumn="1/15" css={styles.root}>
        {children}
      </GridItem>
    </Grid>
  );
}
// Auto dismiss off is just for testing purposes
// There should be no actual use cases with auto dismiss disabled
export function NotificationItem() {
  const handleNotificationClick = () => {};
  return (
    <Container>
      <Notification
        subtext="Up to 50% off thousands of tires, while stocks last."
        icon={{
          svgId: ICONS.TAG,
          type: ICON_IMAGE_TYPE.ICON,
        }}
        id="10001"
        title="Black Friday sale"
        type="Sale"
        sessionExpiryTime={2}
        suppressFromHomePage={false}
        handleNotificationClick={handleNotificationClick}
      />
    </Container>
  );
}
