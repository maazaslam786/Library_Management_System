import { useState, useEffect } from "react";
import "./background.css";

function Background() {
    const lines = [
        ["From Storytime to Study Sessions,", "We’ve Got You Covered..."],
        ["Discover, Learn, and Belong –", "Your Next Chapter Starts Here!"]
    ];

    const [currentLine, setCurrentLine] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentLine((prev) => (prev + 1) % lines.length);
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg">
            <div className="tagline">
                <span>{lines[currentLine][0]}</span>
                <br />
                <span>{lines[currentLine][1]}</span>
            </div>
        </div>
    );
}

export default Background;
