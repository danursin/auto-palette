"use client";

import React, { Suspense } from "react";

import SessionDetails from "../components/SessionDetails";

const SessionPage: React.FC = () => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <SessionDetails />
        </Suspense>
    );
};

export default SessionPage;
