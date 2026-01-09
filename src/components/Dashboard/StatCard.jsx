import React from 'react';

const StatCard = ({ label, value, icon: Icon, color = "#ED1B24" }) => {
    return (
        <div className="stat-card">
            <div>
                <span className="stat-label">{label}</span>
                <p className="stat-value">{value}</p>
            </div>
            {Icon && <Icon size={32} color={color} />}
            <style>{`
        .stat-card {
          background-color: white;
          padding: 24px;
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
          border: 1px solid #E2E8F0;
        }
        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .stat-label {
          color: #718096;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 4px;
          display: block;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .stat-value {
          font-size: 24px;
          font-weight: 800;
          color: #1A202C;
          margin: 0;
        }
      `}</style>
        </div>
    );
};

export default StatCard;
