import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import BannerReview from "../../assets/bannerReview.jpg";

const Testimonial = ({ testitmonial }) => {
    const { userName, photoURL, rating, date, review, profession } = testitmonial || {};

    return (
        <div className="text-white h-[400px] md:h-[450px] flex flex-col items-center justify-center rounded-lg relative">
            <img className='object-cover w-full h-[400px] md:h-[450px]' src={BannerReview} alt="banner bg" />
            <div className="absolute top-0 left-0 bg-[#00000099] w-full h-full rounded-lg"></div>
            <div className="absolute top-0 left-0 h-full flex flex-col items-center justify-center px-8 w-full">
                <img className='w-[75px] md:w-[100px] h-[75px] mb-2 md:h-[100px] object-cover rounded-full z-50' src={photoURL} alt={name} />
                <h1 className="font-bold text-[16px] md:text-2xl mb-1 text-center">
                    {userName}
                </h1>
                <h3 className="text-[11px] md:text-sm mb-2 md:mb-3">
                    {profession}
                </h3>
                <h3 className="text-[11px] md:text-sm mb-2 md:mb-3">
                    Posted on: {date || "12/23/2023"}
                </h3>
                <div className=' w-4/6'>
                    <p className="text-center text-[10px] md:text-sm">{review}</p>
                </div>
                <div className="mt-4">
                    <Rating
                        name="text-feedback"
                        value={rating || 0}
                        readOnly
                        precision={0.1}
                        size="small"
                        emptyIcon={<StarIcon style={{ opacity: 1, color: "white" }} fontSize="inherit" />}
                    />
                </div>
            </div>
        </div>
    );
};

export default Testimonial;