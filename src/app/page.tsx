"use client";

import { APIResponse, SessionItem } from "@/types";
import { Button, Form, Modal, Table } from "semantic-ui-react";
import React, { useCallback, useEffect, useState } from "react";

import Link from "next/link";
import { SearchPlaceIndexForPositionResponse } from "@aws-sdk/client-location";

const Home: React.FC = () => {
    const [sessions, setSessions] = useState<SessionItem[]>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [note, setNote] = useState<string>();
    const [friendlyName, setFriendlyName] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const baseUrl = "/api/session/list";
            const query = new URLSearchParams({ take: "10" });
            const response = await fetch(`${baseUrl}?${query}`);
            const data = (await response.json()) as APIResponse<SessionItem[]>;
            if ("error" in data) {
                console.error("Failed to fetch data", data.error);
                return;
            }
            setSessions(data.data);
        })();
    }, []);

    const handleOnCreateNewSession = useCallback(async () => {
        setIsModalOpen(true);

        setLoading(true);
        const location = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const response = await fetch(`/api/geocode?lat=${location.coords.latitude}&lng=${location.coords.longitude}`);
        const data = (await response.json()) as APIResponse<SearchPlaceIndexForPositionResponse>;
        setLoading(false);

        if ("error" in data) {
            console.error("Failed to fetch data", data.error);
            return;
        }

        setFriendlyName(data.data.Results?.[0].Place?.Label ?? "Unknown Location");
    }, []);

    const handleOnSubmit = useCallback(async () => {}, []);

    if (!sessions) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Button icon="plus" type="button" content="Create Session" primary fluid onClick={handleOnCreateNewSession} />
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} closeIcon>
                <Modal.Header content="Create a Color Palette Session" />
                <Modal.Content>
                    <Form onSubmit={handleOnSubmit} loading={loading}>
                        <p>
                            Create a new session to track color counts in a particular environment. You can add notes to each session to
                            help you remember what was happening at the time.
                        </p>
                        <Form.Input
                            required
                            value={friendlyName || ""}
                            placeholder="Give the session a title"
                            onChange={(e, { value }) => setFriendlyName(value)}
                        />
                        <Form.TextArea
                            rows={3}
                            value={note || ""}
                            onChange={(e, { value }) => setNote(value as string)}
                            placeholder="Add any details you like about the situation..."
                        />
                        <Form.Button fluid icon="car" type="submit" content="Let's count colors!" color="green" basic />
                    </Form>
                </Modal.Content>
            </Modal>
            <Table selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell content="Name" />
                        <Table.HeaderCell content="Date" />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {sessions.map((session) => (
                        <Table.Row key={session.SK}>
                            <Table.Cell>
                                <Link href={`/session?key=${session.SK}`}>{session.FriendlyName}</Link>
                            </Table.Cell>
                            <Table.Cell content={new Date(session.Date).toLocaleDateString()} />
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    );
};

export default Home;
