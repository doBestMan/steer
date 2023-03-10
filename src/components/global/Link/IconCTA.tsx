import Icon from '~/components/global/Icon/Icon';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';
import { THEME } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import BaseLink from './BaseLink';
import { AnchorProps } from './Link';
import { iconCTA, themedIconCTA } from './Link.styles';

interface Props extends Pick<AnchorProps, 'theme' | 'href' | 'children'> {
  icon: IconType;
  useBaseLink?: boolean;
}
function IconLink({
  useBaseLink = true,
  children,
  href,
  icon,
  theme = THEME.DARK,
  ...rest
}: Props) {
  const Container = useBaseLink ? BaseLink : 'a';
  return (
    <div css={iconCTA.root}>
      <Container
        href={href}
        css={[
          typography.primarySubhead,
          themedIconCTA[theme],
          iconCTA.container,
        ]}
        {...rest}
      >
        <Icon name={icon} css={iconCTA.icon} />
        <span>{children}</span>
      </Container>
    </div>
  );
}

export default IconLink;
