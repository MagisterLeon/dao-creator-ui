import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import React, { ReactElement, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import styles from './style.module.scss';

interface Asset {
  address: string;
  balance: string;
  decimals: string;
  equity: string;
  logoURI: string;
  name: string;
  network: string;
  price: string;
  symbol: string;
}


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function getData(): Promise<Asset[]> {
  return (
    fetch('dashboardData.json'
      , {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    ).then(res => res.json())
      // eslint-disable-next-line no-console
      .catch(console.warn)
  );
}

const ClubPreview = (): ReactElement => {

  const [rows, setRows] = useState<Asset[]>([]);

  useEffect(() => {
    getData().then(data => setRows(data))
  }, []);

  return (
    <div className={styles.clubPreview}>
      <TableContainer className={styles.table} component={Paper}>
        <Table aria-label="customized table" sx={{ width: 1000 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">Assets</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Balance</StyledTableCell>
              <StyledTableCell align="right">Value</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  <img alt="fireSpot" className={styles.logo} src={row.logoURI}/>
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {`$${parseFloat(row.price).toFixed(5)}`}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {`$${parseFloat(row.balance).toFixed(5)}`}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {`$${parseFloat(row.equity).toFixed(5)}`}
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ClubPreview;
