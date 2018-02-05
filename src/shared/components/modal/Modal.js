import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'nav-frontend-modal';

import ModalHeader from './Modal.header';

const FpModal = ({ children, title, type, isOpen, onClose }) => (
	<Modal
		className="modal"
		contentLabel={title}
		isOpen={isOpen}
		closeButton={true}
		onRequestClose={() => onClose}>
		<ModalHeader type={type} title={title} />
		{children}
	</Modal>
);

FpModal.propTypes = {
	children: PropTypes.node.isRequired,
	title: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	isOpen: PropTypes.bool,
	onClose: PropTypes.func.isRequired
};

FpModal.defaultProps = {
	isOpen: false
};

export default FpModal;
