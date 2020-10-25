import React, { useRef, useState, useCallback, useEffect } from 'react';
import { FormrWrapperProps } from './Types';
import useFormr from './useFormr';

const Formr: React.FC<FormrWrapperProps> = ({ children, ...props }) => {
    const returnItem = useFormr(props);
    return children(returnItem);
};

export default React.memo(Formr);
