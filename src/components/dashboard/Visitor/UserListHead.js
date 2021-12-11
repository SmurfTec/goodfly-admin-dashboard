// material
import {
  Box,
  Checkbox,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
} from '@material-ui/core';

// ----------------------------------------------------------------------

export default function UserListHead({ headLabel }) {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          {/* <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          /> */}
        </TableCell>
        {headLabel.map((headCell) => (
          <TableCell key={headCell.id} align={'center'}>
            <TableSortLabel hideSortIcon direction={'asc'}>
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
