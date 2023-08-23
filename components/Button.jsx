'use client';

const Button = ({
    label,
    handleClick,
    disabled,
    outline,
    small,
    icon: Icon,
}) => {
    return (
        <button
            onClick={handleClick}
            disabled={disabled}
            className={`flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full ${
                outline
                    ? 'bg-white border-black text-black'
                    : 'bg-rose-500 border-rose-500 text-white'
            } ${
                small
                    ? 'py-1 text-sm font-light border-[1px]'
                    : 'py-3 text-base font-semibold border-2'
            }`}
        >
            {label}
            {Icon && <Icon size={small ? 16 : 20} />}
        </button>
    );
};

export default Button;
