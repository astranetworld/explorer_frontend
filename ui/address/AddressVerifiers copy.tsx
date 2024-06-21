import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';

import type { SocketMessage } from 'lib/socket/types';
import type {
  AddressFromToFilter,
  AddressTransactionsResponse,
} from 'types/api/address';
import { AddressFromToFilterValues } from 'types/api/address';
import type { Transaction } from 'types/api/transaction';

import { getResourceKey } from 'lib/api/useApiQuery';
import getFilterValueFromQuery from 'lib/getFilterValueFromQuery';
import useIsMobile from 'lib/hooks/useIsMobile';
import getQueryParamString from 'lib/router/getQueryParamString';
import useSocketChannel from 'lib/socket/useSocketChannel';
import useSocketMessage from 'lib/socket/useSocketMessage';
import { TX } from 'stubs/tx';
import { generateListStub } from 'stubs/utils';
import TxsContent from 'ui/addressVerifiers/TxsContent';
import ActionBar from 'ui/shared/ActionBar';
import Pagination from 'ui/shared/pagination/Pagination';
import useQueryWithPages from 'ui/shared/pagination/useQueryWithPages';
// import TxsContent from "ui/txs/TxsContent";

import AddressCsvExportLink from './AddressCsvExportLink';
import AddressTxsFilter from './AddressTxsFilter';

const OVERLOAD_COUNT = 75;

type Props = {
  scrollRef?: React.RefObject<HTMLDivElement>;
  // for tests only
  overloadCount?: number;
};

const AddressTxs = ({ scrollRef, overloadCount = OVERLOAD_COUNT }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [ socketAlert, setSocketAlert ] = React.useState('');
  const [ newItemsCount, setNewItemsCount ] = React.useState(0);

  const isMobile = useIsMobile();
  const currentAddress = getQueryParamString(router.query.hash);

  const addressTxsQuery = useQueryWithPages({
    resourceName: 'address_verifiers',
    pathParams: { hash: currentAddress },
    scrollRef,
    options: {
    //   placeholderData: generateListStub<'address_verifiers'>(TX, 50, {
    //     next_page_params: {
    //       block_number: 9005713,
    //       index: 5,
    //       items_count: 50,
    //     },
    //   }),
    },
  });

  return (
    <>
      { !isMobile && (
        <ActionBar mt={ -6 }>
          { /* {filter} */ }
          { /* {currentAddress && csvExportLink} */ }
          <Pagination { ...addressTxsQuery.pagination } ml={ 8 }/>
        </ActionBar>
      ) }
      <TxsContent
        query={ addressTxsQuery }
        currentAddress={
          typeof currentAddress === 'string' ? currentAddress : undefined
        }
        // enableTimeIncrement
        // showSocketInfo={addressTxsQuery.pagination.page === 1}
        // socketInfoAlert={socketAlert}
        // socketInfoNum={newItemsCount}
        top={ 80 }
      />
    </>
  );
};

export default AddressTxs;
