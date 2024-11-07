"use client";

import { APIResponse, Color, SessionItem } from "@/types";
import React, { useEffect, useState } from "react";

import ColorChart from "../components/ColorChart";
import { Divider } from "semantic-ui-react";
import ObservationForm from "../components/Observation/ObservationForm";
import { useRouter } from "next/router";

const SessionDetails: React.FC = () => {
    const [session, setSession] = useState<SessionItem>();
    const router = useRouter();
    const { key } = router.query;

    useEffect(() => {
        (async () => {
            const baseUrl = "/api/session/get";
            const query = new URLSearchParams({ key: key as string });
            const response = await fetch(`${baseUrl}?${query}`);
            const data = (await response.json()) as APIResponse<SessionItem>;
            if ("error" in data) {
                console.error("Failed to fetch data", data.error);
                return;
            }
            setSession(data.data);
        })();
    }, [key]);

    const onColorSave = (color: Color) => {
        if (!session) {
            return;
        }
        const updatedSession = {
            ...session,
            ColorMap: {
                ...session.ColorMap,
                [color]: (session.ColorMap[color] || 0) + 1
            }
        };
        setSession(updatedSession);
    };

    return (
        <div>
            <main>
                {!session && <p>Loading...</p>}

                {!!session && (
                    <>
                        <ObservationForm session={session} onColorSave={onColorSave} />
                        <Divider />
                        <ColorChart data={session.ColorMap} />
                    </>
                )}
            </main>
        </div>
    );
};

export default SessionDetails;
