import { useState } from 'react';

import { Input, TableContainer, TablePagination } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from '@mui/material/IconButton';

import EditIcon from "@mui/icons-material/EditOutlined";
import DoneIcon from "@mui/icons-material/DoneAllTwoTone";
import RevertIcon from "@mui/icons-material/NotInterestedOutlined";
import { Product } from '../../../interfaces/Product';

type Entity = Product

const CustomTableCell = ({ row, name, updateRow }: any) => {
	const { isEditMode } = row;
	return (
		<TableCell align="left">
			{isEditMode ? (
				<Input
					value={row.attributes[name]}
					name={name}
					onChange={e => updateRow(e, row)}
				/>
			) : (
				row.attributes[name]
			)}
		</TableCell>
	);
};

const EditableTable = ({ columns, rows }: any) => {
	let setRows: React.Dispatch<React.SetStateAction<any[]>>
	[rows, setRows] = useState(rows);
	const [previous, setPrevious]: any = useState({});
	const toggleEditMode = (id: any) => {
		setRows(state => {
			return rows.map((row: Entity) => {
				if (row.id === id) {
					return { ...row, isEditMode: !row.isEditMode };
				}
				return row;
			});
		});
	};
	const updateRow = (e: any, row: any) => {
		if (!previous[row.id]) {
			setPrevious((state: any) => ({ ...state, [row.id]: row }));
		}
		const value = e.target.value;
		const name = e.target.name;
		const { id } = row;
		const newRows = rows.map((row: Entity) => {
			if (row.id === id) {
				return { ...row, [name]: value };
			}
			return row;
		});
		setRows(newRows);
	};
	const revert = (id: any) => {
		const newRows = rows.map((row: Entity) => {
			if (row.id === id) {
				return previous[id] ?? row;
			}
			return row;
		});
		setRows(newRows);
		setPrevious((state: any) => {
			delete state[id];
			return state;
		});
		toggleEditMode(id);
	};

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const changePage = (event: unknown, newPage: number) => setPage(newPage);
	const changeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							{columns.map((column: any, i: number) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, i: number) => {
							return (
								<TableRow hover role="checkbox" tabIndex={-1} key={i}>
									<TableCell>
										{row.isEditMode ? (
											<>
												<IconButton
													aria-label="done"
													onClick={() => toggleEditMode(row.id)}
												>
													<DoneIcon />
												</IconButton>
												<IconButton
													aria-label="revert"
													onClick={() => revert(row.id)}
												>
													<RevertIcon />
												</IconButton>
											</>
										) : (
											<IconButton
												aria-label="delete"
												onClick={() => toggleEditMode(row.id)}
											>
												<EditIcon />
											</IconButton>
										)}
									</TableCell>
									{
										columns.map((column: any, i: number) => {
											return i ? <CustomTableCell key={i} {...{ row, name: column.id, updateRow }} /> : <></>
										})
									}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={changePage}
				onRowsPerPageChange={changeRowsPerPage}
			/>
		</Paper>
	);
}

export default EditableTable