export function TopLoader() {
    return (
        <>
            <div
                className="fixed left-0 top-0 z-50 h-1 w-full"
                style={{
                    background: "linear-gradient(90deg, #ec4899, #facc15, #34d399, #60a5fa, #ec4899)",
                    backgroundSize: "200% 100%",
                    animation: "topLoader 1.5s linear infinite",
                }}
            />
            <style>{`
                @keyframes topLoader {
                from { background-position: 0% 0%; }
                to { background-position: 200% 0%; }
                }
            `}</style>
        </>
    );
}
