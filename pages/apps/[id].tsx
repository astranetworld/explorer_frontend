import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

import MarketplaceApp from 'ui/pages/MarketplaceApp';
import Page from 'ui/shared/Page/Page';

const AppPage: NextPage = () => {
  return (
    <Page wrapChildren={ false }>
      <Head><title>Blockscout | Marketplace</title></Head>
      <MarketplaceApp/>
    </Page>
  );
};

export default AppPage;

export { getServerSideProps } from 'lib/next/getServerSideProps';
