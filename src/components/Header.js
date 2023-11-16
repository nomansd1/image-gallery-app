import { useEffect, useRef, useState } from "react";
import Link from 'next/link'
import Sidebar from "./Sidebar";
import { getUserInfo } from "@/utils/getUser";
import { clearData } from "@/redux/features/auth/auth.slice";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";


export default function Header() {
    const { auth } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const optionArray = ['Photos', 'Videos'];
    const [openSelect, setOpenSelect] = useState(false);
    const [isSticky, setSticky] = useState(false);
    const [isSidebar, setSidebar] = useState(false);

    const optionSelection = useRef();

    let selectValue = (e) => {
        optionSelection.current.value = e.target.outerText;
        setOpenSelect(false);
    }
    let openOption = () => {
        console.log('meunu opened');
        setOpenSelect(true);
    }
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;

            // Adjust the scroll threshold as needed
            if (scrollPosition > 600) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        };

        // Add the event listener when the component mounts
        window.addEventListener('scroll', handleScroll);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array means this effect runs once when the component mounts
    const route = useRouter()
    const data = getUserInfo()

    const handleLogOut = () => {
        localStorage.clear()
        localStorage.removeItem("persist:root")
        dispatch(clearData())
        route.push('/login')
    }
    const isAuthenticated = Boolean(auth && Object.keys(auth).length != 0);
    console.log(isAuthenticated,"isAuthenticated=============");
    return (
        <>
            {isSticky ?
                <header className={`header px-4 md:px-14 py-4 flex items-center justify-between bg-white transition-all duration-300 ease-linear sticky top-0 z-50`}>
                    <div>
                        <Link href="/" className="text-xl font-medium">Logo</Link>
                    </div>
                    <div className="bg-[#F7F7F7] flex-grow mx-[10px] md:mx-[30px] rounded-md h-[50px] flex items-center">
                        <div className="h-full flex items-center px-2 dropdown__bx relative">
                            <input
                                onClick={openOption}
                                onBlur={() => setOpenSelect(false)}
                                ref={optionSelection}
                                type="text"
                                value={optionArray[0]}
                                readOnly
                                className="h-full max-w-[70px] md:max-w-[150px] outline-none border-none relative cursor-pointer px-2 text-sm bg-transparent"
                            />
                            <span className={openSelect ? 'icon active relative' : 'icon'}>
                                <svg class="w-3 h-3 text-[#4a4a4a]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m1 9 4-4-4-4" />
                                </svg>
                            </span>
                            <div className={openSelect == true ? 'dropdown__menu active' : 'dropdown__menu'}>
                                {optionArray.map((item, index) => (
                                    <li onClick={selectValue}
                                        key={index}
                                        className="list-none w-full"
                                    >
                                        <span className="px-2 py-1.5 w-full rounded-md text-sm capitalize hover:bg-[#F6F7F9] transition-all ease-linear duration-300 flex items-center cursor-pointer">{item}</span>
                                    </li>
                                ))}
                            </div>
                        </div>
                        <span className="w-[2px] h-[50%] bg-[#4a4a4a] md:mx-2 mx-1"></span>
                        <div className="flex items-center flex-grow h-full">
                            <input type="text"
                                placeholder="Search for free photos"
                                className="h-full w-full bg-transparent border-outline focus:outline-none px-2 placeholder:text-[#4a4a4a]"
                            />
                            <svg class="w-5 h-5 text-[#4a4a4a] mr-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="mr-[15px] px-2 hidden md:inline-flex">
                            <span className="capitalize text-[#4a4a4a] font-medium">explore</span>
                        </div>
                        <span className="capitalize mr-[15px] px-2 text-[#4a4a4a] font-medium hidden md:inline-flex">license</span>
                        <span className="capitalize mr-[15px] px-2 text-[#4a4a4a] font-medium hidden md:inline-flex">upload</span>
                        <div className="mr-[15px] px-2 hidden md:inline-flex">
                            <button>
                                <svg class="w-4 h-4 text-[#4a4a4a]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                </svg>
                            </button>
                        </div>
                        {isAuthenticated ? (
                            <button className="text-base capitalize px-5 rounded-md bg-[#167DD3] hover:bg-[#1471be] text-white h-[50px] font-medium hidden md:inline-flex items-center" onClick={handleLogOut}>Logout</button>
                        ) : (
                            <button className="text-base capitalize px-5 rounded-md bg-[#167DD3] hover:bg-[#1471be] text-white h-[50px] font-medium hidden md:inline-flex items-center">join</button>
                        )}
                        <button onClick={() => { setSidebar(true) }} className="ml-2 md:hidden">
                            <svg className="w-7 h-7 text-[#4a4a4a]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><g><path d="M5 17H13M5 12H19M11 7H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                        </button>
                    </div>
                </header> :
                <header className={`px-7 md:px-14 py-4 flex items-center justify-between bg-transparent absolute top-0 left-0 z-50 right-0`}>
                    <div>
                        <Link href="/" className="text-xl font-medium text-white">Logo</Link>
                    </div>
                    <div className="flex items-center">
                        <div className="mr-[15px] px-2 hidden md:inline-flex">
                            <span className="capitalize text-white font-medium">explore</span>
                        </div>
                        <span className="capitalize mr-[15px] px-2 text-white font-medium hidden md:inline-flex">license</span>
                        <span className="capitalize mr-[15px] px-2 text-white font-medium hidden md:inline-flex">upload</span>
                        <div className="mr-[15px] px-2 hidden md:inline-flex">
                            <button>
                                <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                </svg>
                            </button>
                        </div>{
                            isAuthenticated ? (<button onClick={() => handleLogOut} className="capitalize mr-[15px] px-2 text-white font-medium hidden md:inline-flex">Logout</button>) : (
                                <button className="text-base capitalize px-5 rounded-md bg-white text-[#4a4a4a] h-[40px] md:h-[50px] font-medium"><Link href="/login">Login</Link></button>
                            )
                        }
                        <button onClick={() => { setSidebar(true) }} className="ml-4 md:hidden">
                            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><g><path d="M5 17H13M5 12H19M11 7H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                        </button>
                    </div>
                </header>
            }
            <Sidebar state={isSidebar} onPress={() => setSidebar(false)} />
        </>
    )
}
