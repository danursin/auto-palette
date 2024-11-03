"use client";

import { Color, GlobalCountItem } from "@/types";
import React, { useCallback, useEffect, useState } from "react";

import ColorChart from "./components/ColorChart";
import ObservationForm from "./components/Observation/ObservationForm";

const Home: React.FC = () => {
    const [counts, setCounts] = useState<GlobalCountItem["Counts"]>();

    useEffect(() => {
        (async () => {
            const response = await fetch("/api/global-counts");
            const data = (await response.json()) as GlobalCountItem;
            setCounts(data.Counts);
        })();
    }, []);

    const onColorSave = useCallback((color: Color) => {
        setCounts((prev) => {
            if (!prev) {
                return;
            }
            const newCounts = { ...prev };
            newCounts[color] = (newCounts[color] ?? 0) + 1;
            return newCounts;
        });
    }, []);

    return (
        <div>
            <header>
                <h1>Auto Palette</h1>
                <p>Count colors of automobiles out in the world!</p>
            </header>
            <main>
                {!counts && <p>Loading...</p>}
                {!!counts && (
                    <>
                        <ObservationForm onColorSave={onColorSave} />
                        <ColorChart data={counts} />
                    </>
                )}
            </main>
        </div>
    );
};

export default Home;
