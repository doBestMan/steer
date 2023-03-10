import React from 'react';

import Carousel from '~/components/global/Carousel/Carousel';
import { useSiteNotificationsContext } from '~/context/SiteNotifications.context';
import { CSSStylesProp } from '~/lib/constants';

import Notification from './Notification';
import styles from './Notification.styles';

export interface NotificationListProps {
  customItemStyles?: CSSStylesProp;
  types?: string[];
}

function NotificationList({
  customItemStyles,
  types = [],
}: NotificationListProps) {
  const {
    notifications,
    handleNotificationClick,
  } = useSiteNotificationsContext();
  return (
    <>
      <div css={styles.wrapper}>
        <Carousel
          wrapperClass="notification-carousel"
          params={{ mousewheel: { forceToAxis: true } }}
          shortSwipes
        >
          {notifications.notifications
            .filter(
              (notification) =>
                !types.length || types.includes(notification.type),
            )
            .map((sortedNotificationsData, index) => (
              <div
                key={`notification_${index}`}
                css={[styles.item, customItemStyles]}
              >
                <Notification
                  data-index={index}
                  key={index}
                  {...sortedNotificationsData}
                  handleNotificationClick={handleNotificationClick}
                />
              </div>
            ))}
        </Carousel>
      </div>
    </>
  );
}

export default NotificationList;
