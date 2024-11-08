import { Button, Grid } from "semantic-ui-react";
import { Color, SessionItem } from "@/types";
import React, { useCallback } from "react";

import { ObservationPostRequest } from "../../api/session/observation/route";

// const COLORSArray: Color[][] = [
//     ["BLACK", "BLUE", "BROWN"],
//     ["GREEN", "GREY", "ORANGE"],
//     ["PINK", "PURPLE", "RED"],
//     ["SILVER", "WHITE", "YELLOW"]
// ];

const COLORSArray: Color[][] = [
    ["RED", "ORANGE", "YELLOW"],
    ["GREEN", "BLUE", "PURPLE"],
    ["BROWN", "GREY", "BLACK"],
    ["WHITE", "SILVER", "PINK"]
];

const colorTextMap: Partial<Record<Color, "black" | "white">> = {
    BLACK: "white",
    BLUE: "white",
    BROWN: "white",
    GREEN: "white",
    GREY: "white",
    ORANGE: "black",
    PINK: "black",
    PURPLE: "white",
    RED: "white",
    SILVER: "black",
    WHITE: "black",
    YELLOW: "black"
};

interface ObservationFormProps {
    session: SessionItem;
    onColorSave: (color: Color) => void;
}

const ObservationForm: React.FC<ObservationFormProps> = ({ session, onColorSave }) => {
    const onColorClick = useCallback(
        async (color: Color) => {
            onColorSave(color);
            const req: ObservationPostRequest = {
                color: color,
                key: session.SK
            };
            const response = await fetch("/api/session/observation", {
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
        [onColorSave, session.SK]
    );

    return (
        <Grid>
            {COLORSArray.map((row, index) => {
                return (
                    <Grid.Row key={index} columns={3} stretched>
                        {row.map((color) => {
                            const count = session.ColorMap[color];
                            return (
                                <Grid.Column key={color} style={{ paddingBottom: "1em", minHeight: "60px" }}>
                                    <Button
                                        type="button"
                                        fluid
                                        style={{ backgroundColor: color, color: colorTextMap[color], minHeight: "50px" }}
                                        onClick={() => onColorClick(color)}
                                    >
                                        {color}
                                        <br />
                                        {count ?? 0}
                                    </Button>
                                </Grid.Column>
                            );
                        })}
                    </Grid.Row>
                );
            })}
        </Grid>
    );
};

export default ObservationForm;
