export default function FilmSkeleton() {
    return (
        <div aria-hidden="true">
            <div className="skeleton w-full aspect-[2/3] rounded-3xl" />
            <div className="mt-3 mx-1 flex flex-col gap-2">
                <div className="skeleton h-3.5 w-4/5 rounded-full" />
                <div className="skeleton h-3.5 w-2/5 rounded-full" />
            </div>
        </div>
    );
}
