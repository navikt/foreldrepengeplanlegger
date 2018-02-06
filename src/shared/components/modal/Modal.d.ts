import * as React from 'react';

export type ModalHeaderType = 'success' | 'alert' | 'warning' | undefined;

export interface ModalProps {
	type: ModalHeaderType;
	title: string;
	children: React.ReactNode | string;
	isOpen: boolean;
	onClose: () => void;
}

declare class Modal extends React.Component<ModalProps> {}

export default Modal;
