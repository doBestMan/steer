import { css } from '@emotion/core';

export const layout = {
  absoluteContainer: css({
    height: '100%',
    position: 'absolute',
    width: '100%',
  }),
  centered: css({
    alignItems: 'center',
    justifyContent: 'center',
  }),
  centeredHorizontal: css({
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  centeredVertical: css({
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }),
  container: css({
    flex: 1,
  }),
  verticalContainer: css({
    flex: 1,
    flexDirection: 'column',
  }),
};