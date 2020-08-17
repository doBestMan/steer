import { NextPageContext } from 'next';

import { NAV_THEME } from '~/components/modules/Nav/Nav.theme';
import ErrorPage from '~/components/pages/ErrorPage/ErrorPage';
import { useNavContext } from '~/context/Nav.context';
import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';
import { ui } from '~/lib/utils/ui-dictionary';
import { uiJSX } from '~/lib/utils/ui-dictionary-jsx';

interface Props {
  statusCode: number;
}
function Error({ statusCode }: Props) {
  const { customerServiceNumber } = useSiteGlobalsContext();
  const { setNavTheme } = useNavContext();

  setNavTheme(NAV_THEME.DEFAULT);

  const is404 = statusCode === 404;
  const description = is404
    ? ui('error.notFoundDescription')
    : ui('error.erroDescription');

  const callCopy = uiJSX('error.callCopy', {
    number: (
      <a href={`tel:${customerServiceNumber.value}`}>
        {customerServiceNumber.display}
      </a>
    ),
  });
  const copy = !is404 ? callCopy : undefined;

  return (
    <ErrorPage
      copy={copy}
      errorCode={statusCode}
      description={description}
      hasHomeButton={is404}
    />
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
