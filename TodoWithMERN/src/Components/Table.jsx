import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { MdDelete } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export function UserTable({ data, onEdit, onDelete }) {
  const [editIndex, setEditIndex] = React.useState(null);
  const [editValue, setEditValue] = React.useState('');

  // Handle edit click
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(data[index].text);
  };

  // Handle save after editing
  const handleSave = (index) => {
    onEdit(index, editValue);
    setEditIndex(null);
  };

  // Handle input change during edit
  const handleInputChange = (event) => {
    setEditValue(event.target.value);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableBody>
          
          {data.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {editIndex === index ? (
                  <TextField
                    value={editValue}
                    onChange={handleInputChange}
                    size="small"
                    autoFocus
                  />
                ) : (
                  row.text
                )}
              </StyledTableCell>
              <StyledTableCell align="right">
                {editIndex === index ? (
                  <button
                    onClick={() => handleSave(index)}
                    style={{ cursor: 'pointer', border: 'none', background: 'none' }}
                  >
                    <IoCheckmarkDoneSharp size={20} color="green" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(index)}
                    style={{ cursor: 'pointer', border: 'none', background: 'none' }}
                  >
                    <CiEdit size={20} />
                  </button>
                )}
              </StyledTableCell>
              <StyledTableCell align="right">
                <button
                  onClick={() => onDelete(index)}
                  style={{ cursor: 'pointer', border: 'none', background: 'none' }}
                >
                  <MdDelete size={20} color="red" />
                </button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
