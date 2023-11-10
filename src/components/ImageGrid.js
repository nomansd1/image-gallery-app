export default function ImageGrid() {
    return (
        <div className="max-w-screen-xl mx-auto p-7 md:p-14">
            <div className="flex items-center w-fit mx-auto p-3">
                <button className="rounded-full py-2 px-4 outline-none border-none capitalize text-base font-medium active__link">home</button>
                <button className="rounded-full py-2 px-4 outline-none border-none capitalize text-base font-medium">videos</button>
                <button className="rounded-full py-2 px-4 outline-none border-none capitalize text-base font-medium">leaderboard</button>
                <button className="rounded-full py-2 px-4 outline-none border-none capitalize text-base font-medium">challenges</button>
            </div>
            <h1 className="text-xl font-medium">Free Stock Photos</h1>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-8 mt-8">
                <div class="grid gap-4">
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg" alt="" />
                    </div>
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg" alt="" />
                    </div>
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg" alt="" />
                    </div>
                </div>
                <div class="grid gap-4">
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg" alt="" />
                    </div>
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg" alt="" />
                    </div>
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg" alt="" />
                    </div>
                </div>
                <div class="grid gap-4">
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg" alt="" />
                    </div>
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg" alt="" />
                    </div>
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}