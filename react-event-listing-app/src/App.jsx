import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';;
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import EventPage, { eventLoader } from './pages/EventPage';
import NotFoundPage from './pages/NotFoundPage';
import AddEventPage from './pages/AddEventPage';
import EditEventPage from './pages/EditEventPage';

const App = () => {
  const addEvent = async (newEvent) => {
    const res = await fetch('https://my-json-server-vercel-eight.vercel.app/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    });
    return;
  };

  // Delete Event
  const deleteEvent = async (id) => {
    try {
      const res = await fetch(`https://my-json-server-vercel-eight.vercel.app/events/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  };
  


  // Update Event
  const updateEvent = async (updatedEvent) => {
    try {
        const res = await fetch(`https://my-json-server-vercel-eight.vercel.app/events/${updatedEvent.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedEvent),
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error("Error updating event:", error);
        throw error;
    }
};

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='events' element={<EventsPage />} />
        <Route path='add-event' element={<AddEventPage addEventSubmit={addEvent} />} />
        <Route
          path='edit-event/:id'
          element={<EditEventPage updateEventSubmit={updateEvent} />}
          loader={eventLoader}
        />
        <Route
          path='events/:id'
          element={<EventPage deleteEvent={deleteEvent} />}
          loader={eventLoader}
        />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
