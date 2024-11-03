// Define a helper type for Color
export type Color = "RED" | "ORANGE" | "YELLOW" | "GREEN" | "BLUE" | "PURPLE" | "BROWN" | "GREY" | "BLACK" | "WHITE" | "SILVER" | "PINK" | "OTHER";

// Interface for the Global Count Item
export interface GlobalCountItem {
    /** Partition Key for the global counts item, always `GLOBAL#COUNTS`. */
    PK: 'GLOBAL#COUNTS';

    /** Sort Key for the global counts item, also `GLOBAL#COUNTS`. */
    SK: 'GLOBAL#COUNTS';

    /** Type for this item, indicating it is a global count item. */
    Type: 'GlobalCount';

    /** A map of total counts for each color observed; key is the color name, value is the count. Example: { "Red": 1500, "Blue": 1000 } */
    Counts: Record<Color, number>;
}

// Interface for an Individual Observation Item
export interface ObservationItem {
    /** Fixed Partition Key for all observation items, always `OBSERVATION`. */
    PK: 'OBSERVATION';

    /** Sort Key for the observation, formatted as `<YYYY-MM-DD>#<Color>`. Example: `2024-10-28#Red` */
    SK: `${string}#${Color}`;

    /** Type for this item, indicating it is an observation. */
    Type: 'Observation';

    /** Color of the observed car. */
    Color: Color;

    /** Date of the observation in ISO string format (e.g., '2024-10-28'). */
    Date: string;

    /** Optional note about the observation. */
    Note?: string;

    /** Location where the observation occurred. */
    Location: Partial<GeolocationCoordinates>;
}
