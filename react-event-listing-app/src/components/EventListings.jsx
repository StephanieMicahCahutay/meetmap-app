import { useState, useEffect } from 'react';
import EventListing from './EventListing';
import Spinner from './Spinner';

const EventListings = ({ isHome = false }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = isHome ? '/api/events?_limit=3' : '/api/events';
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.log('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

    return (
        <section className='bg-[#FAEBD7] px-4 py-10'>
            <div className='container-xl lg:container m-auto'>
                <h2 className='text-3xl font-bold text-[#EA7E5D] mb-6 text-center'>
                    {isHome ? 'Recent events' : 'Browse events'}
                </h2>

                {loading ? (
                    <Spinner loading={loading} />
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {events.map((event) => (
                            <EventListing key={event.id} event={event} />
                        ))}
                    </div>
                )}
            </div>
        </section>

    );
};

export default EventListings
