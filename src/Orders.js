import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import Order from "./Order";
import "./Orders.css";
import { useStateValue } from "./StateProvider";

function Orders() {
  const [{ user }] = useStateValue(); // to pull data it from the react context api
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // to pull data it from the firebase database
    if(user) {
        db.collection("users")
        .doc(user?.uid) // getting the details of the user that is currently logged in that time
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot( snapshot => {
            setOrders(snapshot.docs.map( doc => ({
                id:doc.id,
                data: doc.data()
            })))
        })
    } else {
        setOrders([])
    }

  }, [user]);
  return (
    <div className="orders">
      <h1>Your Orders</h1>

      <div className="orders_order">
        {orders?.map( order => (
            <Order order ={order} ></Order>
        ))}
      </div>
    </div>
  );
}

export default Orders;
