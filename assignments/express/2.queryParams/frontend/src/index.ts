import { fetchEvents } from './events';

// Function to display events in the DOM
const displayEvents = (events: any[]) => {
  const eventsContainer = document.getElementById('events-container');
  if (!eventsContainer) {
    console.error('Events container not found');
    return;
  }

  eventsContainer.innerHTML = '';

  if (events.length === 0) {
    eventsContainer.innerHTML = '<p>No events found</p>';
    return;
  }

  const eventsList = document.createElement('ul');
  
  events.forEach(event => {
    const eventItem = document.createElement('li');
    eventItem.textContent = `${event.name} - ${event.date}`;
    eventsList.appendChild(eventItem);
  });

  eventsContainer.appendChild(eventsList);
};

// Function to fetch and display events
const fetchAndDisplayEvents = async () => {
  try {
    const events = await fetchEvents();
    displayEvents(events);
  } catch (error) {
    console.error('Failed to fetch and display events:', error);
    const eventsContainer = document.getElementById('events-container');
    if (eventsContainer) {
      eventsContainer.innerHTML = '<p>Failed to load events. Please try again later.</p>';
    }
  }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', fetchAndDisplayEvents);