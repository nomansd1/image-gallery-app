import { useEffect, useState } from "react"
import SubscriptionModal from "./modal/SubscriptionModal"
import { useDispatch, useSelector } from "react-redux"
import { getImagesByCategory } from "@/redux/features/gallery/galleryReducer"
import axios from "axios"
import { getSubscription } from "@/redux/features/subscriptionReducer"
export default function ImageGrid() {
    const { images } = useSelector((state) => state.gallery)
    const { auth } = useSelector((state) => state.auth)
    const { subscriptions, isError, isSuccess } = useSelector((state) => state.subscription)
    const dispatch = useDispatch()
    console.log(subscriptions, "subscription===========================");
    const [isOpen, setIsOpen] = useState(false)
    const [category, setCategory] = useState('Home')
    const handleOpenModal = (id) => {
        setIsOpen(true)
    }
    const handleCloseModal = (id) => {
        setIsOpen(false)
    }
    const handleCategory = (item) => {
        setCategory(item)
    }
    useEffect(() => {
        dispatch(getImagesByCategory(category))
    }, [category])
    const data = images.map((item) => {
        item.images.map((item, index) => {
            item
        })
    })
    //Download the  QR Code
    const handledownloadImage = item => {
        axios.get('https://legendary-palm-tree-gr95q756r5hwr7v-8000.app.github.dev/api/downloadImage/', {
            params: {
                url: item,
            },
            responseType: 'blob', // Set the response type to 'blob' to handle binary data (e.g., images)
        })
            .then(response => {
                // Create a link element to trigger the download
                const downloadLink = document.createElement('a');
                downloadLink.href = URL.createObjectURL(new Blob([response.data]));
                downloadLink.download = 'downloaded-image.jpg';
                // Append the link to the body and trigger the click event
                document.body.appendChild(downloadLink);
                downloadLink.click();
                // Clean up
                document.body.removeChild(downloadLink);
            })
            .catch(error => {
                console.error('Error downloading image:', error);
            });
    }
    useEffect(() => {
        dispatch(getSubscription(auth?._id))
    }, [dispatch])
    const isSubscribed = Boolean(subscriptions && Object.keys(subscriptions).length != 0);
    const isAuthenticated = Boolean(auth && Object.keys(auth).length != 0);
    console.log(isSubscribed, "isSubscribed");
    return (
        <>
            <div className="max-w-screen-xl mx-auto p-7 md:p-14">
                <div className="flex items-center w-full md:w-fit mx-auto p-3 overflow-auto no__scrollbar">
                    <button onClick={() => handleCategory('Home')} className={`rounded-full py-2 px-4 outline-none border-none capitalize text-base font-medium ${category === 'Home' ? 'active__link' : ''} `}>home</button>
                    <button onClick={() => handleCategory('Pizza')} className={`rounded-full py-2 px-4 outline-none border-none capitalize text-base font-medium ${category === 'Pizza' ? 'active__link' : ''}`}>Pizza</button>
                    <button onClick={() => handleCategory('Burger')} className={`rounded-full py-2 px-4 outline-none border-none capitalize text-base font-medium ${category === 'Burger' ? 'active__link' : ''}`}>Burger</button>
                    <button className="rounded-full py-2 px-4 outline-none border-none capitalize text-base font-medium">challenges</button>
                </div>
                <h1 className="text-xl font-medium">Free Stock Photos</h1>
                {
                    category === 'Pizza' ? (
                        <>
                            <div class="grid grid-cols-2 md:grid-cols-3 gap-8 mt-8">
                                {
                                    images?.length > 0 ? (
                                        images?.map((item, index) => {
                                            console.log(item?.images[0]?.location);
                                            return (
                                                <>

                                                    <div class="grid gap-4">
                                                        <div className="relative group">
                                                            <div className="absolute w-full h-full bg-red-300 rounded-lg overlay__effect hidden group-[:hover]:flex">
                                                                <div className="flex items-center absolute top-4 right-4">
                                                                    <button className="px-2 py-1.5 rounded-md bg-white">
                                                                        <svg class="w-6 h-6 text-[#4a4a4a]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 19">
                                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z" />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                                                    <div className="flex items-center max-w-[140px]">
                                                                        <img class="w-10 h-10 rounded-full" src="https://t3.ftcdn.net/jpg/02/22/85/16/360_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg" alt="" />
                                                                        <h1 className="text-sm font-medium text-white ml-2 text-ellipsis whitespace-nowrap overflow-hidden">Justin Topley</h1>
                                                                    </div>
                                                                    <div>
                                                                        {isAuthenticated ? (
                                                                            isSubscribed ? (
                                                                                <button onClick={() => { handledownloadImage(item?.images[index]?.location) }} className="px-2 py-1.5 rounded-md bg-white">
                                                                                    <svg className="w-6 h-6 text-[#4a4a4a]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g > <path d="M12.5535 16.5061C12.4114 16.6615 12.2106 16.75 12 16.75C11.7894 16.75 11.5886 16.6615 11.4465 16.5061L7.44648 12.1311C7.16698 11.8254 7.18822 11.351 7.49392 11.0715C7.79963 10.792 8.27402 10.8132 8.55352 11.1189L11.25 14.0682V3C11.25 2.58579 11.5858 2.25 12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V14.0682L15.4465 11.1189C15.726 10.8132 16.2004 10.792 16.5061 11.0715C16.8118 11.351 16.833 11.8254 16.5535 12.1311L12.5535 16.5061Z" fill="#1C274C"></path> <path d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z" fill="currentColor"></path> </g></svg>
                                                                                </button>
                                                                            ) : (
                                                                                <button onClick={() => { handleOpenModal(item?.id) }} className="px-2 py-1.5 rounded-md bg-white">
                                                                                    <svg className="w-6 h-6 text-[#4a4a4a]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g > <path d="M12.5535 16.5061C12.4114 16.6615 12.2106 16.75 12 16.75C11.7894 16.75 11.5886 16.6615 11.4465 16.5061L7.44648 12.1311C7.16698 11.8254 7.18822 11.351 7.49392 11.0715C7.79963 10.792 8.27402 10.8132 8.55352 11.1189L11.25 14.0682V3C11.25 2.58579 11.5858 2.25 12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V14.0682L15.4465 11.1189C15.726 10.8132 16.2004 10.792 16.5061 11.0715C16.8118 11.351 16.833 11.8254 16.5535 12.1311L12.5535 16.5061Z" fill="#1C274C"></path> <path d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z" fill="currentColor"></path> </g></svg>
                                                                                </button>
                                                                            )
                                                                        ) : (
                                                                            <button onClick={() => { handleOpenModal(item?.id) }} className="px-2 py-1.5 rounded-md bg-white">
                                                                                <svg className="w-6 h-6 text-[#4a4a4a]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g > <path d="M12.5535 16.5061C12.4114 16.6615 12.2106 16.75 12 16.75C11.7894 16.75 11.5886 16.6615 11.4465 16.5061L7.44648 12.1311C7.16698 11.8254 7.18822 11.351 7.49392 11.0715C7.79963 10.792 8.27402 10.8132 8.55352 11.1189L11.25 14.0682V3C11.25 2.58579 11.5858 2.25 12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V14.0682L15.4465 11.1189C15.726 10.8132 16.2004 10.792 16.5061 11.0715C16.8118 11.351 16.833 11.8254 16.5535 12.1311L12.5535 16.5061Z" fill="#1C274C"></path> <path d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z" fill="currentColor"></path> </g></svg>
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <img class="h-auto max-w-full rounded-lg" src={item?.images[index]?.location} alt="" />
                                                        </div>
                                                    </div>

                                                </>
                                            )
                                        })
                                    )
                                        :
                                        (
                                            <h1 className="text-xl font-medium text-center">Not found</h1>
                                        )
                                }
                            </div>

                        </>
                    ) :
                        category === 'Burger' ?

                            (
                                <>
                                    <div class="grid grid-cols-2 md:grid-cols-3 gap-8 mt-8">
                                        {
                                            images?.length > 0 ? (
                                                images?.map((item, index) => {
                                                    console.log(item?.images[index]?.originalname, "item?.images[index]");
                                                    return (
                                                        <>

                                                            <div class="grid gap-4">
                                                                <div className="relative group">
                                                                    <div className="absolute w-full h-full bg-red-300 rounded-lg overlay__effect hidden group-[:hover]:flex">
                                                                        <div className="flex items-center absolute top-4 right-4">
                                                                            <button className="px-2 py-1.5 rounded-md bg-white">
                                                                                <svg class="w-6 h-6 text-[#4a4a4a]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 19">
                                                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z" />
                                                                                </svg>
                                                                            </button>
                                                                        </div>
                                                                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                                                            <div className="flex items-center max-w-[140px]">
                                                                                <img class="w-10 h-10 rounded-full" src="https://t3.ftcdn.net/jpg/02/22/85/16/360_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg" alt="" />
                                                                                <h1 className="text-sm font-medium text-white ml-2 text-ellipsis whitespace-nowrap overflow-hidden">Justin Topley</h1>
                                                                            </div>
                                                                            <div>
                                                                                {isAuthenticated ? (
                                                                                    isSubscribed ? (
                                                                                        <button onClick={() => { handledownloadImage(item?.images[index]?.location) }} className="px-2 py-1.5 rounded-md bg-white">
                                                                                            <svg className="w-6 h-6 text-[#4a4a4a]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g > <path d="M12.5535 16.5061C12.4114 16.6615 12.2106 16.75 12 16.75C11.7894 16.75 11.5886 16.6615 11.4465 16.5061L7.44648 12.1311C7.16698 11.8254 7.18822 11.351 7.49392 11.0715C7.79963 10.792 8.27402 10.8132 8.55352 11.1189L11.25 14.0682V3C11.25 2.58579 11.5858 2.25 12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V14.0682L15.4465 11.1189C15.726 10.8132 16.2004 10.792 16.5061 11.0715C16.8118 11.351 16.833 11.8254 16.5535 12.1311L12.5535 16.5061Z" fill="#1C274C"></path> <path d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z" fill="currentColor"></path> </g></svg>
                                                                                        </button>
                                                                                    ) : (
                                                                                        <button onClick={() => { handleOpenModal(item?.id) }} className="px-2 py-1.5 rounded-md bg-white">
                                                                                            <svg className="w-6 h-6 text-[#4a4a4a]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g > <path d="M12.5535 16.5061C12.4114 16.6615 12.2106 16.75 12 16.75C11.7894 16.75 11.5886 16.6615 11.4465 16.5061L7.44648 12.1311C7.16698 11.8254 7.18822 11.351 7.49392 11.0715C7.79963 10.792 8.27402 10.8132 8.55352 11.1189L11.25 14.0682V3C11.25 2.58579 11.5858 2.25 12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V14.0682L15.4465 11.1189C15.726 10.8132 16.2004 10.792 16.5061 11.0715C16.8118 11.351 16.833 11.8254 16.5535 12.1311L12.5535 16.5061Z" fill="#1C274C"></path> <path d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z" fill="currentColor"></path> </g></svg>
                                                                                        </button>
                                                                                    )
                                                                                ) : (
                                                                                    <button onClick={() => { handleOpenModal(item?.id) }} className="px-2 py-1.5 rounded-md bg-white">
                                                                                        <svg className="w-6 h-6 text-[#4a4a4a]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g > <path d="M12.5535 16.5061C12.4114 16.6615 12.2106 16.75 12 16.75C11.7894 16.75 11.5886 16.6615 11.4465 16.5061L7.44648 12.1311C7.16698 11.8254 7.18822 11.351 7.49392 11.0715C7.79963 10.792 8.27402 10.8132 8.55352 11.1189L11.25 14.0682V3C11.25 2.58579 11.5858 2.25 12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V14.0682L15.4465 11.1189C15.726 10.8132 16.2004 10.792 16.5061 11.0715C16.8118 11.351 16.833 11.8254 16.5535 12.1311L12.5535 16.5061Z" fill="#1C274C"></path> <path d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z" fill="currentColor"></path> </g></svg>
                                                                                    </button>
                                                                                )}
                                                                            </div>


                                                                        </div>
                                                                    </div>
                                                                    <img class="h-auto max-w-full rounded-lg" src={item?.images[index]?.location} alt={item?.images[index]?.originalname} id={item?.images[index]?.originalname} />
                                                                </div>
                                                            </div>

                                                        </>
                                                    )
                                                })
                                            )
                                                : (
                                                    <h1 className="text-xl font-medium text-center">Not found</h1>
                                                )
                                        }
                                    </div>

                                </>
                            )
                            :
                            (<>
                                <div class="grid grid-cols-2 md:grid-cols-3 gap-8 mt-8">
                                    {images?.length > 0 ? (
                                        images.map((item, index) => (
                                            item.images.map((image, imgIndex) => (
                                                <div key={index} className="grid gap-4">
                                                    <div className="relative group">
                                                        <div className="absolute w-full h-full bg-red-300 rounded-lg overlay__effect hidden group-[:hover]:flex">
                                                            <div className="flex items-center absolute top-4 right-4">
                                                                <button className="px-2 py-1.5 rounded-md bg-white">
                                                                    <svg className="w-6 h-6 text-[#4a4a4a]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 19">
                                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                                                <div className="items-center max-w-[140px] hidden md:flex">
                                                                    <img className="w-10 h-10 rounded-full" src="https://t3.ftcdn.net/jpg/02/22/85/16/360_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg" alt="" />
                                                                    <h1 className="text-sm font-medium text-white ml-2 text-ellipsis whitespace-nowrap overflow-hidden">Justin Topley</h1>
                                                                </div>
                                                                <div>
                                                                                {isAuthenticated ? (
                                                                                    isSubscribed ? (
                                                                                        <button onClick={() => { handledownloadImage(image.location) }} className="px-2 py-1.5 rounded-md bg-white">
                                                                                            <svg className="w-6 h-6 text-[#4a4a4a]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g > <path d="M12.5535 16.5061C12.4114 16.6615 12.2106 16.75 12 16.75C11.7894 16.75 11.5886 16.6615 11.4465 16.5061L7.44648 12.1311C7.16698 11.8254 7.18822 11.351 7.49392 11.0715C7.79963 10.792 8.27402 10.8132 8.55352 11.1189L11.25 14.0682V3C11.25 2.58579 11.5858 2.25 12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V14.0682L15.4465 11.1189C15.726 10.8132 16.2004 10.792 16.5061 11.0715C16.8118 11.351 16.833 11.8254 16.5535 12.1311L12.5535 16.5061Z" fill="#1C274C"></path> <path d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z" fill="currentColor"></path> </g></svg>
                                                                                        </button>
                                                                                    ) : (
                                                                                        <button onClick={() => { handleOpenModal(item?.id) }} className="px-2 py-1.5 rounded-md bg-white">
                                                                                            <svg className="w-6 h-6 text-[#4a4a4a]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g > <path d="M12.5535 16.5061C12.4114 16.6615 12.2106 16.75 12 16.75C11.7894 16.75 11.5886 16.6615 11.4465 16.5061L7.44648 12.1311C7.16698 11.8254 7.18822 11.351 7.49392 11.0715C7.79963 10.792 8.27402 10.8132 8.55352 11.1189L11.25 14.0682V3C11.25 2.58579 11.5858 2.25 12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V14.0682L15.4465 11.1189C15.726 10.8132 16.2004 10.792 16.5061 11.0715C16.8118 11.351 16.833 11.8254 16.5535 12.1311L12.5535 16.5061Z" fill="#1C274C"></path> <path d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z" fill="currentColor"></path> </g></svg>
                                                                                        </button>
                                                                                    )
                                                                                ) : (
                                                                                    <button onClick={() => { handleOpenModal(item?.id) }} className="px-2 py-1.5 rounded-md bg-white">
                                                                                        <svg className="w-6 h-6 text-[#4a4a4a]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g > <path d="M12.5535 16.5061C12.4114 16.6615 12.2106 16.75 12 16.75C11.7894 16.75 11.5886 16.6615 11.4465 16.5061L7.44648 12.1311C7.16698 11.8254 7.18822 11.351 7.49392 11.0715C7.79963 10.792 8.27402 10.8132 8.55352 11.1189L11.25 14.0682V3C11.25 2.58579 11.5858 2.25 12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V14.0682L15.4465 11.1189C15.726 10.8132 16.2004 10.792 16.5061 11.0715C16.8118 11.351 16.833 11.8254 16.5535 12.1311L12.5535 16.5061Z" fill="#1C274C"></path> <path d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z" fill="currentColor"></path> </g></svg>
                                                                                    </button>
                                                                                )}
                                                                            </div>
                                                            </div>
                                                        </div>
                                                        <img key={imgIndex} className="h-auto max-w-full rounded-lg" src={image.location} alt={image.originalname} />
                                                    </div>
                                                </div>
                                            ))
                                        ))
                                    ) : (
                                        <h1 className="text-xl font-medium text-center">Not found</h1>
                                    )}
                                </div>
                            </>)
                }


            </div>
            <SubscriptionModal isOpen={isOpen} handleClose={handleCloseModal} />
        </>
    )
}