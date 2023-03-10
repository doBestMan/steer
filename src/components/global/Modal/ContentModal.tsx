import Image from '~/components/global/Image/Image';
import Link from '~/components/global/Link/Link';
import Markdown from '~/components/global/Markdown/Markdown';
import Modal from '~/components/global/Modal/Modal';
import EmailSupport from '~/components/modules/Support/EmailSupport';
import LiveChatSupport from '~/components/modules/Support/LiveChatSupport';
import PhoneSupport from '~/components/modules/Support/PhoneSupport';
import SupportHeading from '~/components/modules/Support/SupportHeading';
import { MODAL_THEME, THEME } from '~/lib/constants';

import styles from './ContentModal.styles';
import { ContentModalProps } from './Modal.types';

export interface Props extends ContentModalProps {
  customerServiceNumber: { display: string; value: string };
  isCustomerServiceEnabled: boolean;
  isOpen: boolean;
  onAfterClose: () => void;
  onClose: () => void;
  useSliderToClose?: boolean;
}

function ContentModal({
  content,
  customerServiceNumber,
  image,
  isCustomerServiceEnabled,
  isOpen,
  link,
  useSliderToClose = false,
  onClose,
  onAfterClose,
  showSupportSection = true,
  subtitle,
  title,
}: Props) {
  return (
    <Modal
      contentLabel={title}
      theme={MODAL_THEME.LIGHT}
      onClose={onClose}
      onAfterClose={onAfterClose}
      isOpen={isOpen}
      useSliderToClose={useSliderToClose}
    >
      <div css={styles.container}>
        <h1 css={[styles.title, !subtitle && styles.noSubtitle]}>{title}</h1>
        {subtitle && <h2 css={styles.subtitle}>{subtitle}</h2>}

        {image && (
          <div css={styles.imageContainer}>
            <Image
              altText={image.altText || title}
              src={image.src}
              css={styles.hero}
              widths={[320, 600, 1000, 1500, 2000]}
            />
          </div>
        )}

        <div css={styles.contentContainer}>
          <Markdown>{content}</Markdown>

          {link && (
            <Link
              href={link.link.href}
              isExternal={link.link.isExternal}
              theme={THEME.LIGHT}
              css={styles.link}
              onClick={onClose}
            >
              {link.label}
            </Link>
          )}
        </div>
        {showSupportSection && (
          <div css={styles.supportContainer}>
            <SupportHeading
              css={styles.supportHeading}
              isCustomerServiceEnabled={isCustomerServiceEnabled}
            />
            <div css={styles.phoneSupport}>
              <PhoneSupport
                customerServiceNumber={customerServiceNumber}
                isCustomerServiceEnabled={isCustomerServiceEnabled}
              />
            </div>

            <EmailSupport isCustomerServiceEnabled={isCustomerServiceEnabled} />
            <div css={styles.liveChatSupport}>
              <LiveChatSupport />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default ContentModal;
