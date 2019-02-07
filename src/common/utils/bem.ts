import classNames from 'classnames';

const BEMHelper = (cls: string) => ({
    block: cls,
    element: (e?: string, m?: string) => `${cls}__${e}${m ? ` ${cls}__${e}--${m}` : ''}`,
    modifier: (m?: string) => `${cls}--${m}`,
    child: (c: string) => BEMHelper(BEMHelper(cls).element(c)),
    classNames
});

export default BEMHelper;
