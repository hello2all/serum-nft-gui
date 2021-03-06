import BalancesTable from './BalancesTable';
import OpenOrderTable from './OpenOrderTable';
import React from 'react';
import { Tabs } from 'antd';
import FillsTable from './FillsTable';
import FloatingElement from '../layout/FloatingElement';
import { useOpenOrders, useBalances } from '../../utils/markets';

const { TabPane } = Tabs;

export default function Index() {
  return (
    <FloatingElement
      style={{
        width: '100%',
        flex: 1,
        paddingTop: 20,
        background: 'transparent',
        borderRadius: '25px',
      }}
    >
      <Tabs defaultActiveKey="orders">
        <TabPane tab="Open Orders" key="orders">
          <OpenOrdersTab />
        </TabPane>
        <TabPane tab="Recent Trade History" key="fills">
          <FillsTable />
        </TabPane>
        <TabPane tab="Balances" key="balances">
          <BalancesTab />
        </TabPane>
      </Tabs>
    </FloatingElement>
  );
}

const OpenOrdersTab = () => {
  const openOrders = useOpenOrders();

  return <OpenOrderTable openOrders={openOrders} />;
};

const BalancesTab = () => {
  const balances = useBalances();

  return <BalancesTable balances={balances} />;
};
