import { Button, Grid } from "semantic-ui-react";
import React, { useCallback, useState } from "react";

import { Color } from "@/types";
import { ObservationPostRequest } from "../../api/observation/route";

const COLORS: Color[] = [
    "BLACK",
    "BLUE",
    "BROWN",
    "GREEN",
    "GREY",
    "ORANGE",
    //"OTHER",
    "PINK",
    "PURPLE",
    "RED",
    "SILVER",
    "WHITE",
    "YELLOW"
];

const colorTextMap: Partial<Record<Color, "black" | "white">> = {
    BLACK: "white",
    BLUE: "white",
    BROWN: "white",
    GREEN: "white",
    GREY: "white",
    ORANGE: "black",
    //OTHER: "black",
    PINK: "black",
    PURPLE: "white",
    RED: "white",
    SILVER: "black",
    WHITE: "black",
    YELLOW: "black"
};

interface ObservationFormProps {
    onColorSave: (color: Color) => void;
}

const ObservationForm: React.FC<ObservationFormProps> = ({ onColorSave }) => {
    const [position, setPosition] = useState<GeolocationPosition | null>(null);
    const onColorClick = useCallback(
        async (color: Color) => {
            onColorSave(color);
            let currentLocation = position;
            if (!currentLocation) {
                currentLocation = await new Promise<GeolocationPosition>((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
                setPosition(currentLocation);
            }
            const req: ObservationPostRequest = {
                color: color,
                location: {
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }
            };
            const response = await fetch("/api/observation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(req)
            });

            if (!response.ok) {
                alert("Failed to submit observation");
            }
        },
        [onColorSave, position]
    );

    return (
        <div>
            <Grid doubling columns={4} stackable>
                <Grid.Row>
                    {COLORS.map((color) => {
                        return (
                            <Grid.Column key={color} width={4} style={{ paddingBottom: "1em", minHeight: "60px" }}>
                                <Button
                                    type="button"
                                    fluid
                                    style={{ backgroundColor: color, color: colorTextMap[color], minHeight: "50px" }}
                                    onClick={() => onColorClick(color)}
                                >
                                    {color}
                                </Button>
                            </Grid.Column>
                        );
                    })}
                </Grid.Row>
            </Grid>
        </div>
    );
};

export default ObservationForm;
