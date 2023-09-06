'use client';

import { Button, Calendar } from '..';

const ListingReservation = ({
    price,
    totalPrice,
    onChangeDate,
    dateRange,
    onSubmit,
    disabled,
    disabledDates,
}) => {
    return (
        <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
            <div className="flex items-center gap-1 p-4">
                <div className="text-2xl font-semibold">$ {price} / </div>
                <div className="font-light text-neutral-600">night</div>
            </div>
            <hr />

            <Calendar
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value) => onChangeDate(value.selection)}
            />
            <hr />

            <div className="p-4 flex items-center justify-between font-semibold text-lg">
                <div>Total</div>
                <div>$ {totalPrice}</div>
            </div>

            <div className="p-4">
                <Button
                    disabled={disabled}
                    label="Reserve"
                    handleClick={onSubmit}
                />
            </div>
        </div>
    );
};

export default ListingReservation;
