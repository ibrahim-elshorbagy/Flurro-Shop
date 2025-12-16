import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextArea(
    {
        className = '',
        isFocused = false,
        icon = null,
        iconClassName = 'text-neutral-400',
        ...props
    },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <div className="relative">
            <textarea
                {...props}
                className={
                    'w-full rounded-lg border border-neutral-300 bg-neutral-50 px-2 py-1 text-neutral-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all ' +
                    (icon ? 'pr-8 ' : '') +
                    className
                }
                ref={localRef}
            />
            {icon && (
                <div className="absolute top-2 right-0 flex items-start pr-3">
                    <i className={`fa-solid ${icon} ${iconClassName}`} aria-hidden="true"></i>
                </div>
            )}
        </div>
    );
});
