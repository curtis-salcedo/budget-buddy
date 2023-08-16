import React, { useState, useEffect } from 'react';

import * as BudgetsAPI from '../../utilities/api/budgets-api';

// Style Imports
import {
  Container,
  Card,
  CardTitle,
  CardBody,
  CardFooter,
  Button,
} from 'reactstrap';

export default function Budget() {
  const [budget, setBudget] = useState([]);

  useEffect(() => {
    BudgetsAPI.getBudget()
      .then(budgets => setBudget(budgets))
      .catch(error => console.error(error));
  }, []);

  const handleEdit = () => {
    console.log('Edit Budget');
  }

  return (
    <Container>
  <p>Some sort of chart here</p>
      <Card>
        <CardTitle>Montly Spending</CardTitle>
        <CardBody>
          <p>Monthly Spending by category</p>
        </CardBody>
      </Card>
    </Container>
  )
}