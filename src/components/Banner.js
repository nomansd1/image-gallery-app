import { useRef, useState } from "react";

export default function Banner() {
    const optionArray = ['Photos', 'Videos'];
    const [openSelect, setOpenSelect] = useState(false);

    const optionSelection = useRef();

    let selectValue = (e) => {
        optionSelection.current.value = e.target.outerText;
        setOpenSelect(false);
    }
    let openOption = () => {
        console.log('meunu opened');
        setOpenSelect(true);
    }
    return (
        <section class="bg__banner min-h-[550px]">
            <div className="absolute h-full w-full bg__overlay flex items-center justify-center">
                <div class="px-4 mx-auto max-w-screen-xl text-center lg:px-12 flex justify-center items-center flex-col">
                <a href="#" class="w-fit mx-auto inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm rounded-full bg__anchor  text-white" role="alert">
                    <span class="text-xs rounded-full bg-white text-[#4a4a4a] px-4 py-1.5 mr-3">New</span> <span class="text-sm font-medium">Stock photos & videos libray</span>
                    <svg class="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                </a>
                <h1 class="mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-4xl lg:text-4xl text-white max-w-3xl mx-auto">The best free stock photos, royalty free images & videos shared by creators.</h1>
                <div className="bg-[#F7F7F7] flex-grow rounded-md h-[50px] flex items-center w-full max-w-2xl  mt-5">
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
                    <span className="w-[2px] h-[50%] bg-[#c1c1c1] mx-2"></span>
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
                </div>
            </div>
        </section>
    )
}