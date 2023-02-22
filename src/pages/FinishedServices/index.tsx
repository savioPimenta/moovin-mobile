import React from 'react';
import NoOrders from '../../components/NoOrders';
import ServiceList from '../../components/ServiceList';
import { useOrders } from '../../contexts/orderContext';

import * as S from '../NewServices/styles';

const FinishedServices: React.FC = () => {
  const { orders } = useOrders()

  return (
    <S.Container>
      {orders?.finishedOrders.length > 0 ? (
        <ServiceList type="finishedOrders" />
      ) : (
        <NoOrders />
      )}
    </S.Container>
  )
}

export default FinishedServices;