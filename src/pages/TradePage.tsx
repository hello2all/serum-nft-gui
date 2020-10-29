import React, { useCallback, useEffect, useRef } from 'react';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import { useMarket } from '../utils/markets';
import USE_NFTS from '../nfts';
import { NftCardTrade, NftView } from '../components/NftCard';
import { useWindowDimensions } from '../components/utils';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px 16px;
  .borderNone .ant-select-selector {
    border: none !important;
  }
`;

export default function TradePage() {
  const { marketName } = useMarket();

  useEffect(() => {
    document.title = marketName ? `${marketName} — Solible` : 'Solible';
  }, [marketName]);

  const changeOrderRef = useRef<
    ({ size, price }: { size?: number; price?: number }) => void
  >();

  const componentProps = {
    onChangeOrderRef: (ref: any) => (changeOrderRef.current = ref),
    onPrice: useCallback(
      (price) => changeOrderRef.current && changeOrderRef.current({ price }),
      [],
    ),
    onSize: useCallback(
      (size) => changeOrderRef.current && changeOrderRef.current({ size }),
      [],
    ),
  };

  return (
    <>
      <Wrapper>
        <RenderTradePage {...componentProps} />
      </Wrapper>
    </>
  );
}

const RenderTradePage = ({ onChangeOrderRef, onPrice, onSize }) => {
  const { market } = useMarket();
  const windowDimensions = useWindowDimensions();

  const styles = {
    col: { padding: 20 },
  };

  let NFT: any;
  if (market) {
    NFT = USE_NFTS.filter(
      (nft) => nft.marketAddress.toBase58() === market.address.toBase58(),
    )[0];
  }
  if (!NFT) {
    return null;
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        <>
          <div style={{ flex: 1, paddingRight: 20, paddingLeft: 20 }}>
            <NftView nft={NFT} />
          </div>
          <div style={{ flex: 1, paddingRight: 20, paddingLeft: 20 }}>
            <NftCardTrade
              nft={NFT}
              setChangeOrderRef={onChangeOrderRef}
              smallScreen={false}
              onPrice={onPrice}
              onSize={onSize}
            />
          </div>
        </>
      </div>
    </>
  );
};
