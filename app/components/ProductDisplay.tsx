"use client";

import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import SingleRecord from "./SingleRecord";
import { StoreCreationProps } from "@/types/store";
import DropDownList from "./DropDownList";

interface ProductDisplayProps {
	store: StoreCreationProps | null;
	productData: any[];
}

const fetchDesignItems = async () => {
	const response = await fetch("/api/get_design_items", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const design_items = await response.json();
	console.log("Design Items", design_items.designItems);
	return design_items.designItems;
};

const ProductDisplay: React.FC<ProductDisplayProps> = ({
	store,
	productData,
}) => {
	const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

	const [imageUrl, setImageUrl] = useState<string>(
		"https://via.placeholder.com/150"
	);

	const [designId, setDesignId] = useState<string>("0");

	const [designItems, setDesignItems] = useState<any[]>([]);

	const setCurrentDesign = ({
		image,
		designId,
	}: {
		image: string;
		designId: string;
	}) => {
		setImageUrl(`${image}`);
		setDesignId(`${designId}`);
	};

	useEffect(() => {
		fetchDesignItems().then((data) => {
			setDesignItems(data);
		});
	}, []);

	useEffect(() => {
		console.log("Fetched design items:", designItems); // Logs only when designItems is updated
	}, [designItems]);

	return (
		<div className="w-full min-h-screen bg-[#F6F6F6] p-4">
			<div className="bg-white border border-gray-300 p-4 rounded-lg shadow-md flex items-center space-x-4 text-black">
				<div className="flex items-center space-x-2">
					<input
						type="text"
						className="border border-gray-300 rounded-md p-2"
						value={`${store?.store_code} | ${store?.store_name} | Required on ${store?.end_date}`}
						readOnly
					/>
					<button className="p-2 border border-gray-400 rounded-md hover:bg-gray-200">
						{/* Icon */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</button>
				</div>

				<div className="flex items-center space-x-2">
					<div className="p-2 border border-gray-300 rounded-md flex items-center space-x-2">
						<span className="text-black">Design</span>
						<div className="bg-gray-200 rounded-full w-10 h-10 overflow-hidden flex items-center justify-center">
							<img
								src={`${imageUrl}`}
								alt="Profile"
								className="object-cover w-full h-full"
							/>
						</div>
					</div>
					<DropDownList
						designItems={designItems}
						setCurrentDesign={setCurrentDesign}
					/>
				</div>
			</div>

			<div className="flex flex-row justify-between">
				<div className="mt-4 flex space-x-4 text-black">
					{["Adult", "Men", "Women", "Youth", "Accessories"].map((category) => (
						<button
							key={category}
							className="py-2 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
						>
							{category}
						</button>
					))}

					<button
						onClick={() => setIsFilterOpen(!isFilterOpen)}
						className="py-2 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100 flex items-center"
					>
						<FaFilter className="mr-2" />
						Filter
					</button>
				</div>
				<button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md align-end hover:bg-blue-600">
					Generate PL
				</button>
			</div>

			{/* Product Section */}
			<div className="mt-4 bg-gray-200 w-full h-[400px] grid grid-cols-1 gap-3 overflow-y-auto items-center justify-center">
				{designId != "0" &&
					productData.map((item) => (
						<SingleRecord
							key={item["Product ID"]}
							item={item}
							store_code={`${store?.store_code}`}
							design_id={designId ? designId : ""}
						/>
					))}
				{designId == "0" && (
					<div className="flex items-center justify-center h-full">
						<div className="text-red-500 text-lg border px-3 py-1 border-red-500 rounded">
							Please Select a Design
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductDisplay;
