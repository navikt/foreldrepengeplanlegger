import * as React from 'react';

export interface TransformingRadioGroupStageValue {
	label: string;
	value: string;
}

export interface TransformingRadioGroupStage {
	legend: string;
	name: string;
	values: TransformingRadioGroupStageValue[];
	selectedValue?: string;
}

export interface TransformingRadioGroupProps {
	collapsed: boolean;
	expanded: boolean;
	stage: TransformingRadioGroupStage;
	onClickCollapsed: (evt: any, value: string) => void;
	onClickExpanded: (evt: any, value: string) => void;
}

declare class TransformingRadioGroup extends React.Component<TransformingRadioGroupProps> {}

export default TransformingRadioGroup;
