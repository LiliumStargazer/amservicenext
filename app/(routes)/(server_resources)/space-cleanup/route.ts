'use server'
import { NextResponse } from "next/server";
import fs from 'fs';

export async function DELETE(): Promise<NextResponse> {
    const temporaryPath: string = process.env.TMPDIR || '/tmp';
    const amServiceTempPath: string = `${temporaryPath}/tempAmService`;
    try {
        const amServiceTempPathExists: boolean = fs.existsSync(amServiceTempPath);
        if (amServiceTempPathExists) {
            fs.rmSync(amServiceTempPath, { recursive: true });
            return NextResponse.json({ message: 'Cartella pulita con successo' });
        } else {
            return NextResponse.json({ error: 'La cartella non esiste' }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}