
import { forwardRef, useImperativeHandle, useRef } from 'react';

export default forwardRef(function CheckboxInput(
    {
        className = '',
        ...props
    },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    const baseClasses =
        'h-4 w-4 rounded border-2 border-neutral-300 bg-neutral-50 text-purple-600 focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition-all cursor-pointer';

    const disabledClasses =
        'opacity-60 cursor-not-allowed bg-neutral-200';

    return (
        <input
            {...props}
            type="checkbox"
            className={
                baseClasses +
                (props.disabled ? ` ${disabledClasses}` : '') +
                (className ? ` ${className}` : '')
            }
            ref={localRef}
        />
    );
});
