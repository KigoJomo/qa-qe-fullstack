"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("./events");
// Function to display events in the DOM
const displayEvents = (events) => {
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
const fetchAndDisplayEvents = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield (0, events_1.fetchEvents)();
        displayEvents(events);
    }
    catch (error) {
        console.error('Failed to fetch and display events:', error);
        const eventsContainer = document.getElementById('events-container');
        if (eventsContainer) {
            eventsContainer.innerHTML = '<p>Failed to load events. Please try again later.</p>';
        }
    }
});
// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', fetchAndDisplayEvents);
