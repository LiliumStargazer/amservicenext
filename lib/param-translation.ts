
const EnumParam = {

    "Enable": { category: "POS", name: "Abilita Pax" },
    "SpendingDefaultTerminal": { category: "POS", name: "Terminale di default per spending" },
    "EnableCardTransactionMono": { category: "POS", name: "Abilita acquisto prodotti di monopolio" },
    "DisableCardTransactionGv": { category: "POS", name: "Inibisci acquisto Gratta e Vinci" },
    "MincCardTransactionMono": { category: "POS", name: "Importo minimo per acquisto prodotti di monopolio" },
    "MinCardTransactionnonMono": { category: "POS", name: "Importo minimo per acquisto prodotti NON di monopolio" },
    "MaxCardTransaction": { category: "POS", name: "Importo massimo per acquisto prodotti" },
    "LockReceiptPrint": { category: "POS", name: "Rimozione stampa ricevuta transazione" },
    "SerialNumber": { category: "POS", name: "Numero di serie" },
    "TerminalId": { category: "POS", name: "Id terminale" },
    "IpcentroServizi": { category: "POS", name: "Indirizzo ip centro servizi" },
    "PortaCentroServizi": { category: "POS", name: "Porta centro servizi" },
    "IdCertificato": { category: "POS", name: "Id certificato" },
    "CodAzienda": { category: "POS", name: "Codice azienda" },
    "ProtTrasporto": { category: "POS", name: "Protocollo trasporto" },
    "IgnoreTechnicalParameter": { category: "POS", name: "Ignora parametri tecnici" },
    "BillPayment": { category: "Funzionalità Aggiuntive", name: "Abilita Bill Payment" },
    "Spending": { category: "Funzionalità Aggiuntive", name: "Abilita spending" },
    "IdCertificatopax": { category: "Certificati", name: "Id certificato PAX" },
    "TipoCertificato": { category: "Certificati", name: "Tipo certificato" },
    "Idpersonalizzazione": { category: "Certificati", name: "Id personalizzazione PAX" },
    "Personalizzazione": { category: "Certificati", name: "Personalizzazione" },
    "CodicePos": { category: "Lis", name: "Codice POS servizi LIS" },
    "OnlineCryptedPassword": { category: "Lis", name: "PIN servizi LIS" },
    "Onlineservicedisabled": { category: "Lis", name: "Disabilita servizi LIS" },
    "Lisprintonerror": { category: "Lis", name: "Scontrino su transazione fallita LIS" },
    "SatispayEnable": { category: "Satispay", name: "Proponi Satispay" },
    "SatispayCryptedoken": { category: "Satispay", name: "Token" },
    "SatispayShortToken": { category: "Satispay", name: "Codice di attivazione" },
    "SatispayCryptedKeyId": { category: "Satispay", name: "KeyId" },
    "BorsellinoEnabled": { category: "Borsellino", name: "Abilita borsellino elettronico" },
    "BorsellinoValueLimitCentesimi": { category: "Borsellino", name: "Limite borsellino (€)" },
    "AbilitaVenditore2": { category: "Configurazione", name: "Abilita venditore automatico 2.0- funz_venditore "},
    "AbilitaInvioGiorno": { category: "Configurazione", name: "Abilita invio giornaliero" },
    "AbilitaInvioSettimana": { category: "Configurazione", name: "Abilita invio settimanale" },
    "AbilitaInvioMese": { category: "Configurazione", name: "Abilita invio mensile" },
    "OrarioInvioVenditore": { category: "Configurazione", name: "Orario invio" },
    "EsauritoVisibile": { category: "Configurazione", name: "Segnala prodotto esaurito" },
    "TimerProdottoAlternativo": { category: "Configurazione", name: "Tempo prodotto alternativo (sec)" },
    "ProponiAlternativa": { category: "Configurazione", name: "Proponi alternativa su prodotto esaurito - fisarmonica" },
    "AlternativaGiocoFumo": { category: "Configurazione", name: "Proponi alternativa Tabacco/Gioco" },
    "EnablePromoProximity": { category: "Configurazione", name: "Proponi offerte su presenza cliente - Affaregiorno" },
    "EnableProductAudio": { category: "Configurazione", name: "Riproduci name prodotto sulla scelta" },
    "EnableScontrinoRicaricabile": { category: "Scontrino", name: "Abilita scontrino ricaricabile" },
    "EnableSpeechToText": { category: "Comando Vocale", name: "Abilita comandi vocali" },
    "SpeechPartialResults": { category: "Comando Vocale", name: "Abilita scrittura in tempo reale" },
    "Sttprossimity": { category: "Comando Vocale", name: "Avvia processo su sensore di prossimità" },
    "AudioOnSpeech": { category: "Comando Vocale", name: "Abilita audio su sensore di prossimità" },
    "Speechautostartsecondtime": { category: "Comando Vocale", name: "Abilita avvio automatico dopo risposta" },
    "SpeechTimeoutForVideo": { category: "Comando Vocale", name: "Timeout riavvio video (sec)" },
    "SpeechMaxRetrySilence": { category: "Comando Vocale", name: "Numero tentativi su silenzio" },
    "SpeechMaxRetryBad": { category: "Comando Vocale", name: "Numero tentativi su parola non capita" },
    "SpeechMaxRetryNotInDa": { category: "Comando Vocale", name: "numero tentativi su prodotto non trovato" },
    "Speechoffsetposms": { category: "Comando Vocale", name: "offset positivo avvio servizio (ms)" },
    "Speechoffsetnegms": { category: "Comando Vocale", name: "offset negativo avvio servizio (ms)" },
    "SpeechMinChar": { category: "Configurazione", name: "numero minimo caratteri" },
    "GestionaleCryptedToken": { category: "Gestionale", name: "token gestionale" },
    "TipoGestionale": { category: "Gestionale", name: "marca gestionale" },
    "VideoEnable": { category: "Video", name: "abilita video pubblicitari" },
    "EnableVideoBroadcastEst": { category: "Video", name: "abilita visual broadcast" },
    "EnableFloorBanner": { category: "Video", name: "abilita banner basso" },
    "TempoAlarm": { category: "Configurazione", name: "tempo sirena allarme (sec)" },
    "TempoAttesaResto": { category: "Configurazione", name: "tempo attesa resto (sec)" },
    "DisableCarrello": { category: "Configurazione", name: "disabilita carrello" },
    "NumPedate": { category: "Configurazione", name: "numero massimo colpi" },
    "TempoPedate": { category: "Configurazione", name: "tempo filtro colpi (sec)" },
    "SogliaAccelerometro": { category: "Configurazione", name: "soglia accelerometro" },
    "Remotoscassoenabled": { category: "Configurazione", name: "combinatore remoto su sospetto di scasso abilitato" },
    "TempoCombinatoreRemoto": { category: "Configurazione", name: "tempo filtro combinatore remoto (sec)" },
    "DisablePhotoAlarm": { category: "Configurazione", name: "disabilita allarme fotocellule" },
    "email1": { category: "Configurazione", name: "email 1" },
    "email2": { category: "Configurazione", name: "email 2" },
    "email3": { category: "Configurazione", name: "email 3" },
    "email4": { category: "Configurazione", name: "email 4" },
    "AutoPricesEnabled": { category: "Configurazione", name: "abilita prezzi automatici" },
    "Reversepanelorder": { category: "Configurazione", name: "inverti ordine pannelli" },
    "NetflixSound": { category: "Configurazione", name: "abilita suono di benvenuto" },
    "CheckExitProg": { category: "Configurazione", name: "autodiagnosi: verifica errori su chiusura porta" },
    "AudioOnInput": { category: "Configurazione", name: "abilita audio su cambio stato sensori", "function": "funz_autodiagnosi" },
    "AudioMicroProduct": { category: "Configurazione", name: "abilita colonna parlante", "function": "funz_colparlante" },
    "Disablecarrello": { category: "Configurazione", name: "disabilita proposta prodotti a fine vendita (carrello)" },
    "TempoAperturaCassetto": { category: "Configurazione", name: "tempo apertura sportello (sec)" },
    "EbableTabaInTask": { category: "Configurazione", name: "abilita applicazione TabainTask" },
    "RestoMaxCommon": {category: "Configurazione", name: "resto massimo comune"},
    "TempoAcquistoCommon": {category: "Configurazione", name: "tempo accettazione denaro (sec)"},
    "TimerSceltaProdotto": {category: "Configurazione", name: "tempo scelta prodotto (sec)"},
    "TimerConvalidaEta": {category: "Configurazione", name: "tempo convalida età (sec)"},
    "TimerConfermaProdotto": {category: "Configurazione", name: "tempo conferma prodotto (sec)"},
    "TimerMetodiPagamento": {category: "Configurazione", name: "tempo scelta metodo di pagamento (sec)"},
    "TimerComeProseguire": {category: "Configurazione", name: "tempo scelta come proseguire (sec)"},
    "Delayerogazioneprodotto": {category: "Configurazione", name: "ritardo erogazione prodotto (sec)"},
    "Azione1": {category: "Configurazione", name: "scontrino azione riga 1"},
    "Azione2": {category: "Configurazione", name: "scontrino azione riga 2"},
    "Azione3": {category: "Configurazione", name: "scontrino azione riga 3"},
    "ScontrinoNote1": {category: "Scontrino", name: "scontrino note riga 1"},
    "ScontrinoNote2": {category: "Scontrino", name: "scontrino note riga 2"},
    "ScontrinoNote3": {category: "Scontrino", name: "scontrino note riga 3"},
    "Righeavanzamentocarta": {category: "Configurazione", name: "righe avanzamento carta"},
    "Tg2460jamdelay": {category: "Configurazione", name: "tg2460: ritardo filtro jam (sec)"},
    "Excludetg2460antijam": {category: "Configurazione", name: "tg2460: esclusione movimento jam"},
    "Tg2460recuperocartaimmediato": {category: "Configurazione", name: "tg2460: recupero carta immediato"},
    "PwdProgrammazione": {category: "Configurazione", name: "password accesso programmazione"},
    "IDImprontaSpeciale1": {category: "Impronte", name: "id impronta speciale 1"},
    "IDImprontaSpeciale2": {category: "Impronte", name: "id impronta speciale 2"},
    "IDImprontaSpeciale3": {category: "Impronte", name: "id impronta speciale 3"},
    "IDImprontaSpeciale4": {category: "Impronte", name: "id impronta speciale 4"},
    "Idimprontaspeciale5": {category: "Impronte", name: "id impronta speciale 5"},
    "Idimprontaspecialedip1": {category: "Impronte", name: "id impronta speciale dipendente 1"},
    "Idimprontaspecialedip2": {category: "Impronte", name: "id impronta speciale dipendente 2"},
    "Idimprontaspecialedip3": {category: "Impronte", name: "id impronta speciale dipendente 3"},
    "Idimprontaspecialedip4": {category: "Impronte", name: "id impronta speciale dipendente 4"},
    "Idimprontaspecialedip5": {category: "Impronte", name: "id impronta speciale dipendente 5"},
    "QrImageFile" :{category: "Corrispettivi", name: "file immagine QR"},
    "Cfspeciale1": {category: "Configurazione", name: "tessera speciale 1"},
    "Cfspeciale2": {category: "Configurazione", name: "tessera speciale 2"},
    "Cfspeciale3": {category: "Configurazione", name: "tessera speciale 3"},
    "Cfspeciale4": {category: "Configurazione", name: "tessera speciale 4"},
    "Cfspeciale5": {category: "Configurazione", name: "tessera speciale 5"},
    "SensPresenzaEnable": {category: "Ingressi-Uscite", name: "abilita gestione sensore presenza"},
    "ProxyFiltType": {category: "Ingressi-Uscite", name: "tipo filtro sensore presenza"},
    "ProxyDistLimit": {category: "Ingressi-Uscite", name: "distanza presenza persona [mm]"},
    "ProxyTimeIn": {category: "Ingressi-Uscite", name: "tempo minimo presenza persona [ms]"},
    "ProxyTimeOut": {category: "Ingressi-Uscite", name: "tempo minimo assenza persona [ms]"},
    "RipristinoAutomaticoSpirali": {category: "Ingressi-Uscite", name: "ripristino automatico spirali"},
    "TemperaturaFanOn": {category: "Ingressi-Uscite", name: "temperatura accensione ventole [°C]"},
    "TemperaturaFanOff": {category: "Ingressi-Uscite", name: "temperatura spegnimento ventole [°C]"},
    "OrarioAccensioneDeluxe": {category: "Ingressi-Uscite", name: "orario accensione pannello [Manuale]"},
    "OrarioSpegnimentoDeluxe": {category: "Ingressi-Uscite", name: "orario spegnimento pannello [Manuale]"},
    "Ignorephotomaster": {category: "Luci", name: "fotocellule assenti"},
    "SmsAccount": {category: "Skebby", name: "account SMS"},
    "SmsCryptedPassword": {category: "Skebby", name: "password SMS"},

    "Bitsperled": {category: "Luci", name: "bits per LED"},
    "Wrgbtype": {category: "Luci", name: "tipo WRGB"},
    "Numled": {category: "Luci", name: "numero LED"},
    "Piecesize": {category: "Luci", name: "dimensione cluster"},
    "Brightidle": {category: "Luci", name: "luminosità utente non presente min. 0-max. 255"},
    "Brightpres": {category: "Luci", name: "luminosità utente presente min. 0-max. 255"},
    "Brightseg": {category: "Luci", name: "luminosità segmenti min. 0-max. 255"},
    "Effsegenabled": {category: "Luci", name: "tipo effetto periferiche"},
    "Effsegspeed": {category: "Luci", name: "velocità effetto periferiche"},
    "Color1seg": {category: "Luci", name: "colore 1 segmento periferica"},
    "Color2seg": {category: "Luci", name: "colore 2 segmento periferica"},
    "Color3seg": {category: "Luci", name: "colore 3 segmento periferica"},
    "Effbaseidle": {category: "Luci", name: "tipo effetto segmento base idle"},
    "Effbaseidlespeed": {category: "Luci", name: "velocità effetto segmento base idle"},
    "Optionbaseidle": {category: "Luci", name: "opzione effetto base idle"},
    "Color1baseidle": {category: "Luci", name: "colore 1 segmento base idle"},
    "Color2baseidle": {category: "Luci", name: "colore 2 segmento base idle"},
    "Color3baseidle": {category: "Luci", name: "colore 3 segmento base idle"},
    "Effbasepres": {category: "Luci", name: "tipo effetto segmento base persona presente"},
    "Effbasepresspeed": {category: "Luci", name: "velocità effetto segmento base persona presente"},
    "Color1basepres": {category: "Luci", name: "colore 1 segmento base persona presente"},
    "Color2basepres": {category: "Luci", name: "colore 2 segmento base persona presente"},
    "Color3basepres": {category: "Luci", name: "colore 3 segmento base persona presente"},
    "Cassprelstart": {category: "Luci", name: "inizio cassetto prelievo"},
    "Cassprelend": {category: "Luci", name: "fine cassetto prelievo"},
    "Micstart": {category: "Luci", name: "inizio microfono"},
    "Micend": {category: "Luci", name: "fine microfono"},

    "Moneystart": { category: "Luci", name: "inizio accettazione denaro" },
    "Moneyend": { category: "Luci", name: "fine accettazione denaro" },
    "Money2start": { category: "Luci", name: "inizio accettazione denaro 2" },
    "Money2end": { category: "Luci", name: "fine accettazione denaro 2" },
    "Agestart": { category: "Luci", name: "inizio convalida età" },
    "Ageend": { category: "Luci", name: "fine convalida età" },
    "Prnstart": { category: "Luci", name: "inizio stampante" },
    "Prnend": { category: "Luci", name: "fine stampante" },
    "Virtmoneystart": { category: "Luci", name: "inizio pagamenti virtuali" },
    "Virtmoneyend": { category: "Luci", name: "fine pagamenti virtuali" },
    "Gvstart": { category: "Luci", name: "inizio G&V" },
    "Gvend": { category: "Luci", name: "fine G&V" },
    "Cassslavestart": { category: "Luci", name: "inizio cassetto slave" },
    "Cassslaveend": { category: "Luci", name: "fine cassetto slave" },
    "Sl1bitsperled": { category: "Luci", name: "bits per LED (Slave Tabacco 1)" },
    "Sl1wrgbtype": { category: "Luci", name: "tipo WRGB (Slave Tabacco 1)" },
    "Sl1numled": { category: "Luci", name: "numero LED (Slave Tabacco 1)" },
    "Sl1piecesize": { category: "Luci", name: "Dimensione cluster (Slave Tabacco 1)" },
    "Sl2bitsperled": { category: "Luci", name: "Bits per LED (Slave Tabacco 2)" },
    "Sl2wrgbtype": { category: "Luci", name: "Tipo WRGB" },
    "DHCPEnabled": { category: "Rete", name: "Abilita DHCP" },
    "IPAddress": { category: "Rete", name: "Indirizzo IP per IP statico" },
    "SubnetMask": { category: "Rete", name: "Maschera di sottorete per IP statico" },
    "Telefono1" : { category: "Skebby", name: "Telefono 1" },
    "Telefono2" : { category: "Skebby", name: "Telefono 1" },
    "Telefono3" : { category: "Skebby", name: "Telefono 1" },
    "Telefono4" : { category: "Skebby", name: "Telefono 1" },
    "GatewayAddress": { category: "Rete", name: "Indirizzo gateway per IP statico" },
    "DnsPrimary": { category: "Rete", name: "DNS primario per IP statico" },
    "DnsSecondary": { category: "Rete", name: "DNS secondario per IP statico" },
    "FtpUrl": { category: "Rete", name: "URL connessione FTP" },
    "FtpPort": { category: "Rete", name: "Porta connessione FTP" },
    "EnableBrightnessDayNight": { category: "Display", name: "Abilita gestione luminosità" },
    "LumProfiloGiorno": { category: "Display", name: "Luminosità profilo giorno" },
    "LumProfiloNotte": { category: "Display", name: "Luminosità profilo notte" },
    "Inviocorrispettivomode": { category: "Corrispettivi", name: "Modalità di invio corrispettivo" },
    "AdeUniqueId": { category: "Corrispettivi", name: "Codice univoco" },
    "AdeLat": { category: "Corrispettivi", name: "Latitudine" },
    "AdeLon": { category: "Corrispettivi", name: "Longitudine" },
    "LookappUrl": { category: "Corrispettivi", name: "URL Web Services" },
    "EnableCassettoMot": { category: "Ingressi-Uscite", name: "Abilita cassetto motore" },
    "RigheAvanzamentoCarta": { category: "Scontrino", name: "Righe avanzamento carta" },

    "FingerEnabled": { category: "Configurazione", name: "Abilita impronta digitale" },
    "Fingerproductproposedmode": { category: "Configurazione", name: "Modalità di proposta prodotto con impronta digitale" },
    "Matricola": { category: "Configurazione", name: "Matricola distributore" },
    "MachineModel": { category: "Configurazione", name: "Modello distributore" },
    "Simularicariche": { category: "Configurazione", name: "Simula servizi LIS" },
    "Devmotorparam.tempolampadaerogazione": { category: "Soglie", name: "Tempo lampada erogazione [sec]" },
    "Devmotorparam.sogliai0ma": { category: "Soglie", name: "Soglia corrente I0 [mA]" },
    "Devmotorparam.sogliat0ms": { category: "Soglie", name: "Tempo soglia 0 [ms]" },
    "Devmotorparam.sogliai1ma": { category: "Soglie", name: "Soglia corrente I1 [mA]" },
    "Devmotorparam.sogliat1ms": { category: "Soglie", name: "Tempo soglia 1 [ms]" },
    "Devmotorparam.sogliai2ma": { category: "Soglie", name: "Soglia corrente I2 [mA]" },
    "Devmotorparam.sogliat2ms": { category: "Soglie", name: "Tempo soglia 2 [ms]" },
    "Devmotorparam.sogliai3ma": { category: "Soglie", name: "Soglia corrente I3 [mA]" },
    "Devmotorparam.tempociclo": { category: "Soglie", name: "Tempo ciclo massimo [sec]" },
    "Devmotorparam.iminimama": { category: "Soglie", name: "Soglia corrente fermo [mA]" },
    "Spiraliinterne": { category: "Soglie", name: "Spirali interne" },
    "Devmotorparam.sogliai0maspiint": { category: "Soglie", name: "Soglia corrente I0 [mA] per Spirali Interne" },
    "Devmotorparam.sogliat0msspiint": { category: "Soglie", name: "Tempo soglia 0 [ms] per Spirali Interne" },
    "Devmotorparam.sogliai1maspiint": { category: "Soglie", name: "Soglia corrente I1 [mA] per Spirali Interne" },
    "Devmotorparam.sogliat1msspiint": { category: "Soglie", name: "Tempo soglia 1 [ms] per Spirali Interne" },
    "Devmotorparam.sogliai2maspiint": { category: "Soglie", name: "Soglia corrente I2 [mA] per Spirali Interne" },
    "Devmotorparam.tempociclospiint": { category: "Soglie", name: "Tempo ciclo massimo [sec] per Spirali Interne" },
    "Devmotorparam.iminimamaspiint": { category: "Soglie", name: "Soglia corrente fermo [mA] per Spirali Interne" },
    "Devfrigoparam.frigomancante": { category: "Frigo", name: "Slave disattiva frigo" },
    "Devfrigoparam.temperaturalavoro": { category: "Frigo", name: "Temperatura frigo [°C]" },
    "Devfrigoparam.isteresi": { category: "Frigo", name: "Isteresi frigo [°C]" },
    "Devfrigoparam.periodosbrinamento": { category: "Frigo", name: "Periodo sbrinamento [min]" },
    "Devfrigoparam.duratasbrinamento": { category: "Frigo", name: "Durata sbrinamento [min]" },
    "Devfrigoparam.temperaturaallarmecondensatore": { category: "Frigo", name: "Temperatura allarme condensatore [°C]" },
    "Devfrigoparam.temperaturawarningcondensatore": { category: "Frigo", name: "Temperatura warning condensatore [°C]" },
    "Devfrigoparam.deltatemperaturaallarmecondensatore": { category: "Frigo", name: "Delta temperatura allarme condensatore [°C]" },
    "Devfrigoparam.frigopolltime": { category: "Frigo", name: "Tempo campionamento diagnostica frigo [min]" },
    "Devfrigoparam.frigoalarmholdofftime": { category: "Frigo", name: "Tempo limite allarme frigo [min]" },
    "Devfrigoparam.deltaalarm": { category: "Frigo", name: "Limite allarme frigo [°C]" },
    "Devfrigoparam.sogliai0ma": { category: "Frigo", name: "Soglia corrente I0 [mA]" },
    "Devfrigoparam.sogliat0ms": { category: "Frigo", name: "Tempo soglia 0 [ms]" },
    "Devfrigoparam.sogliai1ma": { category: "Frigo", name: "Soglia corrente I1 [mA]" },
    "Devfrigoparam.tempociclo": { category: "Frigo", name: "Tempo ciclo massimo [sec]" },
    "Devfrigoparam.iminimama": { category: "Frigo", name: "Soglia corrente fermo [mA]" },
    "Adimacparam.temperaturalavoro": { category: "Frigo", name: "Temperatura lavoro [°C]" },
    "Adimacparam.isteresi": { category: "Frigo", name: "Isteresi [°C]" },
    "Adimacparam.periodosbrinamento": { category: "Frigo", name: "Periodo sbrinamento [h]" },
    "Adimacparam.duratasbrinamento": { category: "Frigo", name: "Durata sbrinamento [min]" },
    "Sensneggv": { category: "Frigo", name: "Logica fine corsa Gv" },
    "SogliaI0mAGv": { category: "Gv", name: "Soglia corrente I0 [mA] Gv" },
    "SogliaT0mSGv": { category: "Gv", name: "Tempo soglia 0 [ms] Gv" },
    "SogliaI1mAGv": { category: "Gv", name: "Soglia corrente I1 [mA] Gv" },
    "EnergySaving": { category: "Configurazione", name: "Abilita risparmio energetico" },
    "Defaultvendlanguage": { category: "Lingua", name: "Lingua base di vendita" },
    "LogistaAbil": { category: "Corrispettivi", name: "Abilita Logista" },
    "fingerproductproposemode": { category: "Impronte", name: "Modalità di proposta prodotto con impronta digitale" },
    "Intestazione1": { category: "Scontrino", name: "Scontrino intestazione rigo1" },
    "Intestazione2": { category: "Scontrino", name: "Scontrino intestazione rigo2" },
    "Intestazione3": { category: "Scontrino", name: "Scontrino intestazione rigo3" },
    "Isfiera": { category: "Configurazione", name: "Distributore fiera" },
    "OrarioFineGiorno": { category: "Configurazione", name: "Orario fine profilo giorno" },
    "OrarioInizioGiorno": { category: "Configurazione", name: "Orario inizio profilo giorno" },
    "PolliciDisplay": { category: "Configurazione", name: "Dimensione display" },
    "Reject05": { category: "Configurazione", name: "rifiuto 5 centesimi" },
    "Reject10": { category: "Configurazione", name: "rifiuto 10 centesimi" },
    "Reject20": { category: "Configurazione", name: "rifiuto 20 centesimi" },
    "Reject50": { category: "Configurazione", name: "rifiuto 50 centesimi" },
    "Reject100": { category: "Configurazione", name: "rifiuto 1 euro" },
    "Reject200": { category: "Configurazione", name: "rifiuto 2 euro" },
    "Rejectb5": { category: "Configurazione", name: "rifiuto 5 euro" },
    "Rejectb10": { category: "Configurazione", name: "rifiuto 10 euro" },
    "Rejectb20": { category: "Configurazione", name: "rifiuto 20 euro" },
    "Rejectb50": { category: "Configurazione", name: "rifiuto 50 euro" },
    "NumHopper": { category: "Configurazione", name: "numero hopper" },
    "OnlinieServiceDisabled": { category: "Configurazione", name: "servizio online disabilitato" },
    "LisPrintOnError": { category: "Configurazione", name: "stampa LIS su errore" },
    "SogliaI0mA": { category: "Soglie", name: "soglia corrente I0 [mA]" },
    "SogliaI1mA": { category: "Soglie", name: "soglia corrente I1 [mA]" },
    "SogliaI2mA": { category: "Soglie", name: "soglia corrente I2 [mA]" },
    "TempoCiclo": { category: "Soglie", name: "tempo ciclo massimo [sec]" },
    "IMinimamA": { category: "Soglie", name: "soglia corrente fermo [mA]" },
    "SogliaT1ms": { category: "Soglie", name: "tempo soglia 1 [ms]" },
    "SogliaI0mASpiInt": { category: "Soglie", name: "soglia corrente I0 [mA] per Spirali Interne" },
    "SogliaT1mSSpiInt": { category: "Soglie", name: "tempo soglia 1 [ms] per Spirali Interne" },
    "SogliaT0mSSpiInt": { category: "Soglie", name: "tempo soglia 0 [ms] per Spirali Interne" },
    "SogliaT0mS": { category: "Soglie", name: "tempo soglia 0 [ms] per Spirali Interne" },
    "SogliaI1mASpiInt": { category: "Soglie", name: "soglia corrente I1 [mA] per Spirali Interne" },
    "SogliaI1mASpiExt": { category: "Soglie", name: "soglia corrente I1 [mA] per Spirali Esterne" },
    "SogliaI0mASpiExt": { category: "Soglie", name: "soglia corrente I0 [mA] per Spirali Esterne" },
    "TempoCicloSpiInt": { category: "Soglie", name: "tempo ciclo massimo [sec] per Spirali Interne" },
    "IMinimamASpiInt": { category: "Soglie", name: "soglia corrente fermo [mA] per Spirali Interne" },
    "SogliaT0mSSpiExt": { category: "Soglie", name: "tempo soglia 0 [ms] per Spirali Esterne" },
    "SogliaT1mSSpiExt": { category: "Soglie", name: "tempo soglia 1 [ms] per Spirali Esterne" },
    "TempoCicloSpiExt": { category: "Soglie", name: "tempo ciclo massimo [sec] per Spirali Esterne" },
    "IMinimamASpiExt": { category: "Soglie", name: "soglia corrente fermo [mA] per Spirali Esterne" },
    "TemperaturaFrigoA": { category: "Frigo", name: "temperatura frigo A [°C]" },
    "TemperaturaFrigoB": { category: "Frigo", name: "temperatura frigo B [°C]" },
    "IsteresiFrigoA": { category: "Frigo", name: "isteresi frigo A [°C]" },
    "IsteresiFrigoB": { category: "Frigo", name: "isteresi frigo B [°C]" },
    "FrigoPollTime": { category: "Frigo", name: "tempo campionamento diagnostica frigo [min]" },
    "Video0": { category: "Video", name: "video 0" },
    "Video1": { category: "Video", name: "video 1" },
    "Video2": { category: "Video", name: "video 2" },
    "Video3": { category: "Video", name: "video 3" },
    "Video4": { category: "Video", name: "video 4" },
    "Video5": { category: "Video", name: "video 5" },
    "Video6": { category: "Video", name: "video 6" },
    "VolVideo": { category: "Video", name: "volume video" },
    "FrigoAlarmAHoldoffTime": { category: "Frigo", name: "tempo limite allarme frigo [min]" },
    "FrigoAlarmBHoldoffTime": { category: "Frigo", name: "tempo limite allarme frigo B [min]" },
    "DeltaAlarmFrigoA": { category: "Frigo", name: "limite allarme frigo A [°C]" },
    "DeltaAlarmFrigoB": { category: "Frigo", name: "limite allarme frigo B [°C]" },
    "WebcamModel": { category: "Webcam", name: "modello webcam" },
    "Primaprodotto": { category: "Configurazione", name: "primo prodotto" },
    "SbloccoRRWithMotor": { category: "Configurazione", name: "sblocco RRW con motore" },
    "CreditoMaxCommon": { category: "Configurazione", name: "credito massimo comune" },
    "TitoloSuCategoria": { category: "Configurazione", name: "titolo su categoria" },
    "SatispayCryptedToken": { category: "Satispay", name: "token Satispay" },
    "EnableAudioRepeat": { category: "Audio", name: "abilita ripetizione audio" },
    "TimeAudioRepeat": { category: "Audio", name: "tempo ripetizione audio [sec]" },
    "LabelBlinking": { category: "Configurazione", name: "lampeggio etichetta" },
    "NetPoolEnhanced": { category: "Rete", name: "pooling migliorato" },
    "AmFtpServerName": { category: "Rete", name: "nome server FTP" },
    "AmFtpPortNumber": { category: "Rete", name: "porta FTP" },
    "xBorsellinoValueLimit": { category: "Borsellino", name: "limite valore borsellino" },
    "VolProfiloNotte": { category: "Audio", name: "volume profilo notte" },
    "VolProfiloGiorno": { category: "Audio", name: "volume profilo giorno" },
    "SensTempEnable": { category: "Ingressi-Uscite", name: "abilita sensore temperatura" },
    "sono key SensLuceEnable": { category: "Ingressi-Uscite", name: "abilita sensore luce" },
    "TimeoutVideoStart": { category: "Video", name: "timeout avvio video [sec]" },
    "ContNight": { category: "Configurazione", name: "contatore notte" },
    "LumNight": { category: "Configurazione", name: "luminosità notte" },
    "ContDay": { category: "Configurazione", name: "contatore giorno" },
    "LumDay": { category: "Configurazione", name: "luminosità giorno" },
    "TempoLampadaErogazione": { category: "Configurazione", name: "tempo lampada erogazione [sec]" },
    "OnlineServiceDisabled": { category: "Configurazione", name: "servizio online disabilitato" },
    "SensLuceEnable": { category: "Ingressi-Uscite", name: "abilita sensore luce" },
};

/*
const fingerproductproposemode = {
    0:{name: "Ultimo acquisto"},
    1: {name: "Più acquistato"},
    2: {name: "Non proporre" },
}

const modCorrispettivi = {
    0: { name: "Automatico" },
    1: { name: "Manuale" },
}

const bpParamMappingNew = {
    "BetPassionEnable": { name: "Abilita BetPassion" },
    "BetPassionUsername": { name: "BetPassion Username" },
    "BetPassionCryptedPin": { name: "BetPassion Pin" },
    "BetPassionSatispayEnable": { name: "Abilita pagamenti con Satispay" },
    "BetPassionPosEnable": { name: "Abilita pagamenti con Carte/Bancomat" },
    "BetPassionMaxContantiValue": { name: "BetPassion valore massimo in contanti" },
    "BetPassionMaxVirtualValue": { name: "BetPassion valore massimo in moneta virtuale" },
};
const mpParam={
    "MrPayCryptedPassword": { name: "MrPay Password" },
    "MrPayEnableContiGioco": { name: "Abilita Conti Gioco" },
    "MrPayEnableCarteGioco": { name: "Abilita Carte Gioco" },
    "MrPayEnableGiftCrypto": { name: "Abilita Gift Crypto"},
    "MrPayEnableVendoCrypto": { name: "Abilita Vendo Crypto"},
    "MrPayUserId": { name: "MrPay UserId" },
    "MrPayMaxTaglioValue": { name: "Conti/carte gioco taglio massimo" },
    "MrPayMaxTaglioValueVendoCrypto": { name: "Vendo Crypto taglio massimo" },
    "MrPayMinCartaValue": { name: "Conti/carte gioco taglio minimo con carta" },
    "MrPayMinCartaValueVendoCrypto": { name: "Vendo Crypto taglio minimo con carta" },
    "MrPayWsPassphrase": { name: "MrPay Passphrase" },
    "MrPayWsSuffix": { name: "MrPay Suffix" },
}

const panelBehaviour = {
    0: { name: "Automatico" },
    1: { name: "Manuale" },
}

const prioErog = {
    0: { name: "Rendiresto" },
    1: { name: "Hopper" },
}

const peoplegoneonspeech = {
    0: { name: "Nessuna azione" },
    1: { name: "Va nei pannelli" },
}

const photolevel = {
    0: {name: "Default"},
    1: {name: "Controllo solo spirali"},
    2: {name:"Nessun controllo (disabilitate)"},
}*/
// Definizioni di tipi e interfacce

interface DateTimeObject {
    value: number | string;
    scale: 'DAYS' | 'HOURS' | 'MINUTES' | 'SECONDS' | 'MILLISECONDS';
}

interface FileInfo {
    datetime: Date;
    name: string;
    subcategory: string;
}

interface Translation {
    category: string;
    name: string;
}

interface EnumParam {
    [key: string]: Translation;
}

interface ParamMapping {
    [key: string]: {
        name: string;
    };
}

// Esempio di mappature per bpParam, mpParam, etc.
const bpParamMapping: ParamMapping = {};
const mpParam: ParamMapping = {};
const peoplegoneonspeech: Record<string, string> = {};
const photolevel: Record<string, { name: string }> = {};

// Funzione per convertire l'offset in una data/ora
function convertToDateTime(dateTimeObj: DateTimeObject): Date | string {
    const offset = typeof dateTimeObj.value === 'number' ? dateTimeObj.value : parseFloat(dateTimeObj.value);
    let scaleMultiplier = 1;

    if (offset === -1) return "Orario non settato";

    // Determina il moltiplicatore in base alla scala
    switch (dateTimeObj.scale) {
        case "DAYS":
            scaleMultiplier = 24; // 24 ore in un giorno
            break;
        case "HOURS":
            scaleMultiplier = 1;
            break;
        case "MINUTES":
            scaleMultiplier = 1 / 60; // 60 minuti in un'ora
            break;
        case "SECONDS":
            scaleMultiplier = 1 / 3600; // 3600 secondi in un'ora
            break;
        case "MILLISECONDS":
            scaleMultiplier = 1 / 3600000; // 3600000 millisecondi in un'ora
            break;
        default:
            console.error("Scala non gestita");
            return '';
    }

    // Calcola l'offset in millisecondi e crea la data/ora
    const millisecondsOffset = offset * scaleMultiplier * 3600000; // 3600000 millisecondi in un'ora
    const epochTime = Date.parse("1970-01-01T00:00:00Z"); // Tempo di riferimento (Epoch Unix)
    const resultDate = new Date(epochTime + millisecondsOffset);
    return resultDate;
}

// Funzione per analizzare il timestamp dei video
function parseTimeStampVideo(fileStrings: string[]): FileInfo[] {
    return fileStrings.map(fileString => {
        const filenameParts = fileString.split('-');
        const datetimeString = filenameParts.slice(0, 3).join('-');
        const year = parseInt(datetimeString.slice(0, 4), 10);
        const month = parseInt(datetimeString.slice(4, 6), 10);
        const day = parseInt(datetimeString.slice(6, 8), 10);
        const hour = parseInt(filenameParts[3], 10);
        const minutes = parseInt(filenameParts[4], 10);
        const seconds = parseInt(filenameParts[5], 10);
        const datetime = new Date(Date.UTC(year, month - 1, day, hour, minutes, seconds));
        return {
            datetime,
            name: filenameParts[6],
            subcategory: "videoweek"
        };
    });
}

// Funzione per tradurre un valore singolo
const translateSingleValue = (name: string, value: any, category: string) => ({
    category,
    name,
    value,
});

// Funzione per tradurre un oggetto
const translateObject = (paramValues: any, mapping: ParamMapping, category: string) => {
    const values = Object.keys(paramValues).map(key => {
        const value = paramValues[key];
        const translatedValues = mapping[key];
        if (translatedValues) {
            return {
                name: translatedValues.name,
                value,
            };
        }
        return null;
    }).filter(value => value !== null);
    return { category, value: values };
};

// Funzione principale di traduzione dei parametri
function translateParam(inputObj: any): any {
    const key = Object.keys(inputObj)[0];
    const paramValue = inputObj[key];
    const translation = EnumParam[key];
    const isTranslation = translation !== undefined;

    switch (key.toLowerCase()) {
        case "bpparam":
            return translateObject(paramValue, bpParamMapping, "BetPassion");
        case "intmotlayout":
            return translateSingleValue("Motori", paramValue, "Motori");
        case "erogdevlayout":
            return translateSingleValue("Motori", paramValue, "Motori");
        case "tsparam":
            return translateSingleValue("Pannelli", paramValue, "Pannelli");
        case "hopperparam":
            return translateSingleValue("Hopper", paramValue, "Hopper");
        case "fingerinfo":
            return translateSingleValue("Impronte", paramValue, "Impronte");
        case "moneylineacceptparam":
            return translateSingleValue("Sicurezza Speciale", paramValue, "Sicurezza Speciale");
        case "volumedays":
            return translateSingleValue("Volume", paramValue, "Volume");
        case "orarioiniziogiorno":
            return translateSingleValue("Profilo Inizio Giorno", convertToDateTime(paramValue), "Volume");
        case "orariofinegiorno":
            return translateSingleValue("Profilo Fine Giorno", convertToDateTime(paramValue), "Volume");
        case "videoweek":
            return translateSingleValue("VideoWeek", parseTimeStampVideo(paramValue), "Video");
        case "device":
            return translateSingleValue("Device", paramValue, "Device List");
        case "mpparam":
            return translateObject(paramValue, mpParam, "MrPay");
        case "orarioaccensionedeluxe":
            return translateSingleValue("Orario Accensione Deluxe", convertToDateTime(paramValue), translation?.category ?? "Unknown");
        case "orariospegnimentodeluxe":
            return translateSingleValue("Orario Spegnimento Deluxe", convertToDateTime(paramValue), translation?.category ?? "Unknown");
        case "orarioinviovenditore":
            return translateSingleValue("Orario Invio Venditore", convertToDateTime(paramValue), translation?.category ?? "Unknown");
        case "favorites":
            return translateSingleValue("Favorites", paramValue, "Favorites");
        case "peoplegoneonspeech":
            return translateSingleValue("Comando Vocale", peoplegoneonspeech[paramValue], "Comando Vocale");
        case "vtecontractpackages":
            return translateSingleValue("VTE", paramValue.VTEContractPackages, "VTE");
        case "photolevel":
            return translateSingleValue("Fotocellule", photolevel[paramValue]?.name ?? "Unknown", "Configurazione");
        case "devicetype":
            if (paramValue === "IngenicoIUC160b")
                return translateSingleValue("Ingenico Single IUC160b", inputObj.DevIngenico?.IngenicoParam, "Ingenico Single IUC160b");
            if (paramValue === "IngenicoIUP250")
                return translateSingleValue("Ingenico IUP250", inputObj.DevIngenico?.IngenicoParam, "Ingenico IUP250");
            if (paramValue === "Am_Frigo")
                return translateSingleValue("Frigo", inputObj.AmMocoFrigo?.FrigoParamList, "Frigo");
            if (paramValue === "PaxIM20")
                return translateSingleValue("Pax", inputObj.DevPax?.PaxParam, "Pax");
            break;
        default:
            if (!isTranslation) {
                console.log(inputObj);
                console.log(paramValue);
                console.log("sono key", key);
                return translateSingleValue(key, paramValue, "Undefined");
            }
            return translateSingleValue(translation.name, paramValue, translation.category);
    }
}

export { translateParam, EnumParam };

