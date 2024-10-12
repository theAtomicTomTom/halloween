import { TabOptions } from '@/constants/TabOptions';

interface TabsProps {
    selectedTab: TabOptions;
    setSelectedTab: (tabOption: TabOptions) => void;
}

export default function Tabs({ selectedTab, setSelectedTab }: TabsProps) {
    return (
        <div className='tab-bar'>
            <button className={ getClass(selectedTab, TabOptions.RSVP) }
                onClick={ () => setSelectedTab(TabOptions.RSVP) }
            >
                RSVP
            </button>
            <button className={ getClass(selectedTab, TabOptions.POTLUCK) }
                onClick={ () => setSelectedTab(TabOptions.POTLUCK) }
            >
                Potluck
            </button>
            <button className={ getClass(selectedTab, TabOptions.CHARACTER_SELECT) }
                onClick={ () => setSelectedTab(TabOptions.CHARACTER_SELECT) }
            >
                Character Select
            </button>
        </div>
    );
}

function getClass(selectedTab: TabOptions, expectedTab: TabOptions) {
    let className = 'tab-button';
    if (selectedTab === expectedTab)
        className += ' tab-selected';
    return className;
}