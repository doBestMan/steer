import { ReactNode } from 'react';

import { SearchContextProvider } from '~/components/modules/Search/Search.context';
import { SearchModalContextProvider } from '~/components/modules/Search/SearchModal.context';
import { TireSnapModalContextProvider } from '~/components/modules/TireSnap/TireSnapModal.context';
import { SiteGlobals } from '~/data/models/SiteGlobals';
import { SiteMenu } from '~/data/models/SiteMenu';
import { SiteNotificationList } from '~/data/models/SiteNotificationsList';

import { FooterContextProvider } from './Footer.context';
import { GlobalsContextProvider } from './Globals.context';
import { GlobalToastContextProvider } from './GlobalToast.context';
import { ModalContextProvider } from './Modal.context';
import { RouterContextProvider } from './Router.context';
import { SiteGlobalsContextProvider } from './SiteGlobals.context';
import { SiteMenuContextProvider } from './SiteMenu.context';
import { SiteNotificationsContextProvider } from './SiteNotifications.context';
import { UserPersonalizationContextProvider } from './UserPersonalization.context';

interface Props {
  children: ReactNode;
  hostUrl?: string | null;
  siteGlobalsContextValue?: SiteGlobals;
  siteMenuContextValue?: SiteMenu;
  siteNotificationContextValue?: SiteNotificationList;
  userAgentType?: string;
}

// Container to wrap _app.tsx in context providers.
// Not all providers need to go here; only ones used throughout the app
function AppProviders({
  children,
  hostUrl,
  siteGlobalsContextValue,
  siteMenuContextValue,
  siteNotificationContextValue,
  userAgentType,
}: Props) {
  return (
    <GlobalsContextProvider value={{ hostUrl }}>
      <SiteGlobalsContextProvider
        value={siteGlobalsContextValue}
        userAgentType={userAgentType}
      >
        <SiteMenuContextProvider value={siteMenuContextValue}>
          <UserPersonalizationContextProvider>
            <FooterContextProvider>
              <SearchContextProvider>
                <SearchModalContextProvider>
                  <TireSnapModalContextProvider>
                    <GlobalToastContextProvider>
                      <RouterContextProvider>
                        <SiteNotificationsContextProvider
                          value={siteNotificationContextValue}
                        >
                          <ModalContextProvider>
                            {children}
                          </ModalContextProvider>
                        </SiteNotificationsContextProvider>
                      </RouterContextProvider>
                    </GlobalToastContextProvider>
                  </TireSnapModalContextProvider>
                </SearchModalContextProvider>
              </SearchContextProvider>
            </FooterContextProvider>
          </UserPersonalizationContextProvider>
        </SiteMenuContextProvider>
      </SiteGlobalsContextProvider>
    </GlobalsContextProvider>
  );
}

export default AppProviders;
