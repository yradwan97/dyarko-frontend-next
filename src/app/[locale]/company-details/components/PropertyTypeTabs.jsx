import React from 'react'
import { Tab } from '@headlessui/react';
import { useTranslations } from 'next-intl';

const PropertyTypeTabs = ({ activeTab, setActiveTab }) => {
    const t = useTranslations("General.PaymentMethods")
    return (
        <Tab.Group>
            <Tab.List className="mt-8 flex w-1/5 justify-between md:mt-0">
                {['all', 'rent', 'installment'].map((tab) => (
                    <Tab
                        key={tab}
                        className={
                            `text-md transition-ease border-b-3 capitalize pb-3 outline-0 duration-300
                            ${activeTab === tab.toLowerCase()
                                ? ' border-main-600 font-bold text-main-600'
                                : 'border-white font-regular text-black'}`
                        }
                        onClick={() => setActiveTab(tab.toLowerCase())}
                    >
                        {t(tab)}
                    </Tab>
                ))}
            </Tab.List>
        </Tab.Group>
    )
}

export default PropertyTypeTabs