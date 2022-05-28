import { useState } from 'react';

import { NewProductProps } from '../../../../interfaces/Product';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControlLabel, FormGroup, FormLabel, Switch } from '@mui/material';

import PhotoCamera from '@mui/icons-material/PhotoCamera';

import DeleteIcon from "@mui/icons-material/Delete"

const NewProduct = ({ isVisible, setIsVisible }: NewProductProps) => {
	const UploadInput = styled('input')({
		display: 'none'
	});

	return (
		<>
			<Dialog fullWidth open={isVisible} onClose={() => setIsVisible(false)}>
				<DialogTitle>New product</DialogTitle>
				<DialogContent style={{ flexDirection: 'column', display: 'flex' }}>
					<TextField
						required
						margin="dense"
						label="Title"
					/>

					<TextField
						required
						margin="dense"
						label="Price"
						type='number'
					/>

					<TextField
						required
						margin="dense"
						label="Stock"
						type='number'
					/>
					
					<TextField
						margin="dense"
						label="Description"
						multiline
						rows={4}
					/>

					<FormGroup style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
						<FormControlLabel disabled={false} control={<Switch defaultChecked />} label="On sale?" />
						<TextField
							margin="dense"
							label="Sale price"
							type='number'
						/>
					</FormGroup>

					<FormLabel style={{ marginTop: 15, marginBottom: -10 }}>Attributes</FormLabel>
					<FormGroup style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 15, marginBottom: 15 }}>
						<TextField
							margin="dense"
							label="Name"
							style={{ marginRight: 25 }}
							defaultValue="ex: color"
						/>
						<TextField
							margin="dense"
							label="Value"
							style={{ marginRight: 15 }}
							defaultValue="ex: green"
						/>
						<IconButton
							style={{ height: 40 }}
							aria-label="remove"
							onClick={() => { }}
						>
							<DeleteIcon />
						</IconButton>
					</FormGroup>
					<Button style={{ width: 150 }} variant="contained">+ attribute</Button>

					<FormLabel style={{ marginTop: 20, marginBottom: 10 }}>Images</FormLabel>
					<label htmlFor="contained-button-file">
						<UploadInput accept="image/*" id="contained-button-file" multiple type="file" />
						<Button variant="contained" component="span">
						Upload
						</Button>
					</label>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setIsVisible(false)}>Cancel</Button>
					<Button onClick={() => setIsVisible(false)}>Create</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default NewProduct;