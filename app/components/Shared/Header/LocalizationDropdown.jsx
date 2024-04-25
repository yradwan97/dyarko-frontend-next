import { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import * as FiIcons from "react-icons/fi";
import kuwaitSvg from "@/public/assets/kuwait.svg";
import USSvg from "@/public/assets/us.svg";
import Image from "next/image"
const LocalizationDropdown = ({ selectedLang, onSelect }) => {
    const countries = [
        { id: 1, value: "en", name: "English", icon: USSvg },
        { id: 2, value: "ar", name: "العربية", icon: kuwaitSvg },
    ];

    const [currentActiveImage, setCurrentActiveImage] = useState(selectedLang === "en" ? USSvg : kuwaitSvg);
    useEffect(() => {
        setCurrentActiveImage(selectedLang === "en" ? USSvg : kuwaitSvg);
    }, [selectedLang]);

    return (
        <Menu as="div" className="relative">
            <Menu.Button
                as="button"
                className="flex items-center bg-none border-2 p-2 border-gray-200 text-gray-400 h-12 w-full rounded-lg focus:outline-none"
            >
                <Image
                    src={currentActiveImage}
                    alt="country"
                    width={32}
                    height={32}
                />
                <FiIcons.FiChevronDown size={14} style={{ marginInline: 10 }} />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {countries.map((country) => (
                    <Menu.Item key={country.id}>
                        {({ active }) => (
                            <button
                                className={`${active ? 'bg-gray-100' : ''
                                    } group flex rounded-md items-center w-full p-2 text-sm text-gray-900`}
                                onClick={() => {
                                    setCurrentActiveImage(country.icon);
                                    onSelect(country.value);
                                }}
                            >
                                <Image
                                    src={country.icon}
                                    alt="country"
                                    width={24}
                                    height={24}
                                />
                                <span className="ml-2">{country.name}</span>
                            </button>
                        )}
                    </Menu.Item>
                ))}
            </Menu.Items>
        </Menu>
    );
};

export default LocalizationDropdown;
