'use client'

import { useState } from "react";
import CharacterSelectTable from "@/components/CharacterSelectTable";
import PotluckTable from '@/components/PotluckTable';
import Table from "@/components/Table";
import Tabs from "@/components/Tabs";
import { TabOptions } from "@/constants/TabOptions";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState(TabOptions.POTLUCK);

  return (
  <div>
    <div className="title">Halloween Murder Mystery &lsquo;24</div>
    <Tabs selectedTab={ selectedTab } setSelectedTab={ setSelectedTab } />
    { selectedTab === TabOptions.RSVP && <Table /> }
    { selectedTab === TabOptions.POTLUCK && <PotluckTable /> }
    { selectedTab === TabOptions.CHARACTER_SELECT && <CharacterSelectTable /> }
  </div>
  );
}
