import React from 'react'
import Typography from '../../components/Shared/Typography'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SingleTent from "./SingleTent"
import { useTranslations } from 'next-intl';

const TentInformation = ({ tents }) => {
    const t = useTranslations("Properties.Details.Tents")
    const [value, setValue] = React.useState('0');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='pt-12 pb-8 border-b border-gray-200'>
            <HeadTitle text={t("title")} />
            <div className='flex space-x-20'>
                <div className='flex-1'>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    {tents?.map((tent, index) => (
                                        <Tab key={index} label={`${t("tent")} ${index + 1}`} value={index.toString()} />
                                    ))}
                                </TabList>
                            </Box>
                            {tents?.map((tent, index) => (
                                <TabPanel key={index} value={index.toString()}>
                                    <SingleTent tent={tent} />
                                </TabPanel>
                            ))}
                        </TabContext>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default TentInformation