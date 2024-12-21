import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

// Funzione per eseguire un comando e restituire l'output
export async function executeCommand(command: string): Promise<void> {
    try {
        const { stdout, stderr } = await execPromise(command);
        if (stdout) console.log('stdout:', stdout);
        if (stderr) console.error('stderr:', stderr);
    } catch (error) {
        console.error('Errore durante l\'esecuzione del comando:', error);
    }
}
