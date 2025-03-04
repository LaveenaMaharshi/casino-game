import React, { useState } from 'react';
import styles from './profile-tabs.module.css';

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = ['Overview', 'Posts', 'Settings'];

  return (
    <div>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="tab-content">
        <h2>{activeTab} Section</h2>
        <p>Content for the {activeTab} section goes here.</p>
      </div>
    </div>
  );
};

export default ProfileTabs;
