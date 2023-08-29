'use client';

import { useCountries } from '@/hooks';
import Select from 'react-select';

const CountrySelect = ({ value, onChange }) => {
    const { getAll } = useCountries();

    return (
        <div>
            <Select
                placeholder="Anywhere"
                isClearable
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value)}
                formatOptionLabel={(option) => (
                    <>
                        <div className="flex items-center gap-3">
                            <div>{option.flag}</div>
                            <div>
                                {option.label},{' '}
                                <span className="text-neutral-500 ml-1">
                                    {option.region}
                                </span>
                            </div>
                        </div>
                    </>
                )}
                classNames={{
                    control: () => 'p-3 border-2',
                    input: () => 'text-lg',
                    option: () => 'text-lg',
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: '#ffe4e6',
                    },
                })}
            />
        </div>
    );
};

export default CountrySelect;
