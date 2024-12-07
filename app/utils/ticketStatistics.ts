import {calculateDaysBetweenDates} from "@/app/utils/utils";
import { Technician, TechnicianStatistics, Ticket} from "@/app/types/types";

export const storedTechnicians: Technician[] = [
    { Manutentore: "Professional System", Active: true },
    { Manutentore: "AUTOMATIC MACHINES", Active: false },
    { Manutentore: "Emmeci di Marco Campanella", Active: true },
    { Manutentore: "Due Emme di Colleoni & Brignoli  s.n.c.", Active: true },
    { Manutentore: "Techno service di Marin Celestino", Active: true },
    { Manutentore: "Nuovafer Di Campione Antonio & C. SAS", Active: true },
    { Manutentore: "Elle Emme Sas Di Lingua Marco & C.", Active: true },
    { Manutentore: "SELF24H.COM", Active: true },
    { Manutentore: "TECNOSERVICE SNC DI FALASCHI E LEONCINI", Active: true },
    { Manutentore: "Its Di Artan Kushtaj", Active: true },
    { Manutentore: "VELLA ANGELO", Active: false },
    { Manutentore: "V.M.D.A. ITALY SRLS (saccotelli)", Active: true },
    { Manutentore: "Full Service di Pizzi domenico", Active: false },
    { Manutentore: "Mastinu Sebastiano", Active: false },
    { Manutentore: "NULL", Active: false },
    { Manutentore: "PGR SRLS di Granatelli", Active: true },
    { Manutentore: "Framer di Esposito Maria & C. SAS", Active: true },
    { Manutentore: "Salerno Stefano", Active: false },
    { Manutentore: "D G Vending sas di Marino Davide & C.", Active: false },
    { Manutentore: "Giacchino Salvatore", Active: false },
    { Manutentore: "Las Vegas SRL", Active: false },
    { Manutentore: "Pulci Riccardo", Active: false },
    { Manutentore: "DeNart Paolo (new wave)", Active: false },
    { Manutentore: "Ciarlo Mauro", Active: false },
    { Manutentore: "Tagliaferri Luca", Active: false },
    { Manutentore: "Mca Di Marco Campo & C SAS", Active: false },
    { Manutentore: "AUTOMATIC WORLD LAB DI DAVIDE CANEGLIAS", Active: false },
    { Manutentore: "Siciliano Salvatore", Active: true },
    { Manutentore: "Iacovone Emanuele", Active: false },
    { Manutentore: "MF Tecno assistenze di Mauro Frau", Active: false },
    { Manutentore: "Mori Anselmo (new wave)", Active: false },
    { Manutentore: "WIN SERVICE SRL di CROCETTI RAFFAELE", Active: true },
    { Manutentore: "Electric 3000 Antonio Fadda", Active: false },
    { Manutentore: "SISTEL SRL di BERTOCCI MASSIMO", Active: false },
    { Manutentore: "MG Impianti Di Mugnieco Natale", Active: false },
    { Manutentore: "Bosio Sistemi di Bosio Enrico & C", Active: false },
    { Manutentore: "CSMI Srls", Active: false },
    { Manutentore: "ASSENZA DI SEGNALE DI BRUNO MICHELE", Active: true },
    { Manutentore: "L'ARTE DEL FERRO DI ALESSANDRO STELLITANO", Active: false },
    { Manutentore: "GIOVANNI DE SALVIA", Active: true },
    { Manutentore: "Brix Sicurezza Filice Francesco", Active: true },
    { Manutentore: "Kiko s automatic machine services di Sollai Enrico", Active: true },
    { Manutentore: "TRIADE SERVICE SRL", Active: true },
    { Manutentore: "FIORE FRANCESCO", Active: true },
    { Manutentore: "ELETTROEDIL S.R.L. Monachesi Andrea", Active: true },
    { Manutentore: "0", Active: false },
    { Manutentore: "Weimar Vincenzo", Active: true },
    { Manutentore: "AF TecnoImpianti", Active: true },
    { Manutentore: "SICUREZZA E DOMOTICA DI CANALE GIUSEPPE", Active: true },
]

export const filterTechnicianFromTickets = (data: Ticket[]): string[] => {
    return data
        .map((ticket) => ticket.Manutentore)
        .filter((Manutentore, index, self) => self.indexOf(Manutentore) === index);
}

export const filterOnlyActiveTechnicians = (technicians: string[], storedTechnicians: Technician[]): string[] => {
    return technicians.filter((technician) => {
        const storedTechnician = storedTechnicians.find((storedTechnician) => storedTechnician.Manutentore === technician);
        return storedTechnician?.Active;
    });
}

export const filterTicketsAndAddTTR = (mergedParsedTickets: Ticket[], activeTechnicians: string[], isOpen: boolean): Ticket[] => {
    const typesToExclude = ["No Report", "Telefonico", "TroubleShooting", "--ND--", "Completamento Ordine"];
    const seenNrTickets = new Set<string>();

    return mergedParsedTickets.filter(ticket => {
        const hasUniqueNrTicket = !seenNrTickets.has(ticket['Nr Ticket']);
        const hasValidTipoTicket = !typesToExclude.includes(ticket['Tipo ticket']);
        const isActiveTechnician = activeTechnicians.includes(ticket.Manutentore);
        const hasOpenStatus = isOpen ? (
            ticket['Stato ticket'] === 'Open' ||
            ticket['Stato ticket'] === 'Attesa materiale' ||
            ticket['Stato ticket'] === 'Sospeso' ||
            ticket['Stato ticket'] === 'Preventivo - In Attesa Risposta'
        ) : true;

        if (hasUniqueNrTicket && hasValidTipoTicket && isActiveTechnician && hasOpenStatus) {
            seenNrTickets.add(ticket['Nr Ticket']);

            let endDate = ticket['Data chiusura'];
            if (endDate === "" || endDate === "NULL" || endDate === null || endDate === undefined) {
                const today = new Date();
                endDate = today.toISOString().split('T')[0]; // Formatta la data in formato 'yyyy-mm-dd'
            }

            ticket.TimeToRestore = calculateDaysBetweenDates(ticket['data ticket'], endDate);

            return true;
        }
        return false;
    });
}

export const createStatistics = (tickets: Ticket[], activeTechnicians: string[]): TechnicianStatistics[] => {
    const stats = tickets.reduce<TechnicianStatistics[]>((acc, ticket) => {
        if (activeTechnicians.includes(ticket.Manutentore)) {

            const foundTechnician = acc.find(t => t.Manutentore === ticket.Manutentore);

            if (foundTechnician) {
                foundTechnician.totalTickets += 1;

                if (ticket.TimeToRestore! <= 3) {
                    foundTechnician.ticketsWithTimeToRestoreLessOrEqualThree = (foundTechnician.ticketsWithTimeToRestoreLessOrEqualThree || 0) + 1;
                }

                if (ticket.TimeToRestore! >= 4 && ticket.TimeToRestore! <= 5) {
                    foundTechnician.ticketsWithTimeToRestoreBetweenFourAndFive = (foundTechnician.ticketsWithTimeToRestoreBetweenFourAndFive || 0) + 1;
                }

                if (ticket.TimeToRestore! > 5) {
                    foundTechnician.ticketsWithTimeToRestoreGreaterThanFive = (foundTechnician.ticketsWithTimeToRestoreGreaterThanFive || 0) + 1;
                }

                foundTechnician.totalTimeToRestore = (foundTechnician.totalTimeToRestore || 0) + ticket.TimeToRestore!;
            } else {
                acc.push({
                    Manutentore: ticket.Manutentore,
                    totalTickets: 1,
                    totalTimeToRestore: ticket.TimeToRestore!,
                    ticketsWithTimeToRestoreLessOrEqualThree: ticket.TimeToRestore! <= 3 ? 1 : 0,
                    ticketsWithTimeToRestoreBetweenFourAndFive: (ticket.TimeToRestore! >= 4 && ticket.TimeToRestore! <= 5) ? 1 : 0,
                    ticketsWithTimeToRestoreGreaterThanFive: ticket.TimeToRestore! > 5 ? 1 : 0
                });
            }
        }
        return acc;
    }, []);

    stats.forEach(technician => {

        technician.MTTR = Number ((technician.totalTimeToRestore / technician.totalTickets).toFixed(2) ) ;

        console.log(typeof ( (technician.totalTimeToRestore / technician.totalTickets).toFixed(2) ) );

        // Calcola la percentuale di ticket con TimeToRestore <= 3
        technician.percentageOfTicketsWithTimeToRestoreLessOrEqualThree = Number( ((technician.ticketsWithTimeToRestoreLessOrEqualThree / technician.totalTickets) * 100).toFixed(2) ) ;
        // Calcola la percentuale di ticket con TimeToRestore >= 4 e <= 5
        technician.percentageOfTicketsWithTimeToRestoreBetweenFourAndFive = Number( ((technician.ticketsWithTimeToRestoreBetweenFourAndFive / technician.totalTickets) * 100).toFixed(2) ) ;
        // Calcola la percentuale di ticket con TimeToRestore > 5
        technician.percentageOfTicketsWithTimeToRestoreGreaterThanFive = Number ( ((technician.ticketsWithTimeToRestoreGreaterThanFive / technician.totalTickets) * 100).toFixed(2) ) ;
    });

    return stats;
}