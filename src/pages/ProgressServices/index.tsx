import React from 'react';
import NoOrders from '../../components/NoOrders';
import ServiceList from '../../components/ServiceList';
import { useOrders } from '../../contexts/orderContext';
import * as S from '../NewServices/styles';

const ProgressServices: React.FC = () => {
  const { orders } = useOrders()

  return (
    <S.Container>
      {orders?.myOrders.length > 0 ? (
        <ServiceList type="myOrders" />
      ) : (
        <NoOrders />
      )}
    </S.Container>
  )
}

export default ProgressServices;