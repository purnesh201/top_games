import React, { useState } from 'react'
import moment from 'moment'
// import clsx from 'clsx'
// import { makeStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'

import PageContainer from '../../_common/PageContainer'
import PageToolbar from '../../_common/PageToolbar'

import { SalesDashboardProvider } from './overviewContext'

import SalesDashboardActions from './OverviewActions'

import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

export default function OverviewForm() {
  const [filter, setFilter] = useState({
    dateFrom: moment()
      .subtract(14, 'day')
      .startOf('day'),
    dateTo: moment().startOf('day'),
  })

  const PageTitle = 'Forms'

  return (
    <SalesDashboardProvider value={{ filter, setFilter }}>
      <PageContainer>
        <PageToolbar
          title={PageTitle}
          actionsComponent={SalesDashboardActions}
        ></PageToolbar>


    <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="fname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="lname"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="billing address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="billing address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="billing address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="state" label="State/Province/Region" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="billing postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="billing country"
          />
        </Grid>
        <Grid item xs={12}>
            <Button variant="contained" color="primary"> Submit </Button>
        </Grid>
      </Grid>

      </PageContainer>
    </SalesDashboardProvider>
  )
}