const LoadingCard = () => {
    return <>
        <div className="animate-pulse">
            <div class="w-60 h-8 mb-4 rounded-sm my-1 block bg-slate-300"></div>
            <div className="grid grid-rows-4">
                <div class="w-48 h-4 rounded-sm my-1 block bg-slate-300"></div>
                <div class="w-36 h-4 rounded-sm my-1 block bg-slate-300"></div>
                <div class="w-20 h-4 rounded-sm my-1 block bg-slate-300"></div>
                <div class="w-32 h-4 rounded-sm my-1 block bg-slate-300"></div>
            </div>
            <div class="w-10 h-3 rounded-sm my-1 block bg-slate-300"></div>
        </div>
    </>
}

export default LoadingCard;
