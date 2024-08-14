'use server'
import { NextResponse } from "next/server";
import * as Sentry from '@sentry/nextjs';
import fs from 'fs';

export async function DELETE() {
    const temporaryPath = process.env.TMPDIR || '/tmp';
    const amServiceTempPath = `${temporaryPath}/tempAmService`;
    try {
        const amServiceTempPathExists = fs.existsSync(amServiceTempPath);
        if (amServiceTempPathExists) {
            fs.rmSync(amServiceTempPath, { recursive: true });
            return NextResponse.json({ message: 'Cartella pulita con successo' });
        } else {
            Sentry.captureException(new Error('La cartella non esiste'));
            return NextResponse.json({ error: 'La cartella non esiste' });
        }
    } catch (error) {
        Sentry.captureException(error);
        return NextResponse.json({ error: 'Errore nella pulizia della cartella' });
    }
}