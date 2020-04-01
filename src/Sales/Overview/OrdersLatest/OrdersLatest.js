import React from 'react';
import MaterialTable from 'material-table';
import axios from 'axios'


export default function MainOrders() {
  const columns = [
    { title: 'Rank', field: 'Rank' },
    { title: 'Name', field: 'Name' },
    { title: 'Platform', field: 'Platform'},
    { title: 'Year', field: 'Year'},
    { title: 'Genre', field: 'Genre'},
    { title: 'Publisher', field: 'Publisher'},
    {title: 'Global_Sales', field: 'Global_Sales'}
  ]
  const [state, setState] = React.useState({
    columns: columns,
    data: [],
  });


  axios.get('http://starlord.hackerearth.com/TopSellingGames')
  .then(function (response) {
    // handle success
    console.log(response);

    setState({
      columns: columns,
      data: response.data
    })

    debugger;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });


  
  return (
    <MaterialTable
      title="Top Selling Games"
      columns={state.columns}
      data={state.data}
    />
  );
}
