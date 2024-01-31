import RadioButtons from './Radio-buttons';

function WeMakeItEasySection() {
    return (
        <div className="container mx-auto dark:text-white flex items-center justify-between">
            <div className="basis-[45%]">
                <img
                    src="https://c0.wallpaperflare.com/preview/817/828/930/architecture-beautiful-exterior-family-house.jpg"
                    alt="house-1"
                    className="rounded-md"
                />
                <div className="flex justify-around border transition-all dark:bg-slate-800 dark:border-slate-500 rounded-md border-indigo-100 w-[60%] mx-auto translate-y-[-50%] p-3 bg-white shadow-lg text-left">
                    <div>
                        <p className="font-bold text-indigo-900 dark:text-indigo-200 transition-all">
                            Find the best deal
                        </p>
                        <p className="text-slate-500">
                            Browse thousands of properties
                        </p>
                    </div>
                    <div className="relative bottom-10 flex items-center justify-center transition-all border border-white dark:border-slate-800 w-14 h-14 rounded-full bg-indigo-400">
                        <i className="fas fa-home text-2xl text-white dark:text-slate-800 transition-all"></i>
                    </div>
                </div>
            </div>
            <div className="text-left w-[42%]">
                <RadioButtons />
                <h2 className="text-5xl font-bold">
                    We make it easy for tennants and landlords.
                </h2>
                <p className="text-slate-500 my-6">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Nam, maiores vitae. Alias iure deserunt, nemo labore fuga
                    optio ab corporis, molestias, id vitae veritatis dignissimos
                    aut minima minus non ad culpa esse ullam veniam quae
                    accusamus quibusdam! Placeat, at distinctio?
                </p>
                <a
                    href="#"
                    className="transition-all inline-block py-2 px-4 rounded-md bg-indigo-400 hover:bg-indigo-500 active:scale-95 text-white"
                >
                    See more &rarr;
                </a>
            </div>
        </div>
    );
}

export default WeMakeItEasySection;
