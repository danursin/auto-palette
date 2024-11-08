// Define a helper type for Color
export type Color = "RED" | "ORANGE" | "YELLOW" | "GREEN" | "BLUE" | "PURPLE" | "BROWN" | "GREY" | "BLACK" | "WHITE" | "SILVER" | "PINK";

export type SessionItem = {
    /** Partition Key, fixed to "SESSION" */
    PK: "SESSION";
    /** Sort Key, formatted as "SESSION#<ISO Date>" */
    SK: `SESSION#${string}`;
    /** Item type, fixed to "Session" */
    Type: "SESSION";
    /** Location metadata for the session */
    Location?: Partial<GeolocationCoordinates>;
    /** Count of observations in the session */
    ObservationCount: number;
    /** Human-readable name for the session */
    FriendlyName: string;
    /** Map holding counts of cars by color for the session */
    ColorMap: { [color: string]: number };
    /** ISO date of the session, same date as in SK */
    Date: string;
    /** Additional description of the session */
    Description: string;
};

export type APIResponse<T> = { data: T } | { error: string }