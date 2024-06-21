import { HStack, Box, Flex, Skeleton } from '@chakra-ui/react';
import React from 'react';

import type { Transaction } from 'types/api/transaction';

import config from 'configs/app';
import rightArrowIcon from 'icons/arrows/east.svg';
import getValueWithUnit from 'lib/getValueWithUnit';
import useTimeAgoIncrement from 'lib/hooks/useTimeAgoIncrement';
import { space } from 'lib/html-entities';
import Icon from 'ui/shared/chakra/Icon';
import CurrencyValue from 'ui/shared/CurrencyValue';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import AddressEntityMine from 'ui/shared/entities/address/AddressEntityMine';
import BlockEntity from 'ui/shared/entities/block/BlockEntity';
import TxEntity from 'ui/shared/entities/tx/TxEntity';
import InOutTag from 'ui/shared/InOutTag';
import ListItemMobile from 'ui/shared/ListItemMobile/ListItemMobile';
import TxStatus from 'ui/shared/statusTag/TxStatus';
import TxFeeStability from 'ui/shared/tx/TxFeeStability';
import TxWatchListTags from 'ui/shared/tx/TxWatchListTags';
import TxAdditionalInfo from 'ui/txs/TxAdditionalInfo';
import TxType from 'ui/txs/TxType';

type Props = {
  tx: Transaction;
  showBlockInfo: boolean;
  currentAddress?: string;
  enableTimeIncrement?: boolean;
  isLoading?: boolean;
};

const TAG_WIDTH = 48;
const ARROW_WIDTH = 24;

const TxsListItem = ({
  tx,
  isLoading,
  showBlockInfo,
  currentAddress,
  enableTimeIncrement,
}: Props) => {
  const dataTo = tx.to ? tx.to : tx.created_contract;

  const timeAgo = useTimeAgoIncrement(tx.timestamp, enableTimeIncrement);

  // FORMAT MY DATA
  const formatData = {
    hash: tx.address_hash,
    implementation_name: null,
    is_contract: false,
    is_verified: false,
    name: null,
    private_tags: [],
    public_tags: [],
    watchlist_names: [],
  };

  const addressFrom = (
    <AddressEntityMine
      address={{ ...formatData }}
      isLoading={ isLoading }
      noCopy={ false }
      noLink={ false }
      //   truncation="constant"
      truncation="none"
      w="100%"
      py="2px"
    />
  );

  return (
    <ListItemMobile
      display="block"
      width="100%"
      isAnimated
      key={ tx.address_hash }
    >
      { tx.block_number && (
        <Flex mt={ 3 }>
          <Skeleton
            isLoaded={ !isLoading }
            display="inline-block"
            whiteSpace="pre"
          >
            Block&nbsp;
          </Skeleton>
          { /* <Skeleton isLoaded={ !isLoading } display="inline-block" whiteSpace="pre">Method </Skeleton> */ }
          <Skeleton
            isLoaded={ !isLoading }
            color="text_secondary"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            <BlockEntity
              isLoading={ isLoading }
              number={ tx.block_number }
              noIcon
              fontSize="sm"
              lineHeight={ 6 }
              fontWeight={ 500 }
            />
          </Skeleton>
        </Flex>
      ) }
      <Flex mt={ 3 }>
        <Skeleton isLoaded={ !isLoading } display="inline-block" whiteSpace="pre">
          Time&nbsp;
        </Skeleton>
        { /* <Skeleton isLoaded={ !isLoading } display="inline-block" whiteSpace="pre">Method </Skeleton> */ }
        <Skeleton
          isLoaded={ !isLoading }
          color="text_secondary"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          { tx.block_timestamp ?
            new Date(tx.block_timestamp)
              .toISOString()
              .replace('T', ' ')
              .replace(/\.\d{3}Z$/, '') :
            '' }
        </Skeleton>
      </Flex>
    </ListItemMobile>
  );
};

export default React.memo(TxsListItem);
