import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    country: '',
    cities: '',
    days: 0,
    startDate: '',
    flexible: 'No',
    people: 0,
    adults: 0,
    children: 0,
    budget: '',
    responseType: 'Basic',
    activities: ''
  });
  const navigate = useNavigate();

  // Fetch trips on load
  useEffect(() => {
    const fetchTrips = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signin');
        return;
      }

      try {
        console.log("Fetching trips from:", `${API_BASE_URL}/api/trips`);

        const res = await fetch(`${API_BASE_URL}/api/trips`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.msg || 'Failed to fetch trips');
          return;
        }

        setTrips(data);
      } catch (err) {
        alert('Error fetching trips');
      }
    };

    fetchTrips();
  }, [navigate]);

  // Handle form changes
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit new trip request
  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      console.log("Submitting trip to:", `${API_BASE_URL}/api/trips`);

      const res = await fetch(`${API_BASE_URL}/api/trips`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || 'Failed to create trip');
        return;
      }

      setTrips([...trips, data]);
      setShowModal(false);
      setFormData({
        country: '',
        cities: '',
        days: 0,
        startDate: '',
        flexible: 'No',
        people: 0,
        adults: 0,
        children: 0,
        budget: '',
        responseType: 'Basic',
        activities: ''
      });
    } catch (err) {
      alert('Error creating trip');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  return (
    <div className="trips-container">
      <div className="trips-header">
        <h2>My Trips</h2>
        <div>
          <button onClick={() => setShowModal(true)}>New Trip Plan Request</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Request Date</th>
            <th>Trip Details</th>
            <th>Planning Status</th>
            <th>Plan Delivery Date</th>
            <th>Payment Made On</th>
            <th>Payment Amount</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip, i) => (
            <tr key={i}>
              <td>{new Date(trip.requestDate).toLocaleDateString()}</td>
              <td>
                Country: {trip.country}, Cities: {trip.cities}, Days: {trip.days}
              </td>
              <td>{trip.planningStatus}</td>
              <td>{trip.planDeliveryDate ? new Date(trip.planDeliveryDate).toLocaleDateString() : '-'}</td>
              <td>{trip.paymentMadeOn ? new Date(trip.paymentMadeOn).toLocaleDateString() : '-'}</td>
              <td>{trip.paymentAmount || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>New Trip Plan Request</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Country to Travel:
                <input type="text" name="country" value={formData.country} onChange={handleChange} required />
              </label>
              <label>
                City(s) to Travel:
                <input type="text" name="cities" value={formData.cities} onChange={handleChange} required />
              </label>
              <label>
                No of days:
                <input type="number" name="days" value={formData.days} onChange={handleChange} required />
              </label>
              <label>
                Start Date:
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
              </label>
              <label>
                Flexible with Date:
                <select name="flexible" value={formData.flexible} onChange={handleChange}>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </label>
              <label>
                No of People:
                <input type="number" name="people" value={formData.people} onChange={handleChange} required />
              </label>
              <label>
                Adults:
                <input type="number" name="adults" value={formData.adults} onChange={handleChange} required />
              </label>
              <label>
                Children:
                <input type="number" name="children" value={formData.children} onChange={handleChange} />
              </label>
              <label>
                Budget approx per person:
                <input type="text" name="budget" value={formData.budget} onChange={handleChange} required />
              </label>
              <label>
                Response Type:
                <select name="responseType" value={formData.responseType} onChange={handleChange}>
                  <option value="Basic">Basic</option>
                  <option value="Intermediate detailed">Intermediate detailed</option>
                  <option value="Full Detailed">Full Detailed</option>
                </select>
              </label>
              <label>
                Preferences on Activities:
                <input type="text" name="activities" value={formData.activities} onChange={handleChange} />
              </label>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trips;
