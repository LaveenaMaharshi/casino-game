import React from 'react';
import styles from './user-stats.module.css';

const UserStats = () => {
  const stats = [
    { label: 'Posts', value: 34 },
    { label: 'Followers', value: 1200 },
    { label: 'Following', value: 180 },
  ];

  return (
    <div className={styles['stats-container']}>
      {stats.map((stat) => (
        <div key={stat.label} className={styles['stat-item']}>
          <div className={styles['stat-value']}>{stat.value}</div>
          <div className={styles['stat-label']}>{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default UserStats;
