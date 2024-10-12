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
    <div>Listen folks, still workin&rsquo; on this pile o&rsquo; crap. Please continue to use the spreadhseets here as applicable for potluck and email...</div>
    <a href="https://docs.google.com/spreadsheets/d/1gv_6xxpc9XqAzg_5VCoG0D4f9dUh5d_nzw-oDJj2iDU/edit?gid=2128357706#gid=2128357706">google sheets (click me)</a>
    <div>NOTE: if you cannot update from your phone, download the google sheets app or try from a computer.</div>
  </div>
  );
}
