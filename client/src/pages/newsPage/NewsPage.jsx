import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './news.module.css';
import axios from 'axios';
import { useAuth } from '../../context/Context';
import Loader from '../../loader/Loader';

export default function NewsPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true); // Add a loading state
    const { isAuth, verifyUser } = useAuth();
    const navigate = useNavigate();

    const fetchNews = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/data/allNews");
            setData(res.data.results);
        } catch (err) {
            console.error("Error fetching news:", err);
        }
    };

    useEffect(() => {
        const checkAuthAndFetchNews = async () => {
            await verifyUser(); // Verify user
            setLoading(false); // Set loading to false after verification
        };

        checkAuthAndFetchNews();
    }, []);

    useEffect(() => {
        if (!loading && !isAuth) {
            // Redirect to login only after loading completes and user is not authenticated
            navigate("/login");
        } else if (!loading) {
            fetchNews(); // Fetch news only if user is authenticated
        }
    }, [loading, isAuth]);

    if (loading) return <Loader textData="Loading..." />

    if (!data) return <Loader textData="Fetching news..." />

    return (
        <div className='container-fluid d-flex flex-column justify-content-center align-items-center p-5 gap-4'>
            <h2>Today's Astronomy News</h2>
            {data.map((item, index) => (
                <div key={item.id} className={styles.news}>
                    <div className={styles.left}>
                        <div className={styles.info}>
                            <p className='fs-2'>{item.title}</p>
                            <p className='px-2 text-secondary'>Publish date: {item.published_at.split("T")[0]}</p>
                            <p className=''>{item.summary}</p>
                        </div>
                        <div className={styles.button}>
                            <a className={styles.btn} href={item.url}>Learn More</a>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <img className={styles.img} src={item.image_url} alt={item.title} />
                    </div>
                </div>
            ))}
        </div>
    );
}





// import { useEffect, useState } from 'react';
// import styles from './news.module.css';
// import axios from 'axios';


// export default function NewsPage() {
//     const [ data, setData ] = useState();
//     useEffect(()=>{
//         let res = axios.get("http://localhost:3000/api/data/allNews").then(
//             res => {
//                 setData(res.data.results);
//             }
//         ).catch(err => {
//             console.log(err);
//         })
//     },[])
//     // console.log(data);

//     if(!data) return <div className={styles.loader}>Loading.....</div> 

//   return (
//     <div className='container-fluid d-flex flex-column justify-content-center align-items-center p-5 gap-4'>
//         <h2>Today's Astronomy News</h2>
//         {data.map((item,index) => (
//             <div key={item.id} className={styles.news}>
//                 <div className={styles.left}>
//                     <div className={styles.info}>
//                     <p className='fs-2'>{item.title}</p>
//                     <p className='px-2 text-secondary'>Publish date : {item.published_at.split("T")[0]}</p>
//                     <p className=''>{item.summary}</p>
//                     </div>
//                     <div className={styles.button}>
//                         <a className={styles.btn} href={item.url}>Learn More</a>
//                     </div>
//                 </div>
//                 <div className={styles.right}>
//                     <img className={styles.img} src={item.image_url} alt={item.title} />
//                 </div>
//             </div>
//         ))}
//     </div>
//   )
// }
