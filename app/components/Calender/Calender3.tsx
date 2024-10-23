import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const NEXT_MONTH = new Date();
NEXT_MONTH.setMonth(NEXT_MONTH.getMonth()+1);

interface CalenderProps {
	onDateChange: (dateRange: { startDate: Date; endDate: Date }) => void;
}

const Calender: React.FC<CalenderProps> = ({ onDateChange }) => {
	const [value, setValue] = useState<any>({
		startDate: new Date(),
		endDate: NEXT_MONTH,
	});

	const handleChange = (newValue: any) => {
		setValue(newValue);

		onDateChange({
			startDate: newValue.startDate,
			endDate: newValue.endDate,
		});
	};

	return (
		<Datepicker
			containerClassName="relative mt-8 ml-8"
			inputClassName={"w-full h-[50px] rounded-md border border-gray-300 p-4"}
			toggleClassName={
				"absolute right-2 top-[6.5px] bg-white border border-gray-300 rounded-md p-2"
			}
			displayFormat="DD/MM/YYYY"
			separator="to"
			placeholder="<Start Date> to <End Date>"
			minDate={new Date()}
			primaryColor={"rose"}
			value={value}
			onChange={handleChange}
			showShortcuts={true}
		/>
	);
};

export default Calender;
