import { useState, useEffect } from "react";
import { Nav, SuccessDisplay } from "@/Components";
import { Head, Link } from "@inertiajs/react";

const Success = ({ ...props }) => {
    const [waitTime, setWaitTime] = useState(2 * 60); // Initial wait time in seconds (5 minutes)
    const [timeRemaining, setTimeRemaining] = useState(waitTime);

    useEffect(() => {
        if (timeRemaining > 0) {
            const timer = setTimeout(() => {
                setTimeRemaining(timeRemaining - 1);
            }, 1000); // Decrement the time every second

            return () => clearTimeout(timer);
        }
    }, [timeRemaining]);

    const handleLinkClick = () => {
        // Increment the wait time by 5 minutes on each click
        const newWaitTime = waitTime + 5 * 60;
        setWaitTime(newWaitTime);
        setTimeRemaining(newWaitTime);
    };

    // Helper function to format time as mm:ss
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    return (
        <main>
            <Nav />
            <Head title="Reset Link Sent" />
            <div className="h-[90vh] flex flex-col items-center justify-center">
                <SuccessDisplay animation={false} {...props} />
                <div className="text-center mt-6 text-gray-400 text-sm">
                    {timeRemaining > 0 ? (
                        <span className="text-gray-500">
                            {formatTime(timeRemaining)}
                        </span>
                    ) : (
                        <Link href="/auth/forgot" className="text-blue-600" onClick={handleLinkClick}>
                            Resend Link
                        </Link>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Success;
