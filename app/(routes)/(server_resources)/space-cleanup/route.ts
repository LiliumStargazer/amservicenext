'use server'
import { NextResponse } from "next/server";
import fs from 'fs';
import path from "path";

export async function DELETE(): Promise<NextResponse> {
    const temporaryPath: string = process.env.TMPDIR || '/tmp';
    const amServiceTempPath: string = `${temporaryPath}/tempAmService/`;
    try {
        const amServiceTempPathExists: boolean = fs.existsSync(amServiceTempPath);
        if (amServiceTempPathExists) {
            const entries = fs.readdirSync(amServiceTempPath);
            for (const entry of entries) {
                const entryPath = path.join(amServiceTempPath, entry); 
                fs.rmSync(entryPath, { recursive: true, force: true });
            }
            return NextResponse.json({ message: 'Contenuto della cartella pulito con successo' });
        } else {
            return NextResponse.json({ error: 'La cartella non esiste' }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}