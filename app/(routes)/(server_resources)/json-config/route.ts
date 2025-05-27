'use server'
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
    const url = new URL(req.url);
    const serial = url.searchParams.get('serial');

    if (!serial) {
        return NextResponse.json({ error: 'Missing serial parameter' }, { status: 400 });
    }

    const apiUrl = `https://collaudo.amdistributori.it/api/v1/configurazione/${serial}`;
    const authHeader = `Basic ${btoa(`${process.env.JSONMAKER_USER}::${process.env.JSONMAKER_PASS}`)}`;

    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: authHeader,
                "Content-Type": "application/json",
            },
            cache: 'no-store' // Disabilita la cache per dati sempre freschi
        });

        if (!response.ok) {
            return NextResponse.json(`HTTP error! status: ${response.status}`, { status: 500 });
        }

        let data = await response.json();
        if (data.data) {
            data = data.data;
        }

        // Deserializzazione dei campi JSON annidati
        const parseNestedJson = (field: string) => {
            if (data[field] && typeof data[field] === 'string') {
                try {
                    data[field] = JSON.parse(data[field]);
                } catch (error) {
                    console.error(`Error parsing ${field}:`, error);
                    return NextResponse.json(`Error parsing ${field}: ${(error as Error).message}`, { status: 500 });
                }
            }
        };

        // Parsing per entrambi i campi JSON
        parseNestedJson('json');
        parseNestedJson('json_base');

        return NextResponse.json(data);

    } catch (error) {
        console.error('Error fetching configuration:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}