import React, { ReactElement } from 'react';
import { FormrWrapperProps } from './Types';
import useFormr from './useFormr';

const Formr = <T extends object>({
    children,
    ...props
}: FormrWrapperProps<T>): ReactElement => {
    const returnItem = useFormr<T>(props);
    return children(returnItem);
};

export default React.memo(Formr);
