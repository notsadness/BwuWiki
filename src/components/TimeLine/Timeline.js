// Timeline.js
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import timelineData from '@site/docs/Roadmap/timelineData.json';

const Timeline = () => {
  const [categoryFilter, setCategoryFilter] = useState('Website');
  const [statusFilter, setStatusFilter] = useState('In-progress');
  const [minimized, setMinimized] = useState({});

  const categories = [...new Set(timelineData.map((event) => event.category))];
  const statuses = [...new Set(timelineData.map((event) => event.status))];

  const getStatusColor = (status) => {
    switch (status) {
      case 'In-progress':
        return '#8e44ad'; // Purple for 'in progress'
      case 'Idea Building':
        return '#ff3333'; // Red for 'idea building'
      case 'Completed':
        return '#33cc33'; // Green for 'completed'
      default:
        return '#ffffff'; // Default color (white) or another color of your choice
    }
  };

  const toggleMinimized = (eventId) => {
    setMinimized((prevState) => ({
      ...prevState,
      [eventId]: !prevState[eventId],
    }));
  };

  return (
    <div className="timeline-container">
      {/* Filter buttons */}
      <div className="timeline-filter-buttons">
        <div className="timeline-filter">
          <span>Category:</span>
          <select
            className="styled-dropdown"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ color: '#000', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
          >
            <option value="all" style={{ color: '#000', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>All</option>
            {categories.map((category) => (
              <option key={category} value={category} style={{ color: '#000', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="timeline-filter">
          <span>Status:</span>
          <select
            className="styled-dropdown"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ color: '#000', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
          >
            <option value="all" style={{ color: '#000', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>All</option>
            {statuses.map((status) => (
              <option key={status} value={status} style={{ color: '#000', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Timeline */}
      <div className="timeline-vertical-timeline">
        {timelineData
          .filter(
            (event) =>
              (categoryFilter === 'all' || event.category === categoryFilter) &&
              (statusFilter === 'all' || event.status === statusFilter)
          )
          .map((event) => (
            <div key={event.id} className="timeline-vertical-timeline-item">
              <Paper
                sx={{
                  borderRadius: 6,
                  borderTopRightRadius: 36,
                  borderBottomRightRadius: 36,
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                  padding: "8px",
                  backgroundColor: getStatusColor(event.status),
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                  marginBottom: "16px",
                  color: "#fff",
                  h3: {
                    color: "#000",
                    margin: 0,
                    textAlign: 'center',
                    marginBottom: "8px",
                    width: "100%",
                    display: 'block',
                  },
                  p: {
                    color: "#000",
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                    margin: 0,
                  },
                  position: "relative",
                }}
                variant="outlined"
              >
                <div className="timeline-content-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3>{event.title}<p>{event.status}</p></h3>
                  <div>
                    <IconButton onClick={() => toggleMinimized(event.id)}>
                      <ArrowDropDownIcon style={{ color: '#000' }} />
                    </IconButton>
                  </div>
                </div>
                {!minimized[event.id] && <ReactMarkdown className="custom-markdown">{event.description}</ReactMarkdown>}
              </Paper>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Timeline;