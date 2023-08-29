'use client';

const CategoryInput = ({ icon: Icon, label, selected, onClick }) => {
    return (
        <div
            onClick={() => onClick(label)}
            className={`rounded-xl border-2 p-4 flex items-center gap-3 hover:border-black transition cursor-pointer ${
                selected ? 'border-black' : 'border-neutral-200'
            }`}
        >
            <Icon size={26} />
            <div className="font-semibold">{label}</div>
        </div>
    );
};

export default CategoryInput;
