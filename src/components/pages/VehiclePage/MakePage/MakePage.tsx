import BreadcrumbsComponent, {
  BreadcrumbsItem,
} from '~/components/global/Breadcrumbs/Breadcrumbs';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import HeaderWithLogo, {
  HeaderWithLogoProps,
} from '~/components/global/HeaderWithLogo/HeaderWithLogo';
import Meta from '~/components/global/Meta/Meta';
import SearchByBoard from '~/components/global/SearchByBoard/SearchByBoard';
import TextBasedList from '~/components/global/TextBasedList/TextBasedList';
import ModuleMarkdown from '~/components/modules/EditorialModules/modules/ModuleMarkdown/ModuleMarkdown';
import { navigationBreadcrumbPaddingTop } from '~/components/modules/Nav/Nav.styles';
import { TextBasedNavigationListItem } from '~/data/models/TextBasedNavigationProps';
import { ROUTES } from '~/lib/constants';
import { mapArrayToBreadcrumbs } from '~/lib/utils/breadcrumbs';
import {
  capitalize,
  removeTireFromQueryParam,
  slugify,
  titleCaseSlug,
} from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './Makepage.styles';

interface MakePageData {
  makeData: MakePageProps;
}
export interface MakePageProps {
  body: string;
  header: HeaderWithLogoProps;
  models: Array<TextBasedNavigationListItem>;
  name: string;
}

function MakePage({ makeData }: MakePageData) {
  const name = makeData.name;
  const body = makeData.body;

  const makeUrl = ui('makePages.url', {
    make: slugify(makeData.name),
  });

  const makeUrlLabel = ui('makePages.label', {
    make: capitalize(removeTireFromQueryParam(name)),
  });

  const pageSubHeader = ui('vehicles.makePageTitle', {
    make: name,
  });

  const makeBreadCrumData: BreadcrumbsItem[] = mapArrayToBreadcrumbs([
    {
      type: ROUTES.HOME,
    },
    {
      type: ROUTES.VEHICLES,
    },
    {
      label: makeUrlLabel,
      url: makeUrl.toLowerCase(),
    },
  ]);
  const meta = {
    title: ui('meta.makePages.title', {
      make: capitalize(name),
    }),
    description: ui('meta.makePages.description', {
      make: capitalize(name),
    }),
  };
  return (
    <div css={[navigationBreadcrumbPaddingTop]}>
      <Meta {...meta} />
      <Grid>
        <GridItem
          gridColumn={'2/6'}
          gridColumnM={'2/8'}
          gridColumnL={'2/14'}
          gridColumnXL={'4/12'}
        >
          <div css={styles.breadCrumbs}>
            <BreadcrumbsComponent navigationItems={makeBreadCrumData} />
          </div>
          <div css={styles.header}>
            <HeaderWithLogo {...makeData.header} />
          </div>
          <h2 css={styles.header}>{pageSubHeader}</h2>
        </GridItem>
      </Grid>
      <div css={styles.body}>
        <ModuleMarkdown body={body} type={'SiteModuleMarkdown'} />
      </div>
      <Grid>
        <GridItem
          gridColumn={'2/6'}
          gridColumnM={'2/8'}
          gridColumnL={'2/14'}
          gridColumnXL={'4/12'}
        >
          <div css={styles.makeList}>
            <TextBasedList links={makeData.models} />
          </div>
        </GridItem>
      </Grid>
      <SearchByBoard
        hasBrand={false}
        hasTireSize={false}
        title={ui('searchByBoard.interplotedTitle', {
          name: titleCaseSlug(name),
        })}
        vehicleName={titleCaseSlug(name)}
      />
    </div>
  );
}

export default MakePage;
