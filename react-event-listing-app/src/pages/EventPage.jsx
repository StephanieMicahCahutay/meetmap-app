import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const EventPage = ({ deleteEvent }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const event = useLoaderData();

    const onDeleteClick = async (eventId) => {
        const confirm = window.confirm(
            'Are you sure you want to delete this listing?'
        );

        if (!confirm) return;

        try {
            await deleteEvent(eventId);
            toast.success('Event deleted successfully');
            navigate('/events');
        } catch (error) {
            toast.error('Failed to delete event. Please try again.');
            console.error("Error deleting event:", error);
        }
    };

    return (
        <>
            <section>
                <div className='container m-auto py-6 px-6'>
                    <Link
                        to='/events'
                        className='text-[#EA7E5D] hover:text-[#FF6347]  flex items-center'
                    >
                        <FaArrowLeft className='mr-2' /> Back to Event Listings
                    </Link>
                </div>
            </section>

            <section className='bg-[#FAEBD7]'>
                <div className='container m-auto py-10 px-6'>
                    <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
                        <main>
                            <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
                                <div className='text-gray-500 mb-4'>{event.type}</div>
                                <h1 className='text-3xl font-bold mb-4'>{event.title}</h1>
                                <div className='text-gray-500 mb-4 flex align-middle justify-center md:justify-start'>
                                    <FaMapMarker className='text-orange-700 mr-1' />
                                    <p className='text-orange-700'>{event.location}</p>
                                </div>
                            </div>

                            <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                                <h3 className='text-[#FF6347]  text-lg font-bold mb-6'>
                                    Event Description
                                </h3>

                                <p className='mb-4'>{event.description}</p>

                                <h3 className='text-[#FF6347]  text-lg font-bold mb-2'>
                                    Date
                                </h3>

                                <p className='mb-4'>{event.date} </p>
                                
                                <h3 className='text-[#FF6347]  text-lg font-bold mb-2'>
                                    Ticket Price
                                </h3>

                                <p className='mb-4'>PHP {event.ticketPrice} </p>

                                <h3 className='text-[#FF6347]  text-lg font-bold mb-2'>
                                    Capacity
                                </h3>

                                <p className='mb-4'>{event.capacity} people </p>
                            </div>
                        </main>

                        <aside>
                            <div className='bg-white p-6 rounded-lg shadow-md'>
                                <h3 className='text-xl font-bold mb-6'>Organizer Info</h3>

                                <h2 className='text-2xl'>{event.organizer.name}</h2>

                                <p className='my-2'>{event.organizer.description}</p>

                                <hr className='my-4' />

                                <h3 className='text-xl'>Contact Email:</h3>

                                <p className='my-2 bg-[#FAEBD7] p-2 font-bold'>
                                    {event.organizer.contactEmail}
                                </p>

                                <h3 className='text-xl'>Contact Phone:</h3>

                                <p className='my-2 bg-[#FAEBD7] p-2 font-bold'>
                                    {' '}
                                    {event.organizer.contactPhone}
                                </p>
                            </div>

                            <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                                <h3 className='text-xl font-bold mb-6'>Manage Event</h3>
                                <Link
                                    to={`/edit-event/${event.id}`}
                                    className='bg-[#EA7E5D] hover:bg-[#EA7E5D] text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                                >
                                    Update Event
                                </Link>
                                <button
                                    onClick={() => onDeleteClick(event.id)}
                                    className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                                >
                                    Delete Event
                                </button>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    );
};


const eventLoader = async ({ params }) => {
    try {
        const response = await fetch(`https://my-json-server-vercel-eight.vercel.app/events/${params.id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error loading event:", error);
        throw error;
    }
};

export { EventPage as default, eventLoader };