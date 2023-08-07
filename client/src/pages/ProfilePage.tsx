import React, { useCallback, useEffect, useState } from 'react';
import ContactInfo from '../components/ContactInfo/ContactInfo';
import Loader from '../components/Loader';
import OrderList from '../components/OrderList/OrderList';
import { useHttp } from '../hooks/http.hook';
import { useAppSelector } from '../hooks/redux.hook';
import IOrder from '../interfaces/IOrder';

export default function ProfilePage() {
  const { login, token } = useAppSelector((state) => state.auth);
  const [orders, setOrders] = useState<IOrder[]>([]);

  const { request, loading } = useHttp();

  const getContactData = useCallback(
    async (signal: AbortSignal) => {
      const data = await request<{
        orders: IOrder[];
      }>(
        `/users/orders/${login}`,
        'GET',
        null,
        { Authorization: token },
        signal,
      );
      setOrders(data.orders);
    },
    [login],
  );
  useEffect(() => {
    const controller = new AbortController();
    getContactData(controller.signal);
    return () => {
      controller.abort();
    };
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <h1 style={{ marginTop: '20px', marginBottom: '20px' }}>
        Здравствуйте {login}
      </h1>
      <h2>Контактная информация</h2>
      <ContactInfo />
      <h2>Ваши заказы</h2>
      <OrderList orders={orders} />
    </div>
  );
}
