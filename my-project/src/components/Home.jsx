import React, { useEffect } from 'react';

function Home() {
    useEffect(() => {
        const carousel = document.querySelector('[data-carousel="static"]');
        let currentIndex = 0;
        const items = carousel.querySelectorAll('[data-carousel-item]');
        const totalItems = items.length;

        const updateCarousel = (newIndex) => {
            items[currentIndex].classList.add('hidden');
            items[currentIndex].classList.remove('block');
            items[newIndex].classList.remove('hidden');
            items[newIndex].classList.add('block');
            currentIndex = newIndex;
        };

        const next = () => {
            const newIndex = (currentIndex + 1) % totalItems;
            updateCarousel(newIndex);
        };

        const prev = () => {
            const newIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateCarousel(newIndex);
        };

        const nextButton = carousel.querySelector('[data-carousel-next]');
        const prevButton = carousel.querySelector('[data-carousel-prev]');
        
        nextButton.addEventListener('click', next);
        prevButton.addEventListener('click', prev);

        return () => {
            nextButton.removeEventListener('click', next);
            prevButton.removeEventListener('click', prev);
        };
    }, []);

    return (
        <section className="pd-1">
            <div id="controls-carousel" className="relative w-full" data-carousel="static">
                <div className="relative h-96 md:h-[600px] overflow-hidden ">
                    <div className="hidden duration-700 ease-in-out" data-carousel-item>
                        <img src="https://media.istockphoto.com/id/1141690680/photo/thirsty-child-drinking-water-on-water-pump.jpg?s=612x612&w=0&k=20&c=1yV5jEVZ4JcyB4Psztr5KXVjDcxIX9jml4AAeBpdzrY=" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-30 w-30" alt="High Quality Image 1"/>
                    </div>
                    <div className="hidden duration-700 ease-in-out block" data-carousel-item="active">
                        <img src="https://www.compassion.com/Images/boy-drinking-water.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-30 w-30" alt="High Quality Image 2"/>
                    </div>
                    <div className="hidden duration-700 ease-in-out" data-carousel-item>
                        <img src="https://media.istockphoto.com/id/648489390/photo/drinking-water.jpg?s=612x612&w=0&k=20&c=9bbEhWXzkBtBXGJtOO-zVYrjJvhQcGWJqEJvlJja73E=" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-30 w-30" alt="High Quality Image 3"/>
                    </div>
                </div>
                <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
                <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div>
        </section>
    );
}

export default Home;
