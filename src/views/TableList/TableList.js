import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { ButtonGroup, Button, Drawer } from "@material-ui/core";
import products from "data/products.json";

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
  buttonGroup: {
    boxShadow: "0px 0px 0px",
    display: "flex",
    justifyContent: "flex-end",
  },
};

const useStyles = makeStyles(styles);

export default function TableList() {
  console.log(products);
  const classes = useStyles();
  const [toggleAdd, setToggleAdd] = useState(false);

  const handleClick = (type) => {};
  const tableHead = [
    "id",
    "sku",
    "name",
    "price",
    "discount",
    "saleCount",
    "category",
  ];

  const formatData = (products) => {
    return products.map((prod, index) => {
      let result = [];
      for (const [key, value] of Object.entries(prod)) {
        if (tableHead.indexOf(key) !== -1) {
          result.push(value);
        }
      }
      return result;
    });
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <GridContainer>
              <GridItem xs={6} sm={6} md={6}>
                <h4 className={classes.cardTitleWhite}>Item Table</h4>
                <p className={classes.cardCategoryWhite}>List Item in system</p>
              </GridItem>
              <GridItem xs={6} sm={6} md={6}>
                <ButtonGroup
                  className={classes.buttonGroup}
                  variant="contained"
                  color="primary"
                  aria-label="contained primary button group"
                >
                  <Button onClick={() => handleClick("add")}>Add</Button>
                  <Button color="primary" onClick={() => handleClick("edit")}>
                    Edit
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => handleClick("delete")}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </GridItem>
            </GridContainer>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={tableHead}
              tableData={formatData(products)}
            />
          </CardBody>
        </Card>
      </GridItem>

      <Drawer
        anchor="right"
        open={toggleAdd}
        onClose={() => setToggleAdd(false)}
      >
        hello worlD
      </Drawer>
    </GridContainer>
  );
}
