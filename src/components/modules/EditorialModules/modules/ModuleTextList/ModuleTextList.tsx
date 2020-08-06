import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import TextBasedList from '~/components/global/TextBasedList/TextBasedList';
import { styles } from '~/components/modules/EditorialModules/EditorialModules.styles';
import { SiteModuleTextList } from '~/data/models/SiteModules';

function ModuleTextList(props: SiteModuleTextList) {
  return (
    <div data-component="module-text-list">
      <Grid css={styles.spacingTopS40XL60}>
        <GridItem gridColumnL={'2/14'} gridColumnXL={'4/12'}>
          <TextBasedList {...props} />
        </GridItem>
      </Grid>
    </div>
  );
}

export default ModuleTextList;