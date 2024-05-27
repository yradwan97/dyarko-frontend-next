import { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import * as FiIcons from "react-icons/fi";
import kuwaitSvg from "@/public/assets/kuwait.svg";
import USSvg from "@/public/assets/us.svg";
import Image from "next/image"
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import ChevronDown from "../../UI/icons/ChevronDown";
import { Link } from "@/src/navigation";



const LocalizationDropdown = () => {
    const locale = useLocale();
    const router = useRouter();
    const location = window.location.pathname

    const cleanPathname = () => {
        const prefixes = ['/en', '/ar'];
        const pathname = window.location.pathname

        for (let prefix of prefixes) {
            if (pathname === prefix) {
                return '/';
            } else if (pathname.startsWith(prefix + '/')) {
                return pathname.slice(prefix.length);
            }
        }

        return pathname;
    }

    const handleLocaleChange = (newLocale) => {
        if (newLocale === locale) return
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
        router.refresh();
    };
    const countries = [
        { id: 1, value: "en", name: "English", icon: USSvg },
        { id: 2, value: "ar", name: "العربية", icon: kuwaitSvg },
    ];

    const [currentActiveImage, setCurrentActiveImage] = useState(locale === "en" ? USSvg : kuwaitSvg);
    useEffect(() => {
        setCurrentActiveImage(locale === "en" ? USSvg : kuwaitSvg);
    }, [locale]);

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
                <ChevronDown className="w-2.5 h-2.5 ml-2 stroke-black" />
            </Menu.Button>
            <Menu.Items className="absolute -right-22 mt-2 w-40 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {countries.map((country) => (
                    <Menu.Item key={country.id}>
                        {({ active }) => (
                            <Link
                                className={`${active ? 'bg-gray-100' : ''
                                    } group flex rounded-md items-center w-full p-2 text-sm text-gray-900`}
                                href={cleanPathname()}
                                locale={country.value}
                            >
                                <Image
                                    src={country.icon}
                                    alt="country"
                                    width={24}
                                    height={24}
                                />
                                <span className="ml-2">{country.name}</span>
                            </Link>
                        )}
                    </Menu.Item>
                ))}
            </Menu.Items>
        </Menu>
    );
};

export default LocalizationDropdown;
