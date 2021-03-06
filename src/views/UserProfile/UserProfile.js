import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { DataGrid } from "@material-ui/data-grid";
import { db } from "config.js";
import { Drawer } from "@material-ui/core";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

const columns = [
  { field: "id", headerName: "ID", width: 200 },
  { field: "nameBuyer", headerName: "Customer name", width: 300 },
  { field: "emailBuyer", headerName: "Customer email", width: 300 },
  { field: "order_code", headerName: "order_code", width: 300 },
  {
    field: "phoneBuyer",
    headerName: "Customer Phone",
    type: "number",
    width: 300,
  },
  {
    field: "executed",
    headerName: "Status Order",
    width: 300,
    valueGetter: (param) => {
      return param.value ? "Done" : "Pending";
    },
  },
];

const productColumns = [
  { field: "id", headerName: "ID", width: 200 },
  { field: "name", headerName: "Book name", width: 300 },
  { field: "price", headerName: "Book price", width: 300 },
];

export default function TableList() {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [toggle, setToggle] = useState();
  const [rowSelected, setRowSelected] = useState({});
  const fetchOrders = async () => {
    const ref = db.collection("orders_table");
    ref.get().then((res) => {
      let orders = [];
      res.forEach((doc) => {
        orders.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setOrders(orders);
    });
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const onExecuteOrder = async () => {
    const order_raw = {
      token: "861286b9-fd0f-11eb-b5ad-92f02d942f87",
      note: rowSelected.noteBill,
      "required_note": "KHONGCHOXEMHANG",
      shop_id: "82095",
      to_name: rowSelected.nameBuyer,
      to_phone: rowSelected.phoneBuyer,
      to_address: rowSelected.addressBuyer,
      to_ward_code: "20308",
      to_district_id: 1444,
      weight: 200,
      length: 1,
      width: 19,
      height: 10,
      service_type_id: 2,
      payment_type_id: 2,
      name: "Sach",
      quantity: 1,
      Items: []
    }

    const orderCreate = await fetch("https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'ShopId': '82095',
        'Token': '861286b9-fd0f-11eb-b5ad-92f02d942f87'
      },
      body: JSON.stringify(order_raw)
    })

    const response = await orderCreate.json()
    console.log(response)


    const dataRef = db.collection("orders_table").doc(rowSelected.id);
    dataRef.update({
      executed: true,
      order_code: response.data.order_code
    });
    setToggle(false);
    fetchOrders();
  };

  const handleRowSelected = (rows) => {
    for (const order of orders) {
      if (rows.indexOf(order.id) !== -1) {
        setRowSelected(order);
        setToggle(true);
      }
    }
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Order Table</h4>
            <p className={classes.cardCategoryWhite}>Order List</p>
          </CardHeader>
          <CardBody style={{ height: 400, width: "auto" }}>
            <DataGrid
              rows={orders}
              columns={columns}
              checkboxSelection
              onSelectionModelChange={handleRowSelected}
            ></DataGrid>
            <Drawer
              anchor="right"
              open={toggle}
              onClose={() => setToggle(false)}
            >
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Order Infomation</h4>
                  <p className={classes.cardCategoryWhite}>{rowSelected.id}</p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={6} md={3}>
                      <p>Customer Name: {rowSelected.nameBuyer}</p>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3}>
                      <p>Customer address: {rowSelected.addressBuyer}</p>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3}>
                      <p>Customer Phone: {rowSelected.phoneBuyer}</p>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={3}>
                      <p>Total Price: {rowSelected.totalPrice}</p>
                    </GridItem>
                  </GridContainer>
                  <GridContainer style={{ height: 400, width: "auto" }}>
                    <DataGrid
                      columns={productColumns}
                      rows={rowSelected.products}
                    ></DataGrid>
                  </GridContainer>
                  <GridContainer
                    style={{ position: "absolute", bottom: "0px" }}
                  >
                    <button onClick={onExecuteOrder}>Execute</button>
                    <button onClick={onExecuteOrder}>Create Order</button>
                  </GridContainer>
                </CardBody>
              </Card>
            </Drawer>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
