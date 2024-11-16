import { useEffect, useState } from 'react';
import styles from './singleApod.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/Context';

export default function SingleApod() {
  const { date } = useParams();
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true); // Handle loading state
  const { isAuth, verifyUser } = useAuth();
  const navigate = useNavigate();

  const fetchApod = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/data/apod/${date}`);
      setApod(response.data);
    } catch (error) {
      console.error("Error fetching APOD:", error);
    }
  };

  useEffect(() => {
    const checkAuthAndFetchApod = async () => {
      await verifyUser(); // Verify user
      setLoading(false); // Update loading state after verification
    };

    checkAuthAndFetchApod();
  }, []);

  useEffect(() => {
    if (!loading && !isAuth) {
      // Redirect to login only after loading completes and user is not authenticated
      navigate("/login");
    } else if (!loading) {
      fetchApod(); // Fetch APOD only if user is authenticated
    }
  }, [loading, isAuth]);

  if (loading || !apod) return <div className={styles.loader}>Loading....</div>;

  return (
    <div className={`${styles.container} container-fluid p-0 d-flex flex-column`}>
      <h1 className='text-center mb-2 fs-1'>{apod.title}</h1>
      <p className={`${styles.date} text-center text-secondary`}>Date : {apod.date}</p>
      <div className={`${styles.imgContainer}`}>
        {apod.media_type === "image" ? (
          <img src={apod.url} alt={apod.title} className={styles.img} />
        ) : (
          <iframe
            src={apod.url}
            title={apod.title}
            width="100%"
            height="100%"
            className={styles.vid}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        )}
      </div>
      <div className="text-center p-2">
        <p className='text-center px-4'>{apod.explanation}</p>
      </div>
    </div>
  );
}



// import { useEffect, useState } from 'react';
// import styles from './singleApod.module.css';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';

// export default function SignleApod() {
//   const { date } = useParams();
//   const [apod, setApod] = useState();
//   const navigate = useNavigate();
    

//   useEffect(
//     ()=> {
//       let response = axios.get(`http://localhost:3000/api/data/apod/${date}`).then(
//         response => {
//           setApod(response.data);
//           if(!isLoggedIn){
//             navigate("/login");
//           }
//           verifyUser();
//           console.log(auth);
//         }
//       )
//     },[])

//     if(!apod) return <div className={styles.loader}>Loading....</div>

//   return (
//     <div className={`${styles.container} container-fluid p-0 d-flex flex-column`}>
//       <h1 className='text-center mb-2 fs-1'>{apod.title}</h1>
//       <p className={`${styles.date} text-center text-secondary`}>Date : {apod.date}</p>
//       <div className={`${styles.imgContainer}`}>
//        {apod.media_type == "image" ? <img src={apod.url} alt={apod.title} className={styles.img}/> : <iframe
//                             src={apod.url}
//                             title={apod.title}
//                             width="100%"
//                             height="100%"
//                             className={styles.vid}
//                             frameBorder="0"
//                             allow="autoplay; encrypted-media" 
//                             allowFullScreen
//                         ></iframe>}
//       </div>
//       <div className="text-center p-2">
//         <p className='text-center px-4'>{apod.explanation}</p>
//       </div>
//     </div>
//   )
// }
