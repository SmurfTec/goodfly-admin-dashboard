import { TextField, Box, Typography, List, ListItem } from '@material-ui/core';
import React from 'react';
import { getMuiDateFormat } from 'utils/dateMethods';

const PrintOrder = React.forwardRef((props, ref) => {
  const { order } = props;
  return (
    <div
      ref={ref}
      style={{
        backgroundColor: '#fff',
        minHeight: '100vh',
        margin: '1rem 0rem 1rem',
        border: '1px solid #fff',
        padding: '30px 30px',
      }}
    >
      <Box>
        <Typography variant='h5'>Visitor Details</Typography>
        <Typography variant='body1'>
          Name:{' '}
          {order.visitor ? order.visitor.fullName : 'Visitor No Longer Exists'}
        </Typography>
        <Typography variant='body1'>
          Email:{' '}
          {order.visitor ? order.visitor.email : 'Visitor No Longer Exists'}
        </Typography>
      </Box>
      <h3>Order Details</h3>
      {order.orderItems?.map((orderItem) => (
        <List sx={{ textAlign: 'center' }}>
          <ListItem>Price €{orderItem.subTotal} </ListItem>
          <ListItem>Quantity €{orderItem.quantity} </ListItem>
          <ListItem>Product €{orderItem.product?.name} </ListItem>
        </List>
      ))}
      <Typography variant='h6'>SubTotal : €{order.subTotal}</Typography>
      <Typography variant='h6'>
        Delivery Charges : €{order.deliveryCharges}
      </Typography>
      <Typography variant='h6'>Grand Total : €{order.total}</Typography>
    </div>
  );
});

export default PrintOrder;
