import { useState, useEffect } from "react";
import "./Hero.css";

const slides = [
    { title: "Slide 1", color: "#FF6B6B" },
    { title: "Slide 2", color: "#4ECDC4" },
    { title: "Slide 3", color: "#556270" },
];

export default function Hero() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => {
                let next = prev + direction;

                if (next >= slides.length) {
                    setDirection(-1);
                    next = prev - 1;
                } else if (next < 0) {
                    setDirection(1);
                    next = prev + 1;
                }

                return next;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [direction]);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setDirection(1);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
        setDirection(-1);
    };

    return (
        <div className="carousel">
            <div
                className="slides"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div
                        className="slide"
                        key={index}
                        style={{ backgroundColor: slide.color }}
                    >
                        <h1 className="slide-title">{slide.title}</h1>
                    </div>
                ))}
            </div>

            {/* Flèches */}
            <button className="arrow left" onClick={prevSlide}>
                &#10094;
            </button>
            <button className="arrow right" onClick={nextSlide}>
                &#10095;
            </button>

            {/* Indicateurs */}
            <div className="indicators">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`indicator ${index === current ? "active" : ""}`}
                        onClick={() => setCurrent(index)}
                    ></div>
                ))}
            </div>
        </div>
    );
}
