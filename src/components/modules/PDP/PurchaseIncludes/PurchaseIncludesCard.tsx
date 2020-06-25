import { useState } from 'react';

import { ModalContentProps } from '~/components/global/ContentModal/ContentModal';
import ContentModalContainer from '~/components/global/ContentModal/ContentModal.container';
import Icon from '~/components/global/Icon/Icon';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';
import Link from '~/components/global/Link/Link';
import { THEME } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import styles from './PurchaseIncludesCard.styles';

export interface Props {
  description: string;
  icon: IconType;
  linkLabel: string;
  modalData: ModalContentProps;
  title: string;
}

function PurchaseIncludesCard({
  description,
  icon,
  linkLabel,
  modalData,
  title,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <Icon name={icon} css={styles.cardIcon} />
      <div>
        <h2 css={styles.cardTitle}>{title}</h2>
        <p css={typography.bodyCopy}>{description}</p>
      </div>
      <Link
        as="button"
        onClick={toggleModal}
        theme={THEME.LIGHT}
        css={styles.cardLink}
      >
        {linkLabel}
      </Link>

      <ContentModalContainer
        {...modalData}
        isOpen={isOpen}
        onClose={toggleModal}
      />
    </>
  );
}

export default PurchaseIncludesCard;
