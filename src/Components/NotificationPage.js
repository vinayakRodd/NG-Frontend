


// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import * as toxicity from '@tensorflow-models/toxicity'; // Import TensorFlow.js toxicity model
// import '@tensorflow/tfjs'; // Import TensorFlow.js

// // Initialize socket outside the component
// const socket = io('http://localhost:9000');

// const NotificationPage = () => {
//   const [notification, setNotification] = useState('');
//   const [notifications, setNotifications] = useState([]);
//   const [isSending, setIsSending] = useState(false); // Track sending state to debounce button clicks
//   const [hasMore, setHasMore] = useState(true); // Flag for checking if there are more notifications
//   const [page, setPage] = useState(1); // For pagination
//   const [model, setModel] = useState(null); // State to hold the toxicity model

//   // Load the toxicity model on component mount
//   useEffect(() => {
//     const loadModel = async () => {
//       const toxicityModel = await toxicity.load(0.9); // Load the model with 90% threshold
//       setModel(toxicityModel); // Set the model in state
//     };

//     loadModel();
//   }, []);

//   // Fetch messages only once when the component mounts
//   useEffect(() => {
//     axios.post("http://localhost:9000/api/getMessages", { page: page })
//       .then(response => {
//         if (response.data.length) {
//           setNotifications(response.data);
//         } else {
//           console.error('Expected an array, but got:', response.data);
//           setNotifications([]); // Fallback to empty array
//         }
//       })
//       .catch(err => {
//         console.log("Error occurred", err);
//         setNotifications([]); // Fallback to empty array
//       });
//   }, [page]); // Load new notifications when the page state changes

//   // Handle incoming socket notifications
//   useEffect(() => {
//     socket.on('receive_notification', (newNotification) => {
//       // Check if the notification already exists in the list
//       setNotifications((prev) => {
//         if (!prev.some(noti => noti.message === newNotification.message)) {
//           return [...prev, newNotification];
//         }
//         return prev;
//       });
//     });

//     return () => {
//       socket.off('receive_notification');
//     };
//   }, []);

//   const checkToxicity = async (text) => {
//     if (!model) return false; // If model is not loaded, return false

//     const predictions = await model.classify(text); // Classify the text
//     const isToxic = predictions.some(prediction => prediction.results[0].match); // Check if any prediction is toxic
//     return isToxic;
//   };

//   const sendNotification = async () => {
//     if (notification.trim() && !isSending) {
//       // Check if the notification contains toxic words
//       const isToxic = await checkToxicity(notification);
//       if (isToxic) {
//         alert("Your message contains inappropriate language and cannot be sent.");
//         return; // Stop execution if the text is inappropriate
//       }

//       setIsSending(true); // Prevent further clicks while sending

//       // Temporarily append the notification to the UI (with the correct structure)
//       const tempNotification = { message: notification };

//       // Append notification only if it's not already added
//       setNotifications((prev) => {
//         if (!prev.some(noti => noti.message === tempNotification.message)) {
//           return [...prev, tempNotification];
//         }
//         return prev;
//       });

//       // Send notification to the server via Socket.IO
//       socket.emit('send_notification', tempNotification);

//       // Save the notification to the database via Axios
//       try {
//         const myData = { messages: notification };
//         const response = await axios.post("http://localhost:9000/api/messages", myData);

//         if (response.data.message) {
//           alert("Notification Sent");
//           window.scroll({
//             top: document.documentElement.scrollHeight,
//             behavior: 'smooth'
//           });
//         } else {
//           alert("Failed to send the notification");
//         }
//       } catch (error) {
//         console.error('Error saving notification:', error);
//         alert("Error sending notification");
//       }

//       // Clear the input field
//       setNotification('');
//       setIsSending(false); // Re-enable button after the request is completed
//     }
//   };

//   const loadMoreNotifications = async () => {
//     // Increment the page count for the next batch of notifications
//     setPage((prevPage) => prevPage + 1);

//     // Fetch more notifications from the API
//     axios.post("http://localhost:9000/api/getMessages", { page: page + 1 })
//       .then(response => {
//         if (response.data.length > 0) {
//           setNotifications((prev) => [...prev, ...response.data]);
//         } else {
//           setHasMore(false); // No more notifications to load
//         }
//       })
//       .catch((err) => {
//         console.log("Error occurred while loading more notifications:", err);
//       });
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
//       <h1 className="text-3xl font-bold text-blue-600 my-4">Notification Page</h1>
//       <div className="flex space-x-2 w-full max-w-lg">
//         <input
//           type="text"
//           value={notification}
//           onChange={(e) => setNotification(e.target.value)}
//           placeholder="Enter your notification"
//           className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           onClick={sendNotification}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//           disabled={isSending} // Disable button while sending
//         >
//           Add
//         </button>
//       </div>

//       <InfiniteScroll
//         dataLength={notifications.length} // Current length of the notifications
//         next={loadMoreNotifications} // Function to fetch more notifications
//         hasMore={hasMore} // Whether there are more items to load
//         loader={<h4>Loading...</h4>} // Loader when fetching more notifications
//         endMessage={<p>No more notifications</p>} // Message when no more notifications
//         scrollThreshold={0.9} // Trigger loading when reaching 90% of the scroll
//       >
//         <ul className="mt-6 w-full sm:w-[500px] md:w-[600px] lg:w-[700px] xl:w-[800px] max-w-lg bg-white gap-[10px] rounded-lg shadow-lg divide-y divide-gray-200">
//           {notifications.map((noti, index) => (
//             <li
//               key={index}
//               className="p-4 text-gray-800 hover:bg-gray-50 transition"
//             >
//               {noti.message} {/* Access the 'message' field here */}
//             </li>
//           ))}
//         </ul>
//       </InfiniteScroll>
//     </div>
//   );
// };

// export default NotificationPage;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import InfiniteScroll from 'react-infinite-scroll-component';
import * as toxicity from '@tensorflow-models/toxicity'; // Import TensorFlow.js toxicity model
import '@tensorflow/tfjs'; // Import TensorFlow.js

// Initialize socket outside the component
const socket = io('http://localhost:9000');

// Function to normalize text (remove extra spaces, normalize scripts)
const normalizeText = (text) => {
  // Remove extra spaces and normalize Unicode characters
  return text.trim().normalize('NFC'); 
};

const NotificationPage = () => {
  const [notification, setNotification] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [isSending, setIsSending] = useState(false); // Track sending state to debounce button clicks
  const [hasMore, setHasMore] = useState(true); // Flag for checking if there are more notifications
  const [page, setPage] = useState(1); // For pagination
  const [model, setModel] = useState(null); // State to hold the toxicity model

  // Load the toxicity model on component mount
  useEffect(() => {
    const loadModel = async () => {
      const toxicityModel = await toxicity.load(0.9); // Load the model with 90% threshold
      setModel(toxicityModel); // Set the model in state
    };

    loadModel();
  }, []);

  // Fetch messages only once when the component mounts
  useEffect(() => {
    axios.post("http://localhost:9000/api/getMessages", { page: page })
      .then(response => {
        if (response.data.length) {
          setNotifications(response.data);
        } else {
          console.error('Expected an array, but got:', response.data);
          setNotifications([]); // Fallback to empty array
        }
      })
      .catch(err => {
        console.log("Error occurred", err);
        setNotifications([]); // Fallback to empty array
      });
  }, [page]); // Load new notifications when the page state changes

  // Handle incoming socket notifications
  useEffect(() => {
    socket.on('receive_notification', (newNotification) => {
      // Normalize the text to avoid duplicates across languages
      const normalizedNewNotification = normalizeText(newNotification.message);

      setNotifications((prev) => {
        // Normalize the existing notifications for consistent comparison
        if (!prev.some(noti => normalizeText(noti.message) === normalizedNewNotification)) {
          return [...prev, newNotification];
        }
        return prev;
      });
    });

    return () => {
      socket.off('receive_notification');
    };
  }, []);

  const checkToxicity = async (text) => {
    if (!model) return false; // If model is not loaded, return false

    const predictions = await model.classify(text); // Classify the text
    const isToxic = predictions.some(prediction => prediction.results[0].match); // Check if any prediction is toxic
    return isToxic;
  };

  const sendNotification = async () => {
    if (notification.trim() && !isSending) {
      // Normalize the notification text
      const normalizedNotification = normalizeText(notification);

      // Check if the notification contains toxic words
      const isToxic = await checkToxicity(normalizedNotification);
      if (isToxic) {
        alert("Your message contains inappropriate language and cannot be sent.");
        return; // Stop execution if the text is inappropriate
      }

      setIsSending(true); // Prevent further clicks while sending

      // Temporarily append the notification to the UI (with the correct structure)
      const tempNotification = { message: normalizedNotification };

      // Append notification only if it's not already added
      setNotifications((prev) => {
        if (!prev.some(noti => normalizeText(noti.message) === normalizedNotification)) {
          return [...prev, tempNotification];
        }
        return prev;
      });

      // Send notification to the server via Socket.IO
      socket.emit('send_notification', tempNotification);

      // Save the notification to the database via Axios
      try {
        const myData = { messages: notification };
        const response = await axios.post("http://localhost:9000/api/messages", myData);

        if (response.data.message) {
          alert("Notification Sent");
          window.scroll({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
          });
        } else {
          alert("Failed to send the notification");
        }
      } catch (error) {
        console.error('Error saving notification:', error);
        alert("Error sending notification");
      }

      // Clear the input field
      setNotification('');
      setIsSending(false); // Re-enable button after the request is completed
    }
  };

  const loadMoreNotifications = async () => {
    // Increment the page count for the next batch of notifications
    setPage((prevPage) => prevPage + 1);

    // Fetch more notifications from the API
    axios.post("http://localhost:9000/api/getMessages", { page: page + 1 })
      .then(response => {
        if (response.data.length > 0) {
          setNotifications((prev) => [...prev, ...response.data]);
        } else {
          setHasMore(false); // No more notifications to load
        }
      })
      .catch((err) => {
        console.log("Error occurred while loading more notifications:", err);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-blue-600 my-4">Notification Page</h1>
      <div className="flex space-x-2 w-full max-w-lg">
        <input
          type="text"
          value={notification}
          onChange={(e) => setNotification(e.target.value)}
          placeholder="Enter your notification"
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendNotification}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          disabled={isSending} // Disable button while sending
        >
          Add
        </button>
      </div>

      <InfiniteScroll
        dataLength={notifications.length} // Current length of the notifications
        next={loadMoreNotifications} // Function to fetch more notifications
        hasMore={hasMore} // Whether there are more items to load
        loader={<h4>Loading...</h4>} // Loader when fetching more notifications
        endMessage={<p>No more notifications</p>} // Message when no more notifications
        scrollThreshold={0.9} // Trigger loading when reaching 90% of the scroll
      >
        <ul className="mt-6 w-full sm:w-[500px] md:w-[600px] lg:w-[700px] xl:w-[800px] max-w-lg bg-white gap-[10px] rounded-lg shadow-lg divide-y divide-gray-200">
          {notifications.map((noti, index) => (
            <li
              key={index}
              className="p-4 text-gray-800 hover:bg-gray-50 transition"
            >
              {noti.message} {/* Access the 'message' field here */}
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

export default NotificationPage;
