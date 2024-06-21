import {
  Tr,
  Td,
  VStack,
  Show,
  Hide,
  Flex,
  Skeleton,
  Box,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

import type { Transaction } from 'types/api/transaction';

import config from 'configs/app';
import rightArrowIcon from 'icons/arrows/east.svg';
import useTimeAgoIncrement from 'lib/hooks/useTimeAgoIncrement';
import Icon from 'ui/shared/chakra/Icon';
import Tag from 'ui/shared/chakra/Tag';
import CurrencyValue from 'ui/shared/CurrencyValue';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import AddressEntityMine from 'ui/shared/entities/address/AddressEntityMine';
import BlockEntity from 'ui/shared/entities/block/BlockEntity';
import TxEntity from 'ui/shared/entities/tx/TxEntity';
import InOutTag from 'ui/shared/InOutTag';
import TxStatus from 'ui/shared/statusTag/TxStatus';
import TxFeeStability from 'ui/shared/tx/TxFeeStability';
import TxWatchListTags from 'ui/shared/tx/TxWatchListTags';
// import TxAdditionalInfo from "ui/txs/TxAdditionalInfo";
// TMP

import TxType from './TxType';

type Props = {
  tx: Transaction;
  showBlockInfo: boolean;
  currentAddress?: string;
  enableTimeIncrement?: boolean;
  isLoading?: boolean;
};

const TxsTableItem = ({
  tx,
  showBlockInfo,
  currentAddress,
  enableTimeIncrement,
  isLoading,
}: Props) => {
  if (isLoading) {
    return null;
  }

  //   const addressFrom = (
  //     <AddressEntityMine
  //       address={tx.address_hash}
  //       isLoading={isLoading}
  //       noCopy={isOut}
  //       noLink={isOut}
  //       truncation="constant"
  //       w="100%"
  //       py="2px"
  //     />
  //   );

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

  //   const addressFrom = (
  //     <AddressEntityMine
  //       address={{ ...formatData }}
  //       isLoading={isLoading}
  //       noCopy={isOut}
  //       noLink={isOut}
  //       //   truncation="constant"
  //       truncation="none"
  //       w="100%"
  //       py="2px"
  //     />
  //   );

  return (
    <Tr
      as={ motion.tr }
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transitionDuration="normal"
      transitionTimingFunction="linear"
      key={ tx.address_hash! }
    >
      <Td>
        <BlockEntity
          isLoading={ isLoading }
          number={ tx.block_number }
          noIcon
          fontSize="sm"
          lineHeight={ 6 }
          fontWeight={ 500 }
        />
      </Td>
      <Td>
        { tx.block_timestamp ?
          new Date(tx.block_timestamp)
            .toISOString()
            .replace('T', ' ')
            .replace(/\.\d{3}Z$/, '') :
          '' }
      </Td>

      <Td isNumeric>
        <CurrencyValue value={ tx.amount } accuracy={ 8 } isLoading={ isLoading }/>
      </Td>
    </Tr>
  );
};

export default React.memo(TxsTableItem);
