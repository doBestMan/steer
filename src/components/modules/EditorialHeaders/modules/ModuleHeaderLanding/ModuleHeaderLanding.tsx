import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import HeaderLandingPage from '~/components/global/HeaderLandingPage/HeaderLandingPage';
import { SiteHeaderModule } from '~/data/models/SiteHeaderModule';

function ModuleHeaderLanding(data: SiteHeaderModule) {
  return (
    <Grid>
      <GridItem gridColumnL={'3/13'} gridColumnXL={'5/11'}>
        <div data-component="module-header-landing-page">
          <HeaderLandingPage {...data} />
        </div>
      </GridItem>
    </Grid>
  );
}

export default ModuleHeaderLanding;
