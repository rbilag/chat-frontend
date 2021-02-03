import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';
import './style.css';

export interface ConfirmationDialogProps {
	content: string;
	open: boolean;
	onClose: (willProceed: boolean) => void;
}

function ConfirmationDialog({ content, open, onClose }: ConfirmationDialogProps) {
	return (
		<Dialog
			open={open}
			onClose={() => onClose(false)}
			aria-labelledby="confirmation-dialog-title"
			aria-describedby="confirmation-dialog-description"
		>
			<DialogTitle id="confirmation-dialog-title">Are you sure?</DialogTitle>
			<DialogContent>
				<DialogContentText id="confirmation-dialog-description">{content}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => onClose(false)} color="primary">
					Cancel
				</Button>
				<Button onClick={() => onClose(true)} color="primary" autoFocus>
					Proceed
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default ConfirmationDialog;
