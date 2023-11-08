import Link from "next/link";
import { useRef, useState } from "react";

export default function Header() {
    const optionArray = ['Pictures', 'Videos', 'Pictures', 'Videos', 'Pictures', 'Videos'];
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
        <header className="px-14 py-4 flex items-center justify-between">
            <div>
                <Link href="/" className="text-xl font-medium">Brand Name</Link>
            </div>
            <div className="bg-[red] flex-grow mx-[30px] rounded-md h-[50px] flex items-center">
                <div className="h-full flex items-center px-2 dropdown__bx relative">
                    <input
                        onClick={openOption}
                        onBlur={() => setOpenSelect(false)}
                        ref={optionSelection}
                        type="text"
                        readOnly
                        className="h-full max-w-[150px] outline-none border-none relative cursor-pointer"
                    />
                    <span className={openSelect ? 'icon active relative' : 'icon'}>
                        <svg class="w-3 h-3 text-[#4a4a4a]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m1 9 4-4-4-4" />
                        </svg>
                    </span>
                    <div className={openSelect == true? 'dropdown__menu active' : 'dropdown__menu'}>
                        {optionArray.map((item, index) => (
                            <li onClick={selectValue} key={index}>{item}</li>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex items-center">
                <div className="mr-[15px] px-2">
                    <span className="capitalize text-[#4a4a4a] font-medium font-medium">explore</span>
                </div>
                <span className="capitalize mr-[15px] px-2 text-[#4a4a4a] font-medium">license</span>
                <span className="capitalize mr-[15px] px-2 text-[#4a4a4a] font-medium">upload</span>
                <div className="mr-[15px] px-2">
                    <button>
                        <svg class="w-4 h-4 text-[#4a4a4a]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                        </svg>
                    </button>
                </div>
                <button className="text-base capitalize px-5 rounded-md bg-[#003ECB] text-white h-[50px] font-medium">join</button>
            </div>
        </header>
    )
}
