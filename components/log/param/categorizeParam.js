
const EnumParam = {

    "Enable": { categoria: "POS", nome: "Abilita Pax" },
    "SpendingDefaultTerminal": { categoria: "POS", nome: "Terminale di default per spending" },
    "EnableCardTransactionMono": { categoria: "POS", nome: "Abilita acquisto prodotti di monopolio" },
    "DisableCardTransactionGv": { categoria: "POS", nome: "Inibisci acquisto Gratta e Vinci" },
    "MincCardTransactionMono": { categoria: "POS", nome: "Importo minimo per acquisto prodotti di monopolio" },
    "MinCardTransactionnonMono": { categoria: "POS", nome: "Importo minimo per acquisto prodotti NON di monopolio" },
    "MaxCardTransaction": { categoria: "POS", nome: "Importo massimo per acquisto prodotti" },
    "LockReceiptPrint": { categoria: "POS", nome: "Rimozione stampa ricevuta transazione" },
    "SerialNumber": { categoria: "POS", nome: "Numero di serie" },
    "TerminalId": { categoria: "POS", nome: "Id terminale" },
    "IpcentroServizi": { categoria: "POS", nome: "Indirizzo ip centro servizi" },
    "PortaCentroServizi": { categoria: "POS", nome: "Porta centro servizi" },
    "IdCertificato": { categoria: "POS", nome: "Id certificato" },
    "CodAzienda": { categoria: "POS", nome: "Codice azienda" },
    "ProtTrasporto": { categoria: "POS", nome: "Protocollo trasporto" },
    "IgnoreTechnicalParameter": { categoria: "POS", nome: "Ignora parametri tecnici" },
    "BillPayment": { categoria: "Funzionalità Aggiuntive", nome: "Abilita Bill Payment" },
    "Spending": { categoria: "Funzionalità Aggiuntive", nome: "Abilita spending" },
    "IdCertificatopax": { categoria: "Certificati", nome: "Id certificato PAX" },
    "TipoCertificato": { categoria: "Certificati", nome: "Tipo certificato" },
    "Idpersonalizzazione": { categoria: "Certificati", nome: "Id personalizzazione PAX" },
    "Personalizzazione": { categoria: "Certificati", nome: "Personalizzazione" },
    "CodicePos": { categoria: "LIS", nome: "Codice POS servizi LIS" },
    "OnlineCryptedPassword": { categoria: "LIS", nome: "PIN servizi LIS" },
    "Onlineservicedisabled": { categoria: "LIS", nome: "Disabilita servizi LIS" },
    "Lisprintonerror": { categoria: "LIS", nome: "Scontrino su transazione fallita LIS" },
    "SatispayEnable": { categoria: "SATISPAY", nome: "Proponi Satispay" },
    "Satispaycryptedtoken": { categoria: "SATISPAY", nome: "Token" },
    "SatispayShortToken": { categoria: "SATISPAY", nome: "Codice di attivazione" },
    "SatispayCryptedKeyId": { categoria: "SATISPAY", nome: "KeyId" },
    "Borsellinoenabled": { categoria: "BORSELLINO", nome: "Abilita borsellino elettronico" },
    "BorsellinoValueLimitCentesimi": { categoria: "BORSELLINO", nome: "Limite borsellino (€)" },
    "AbilitaVenditore2": { categoria: "Parametri Vendita", nome: "Abilita venditore automatico 2.0- funz_venditore "},
    "AbilitaInvioGiorno": { categoria: "Parametri Vendita", nome: "Abilita invio giornaliero" },
    "AbilitaInvioSettimana": { categoria: "Parametri Vendita", nome: "Abilita invio settimanale" },
    "AbilitaInvioMese": { categoria: "Parametri Vendita", nome: "Abilita invio mensile" },
    "OrarioInvioVenditore": { categoria: "Parametri Vendita", nome: "Orario invio" },
    "EsauritoVisibile": { categoria: "Parametri Vendita", nome: "Segnala prodotto esaurito" },
    "TimerProdottoAlternativo": { categoria: "Parametri Vendita", nome: "Tempo prodotto alternativo (sec)" },
    "ProponiAlternativa": { categoria: "Parametri Vendita", nome: "Proponi alternativa su prodotto esaurito - fisarmonica" },
    "Alternativagiocofumo": { categoria: "Parametri Vendita", nome: "Proponi alternativa Tabacco/Gioco" },
    "EnablePromoProximity": { categoria: "Parametri Vendita", nome: "Proponi offerte su presenza cliente - Affaregiorno" },
    "EnableProductAudio": { categoria: "Parametri Vendita", nome: "Riproduci nome prodotto sulla scelta" },
    "EnableScontrinoRicaricabile": { categoria: "SCONTRINO", nome: "Abilita scontrino ricaricabile" },
    "Enablespeechtotext": { categoria: "Comando Vocale", nome: "Abilita comandi vocali" },
    "SpeechPartialResults": { categoria: "Comando Vocale", nome: "Abilita scrittura in tempo reale" },
    "Sttprossimity": { categoria: "Comando Vocale", nome: "Avvia processo su sensore di prossimità" },
    "AudioOnSpeech": { categoria: "Comando Vocale", nome: "Abilita audio su sensore di prossimità" },
    "Speechautostartsecondtime": { categoria: "Comando Vocale", nome: "Abilita avvio automatico dopo risposta" },
    "SpeechTimeoutForVideo": { categoria: "Comando Vocale", nome: "Timeout riavvio video (sec)" },
    "SpeechMaxRetrySilence": { categoria: "Comando Vocale", nome: "Numero tentativi su silenzio" },
    "SpeechMaxRetryBad": { categoria: "Comando Vocale", nome: "Numero tentativi su parola non capita" },
    "SpeechMaxRetryNotInDa": { categoria: "Comando Vocale", nome: "numero tentativi su prodotto non trovato" },
    "Speechoffsetposms": { categoria: "Comando Vocale", nome: "offset positivo avvio servizio (ms)" },
    "Speechoffsetnegms": { categoria: "Comando Vocale", nome: "offset negativo avvio servizio (ms)" },
    "SpeechMinChar": { category: "Parametri Vendita", name: "numero minimo caratteri" },
    "GestionaleCryptedToken": { category: "Gestionale", name: "token gestionale" },
    "TipoGestionale": { category: "Gestionale", name: "marca gestionale" },
    "VideoEnable": { category: "video", name: "abilita video pubblicitari" },
    "EnableVideoBroadcastEst": { category: "video", name: "abilita visual broadcast" },
    "EnableFloorBanner": { category: "video", name: "abilita banner basso" },
    "TempoAlarm": { category: "Parametri Vendita", name: "tempo sirena allarme (sec)" },
    "NumPedate": { category: "Parametri Vendita", name: "numero massimo colpi" },
    "TempoPedate": { category: "Parametri Vendita", name: "tempo filtro colpi (sec)" },
    "SogliaAccelerometro": { category: "Parametri Vendita", name: "soglia accelerometro" },
    "Remotoscassoenabled": { category: "Parametri Vendita", name: "combinatore remoto su sospetto di scasso abilitato" },
    "TempoCombinatoreRemoto": { category: "Parametri Vendita", name: "tempo filtro combinatore remoto (sec)" },
    "DisablePhotoAlarm": { category: "Parametri Vendita", name: "disabilita allarme fotocellule" },
    "email1": { category: "Parametri Vendita", name: "email 1" },
    "email2": { category: "Parametri Vendita", name: "email 2" },
    "Email3": { category: "Parametri Vendita", name: "email 3" },
    "Email4": { category: "Parametri Vendita", name: "email 4" },
    "AutoPricesEnabled": { category: "Parametri Vendita", name: "abilita prezzi automatici" },
    "Reversepanelorder": { category: "Parametri Vendita", name: "inverti ordine pannelli" },
    "NetflixSound": { category: "Parametri Vendita", name: "abilita suono di benvenuto" },
    "CheckExitProg": { category: "Parametri Vendita", name: "autodiagnosi: verifica errori su chiusura porta" },
    "AudioOnInput": { category: "Parametri Vendita", name: "abilita audio su cambio stato sensori", "function": "funz_autodiagnosi" },
    "AudioMicroProduct": { category: "Parametri Vendita", name: "abilita colonna parlante", "function": "funz_colparlante" },
    "Disablecarrello": { category: "Parametri Vendita", name: "disabilita proposta prodotti a fine vendita (carrello)" },

    "RestoMaxCommon": {category: "Parametri Vendita", name: "resto massimo comune"},
    "TempoAcquistoCommon": {category: "Parametri Vendita", name: "tempo accettazione denaro (sec)"},
    "TimerSceltaProdotto": {category: "Parametri Vendita", name: "tempo scelta prodotto (sec)"},
    "TimerConvalidaEta": {category: "Parametri Vendita", name: "tempo convalida età (sec)"},
    "TimerConfermaProdotto": {category: "Parametri Vendita", name: "tempo conferma prodotto (sec)"},
    "TimerMetodiPagamento": {category: "Parametri Vendita", name: "tempo scelta metodo di pagamento (sec)"},
    "TimerComeProseguire": {category: "Parametri Vendita", name: "tempo scelta come proseguire (sec)"},
    "Delayerogazioneprodotto": {category: "Parametri Vendita", name: "ritardo erogazione prodotto (sec)"},
    "Azione1": {category: "Parametri Vendita", name: "scontrino azione riga 1"},
    "Azione2": {category: "Parametri Vendita", name: "scontrino azione riga 2"},
    "Azione3": {category: "Parametri Vendita", name: "scontrino azione riga 3"},
    "ScontrinoNote1": {category: "Scontrino", name: "scontrino note riga 1"},
    "ScontrinoNote2": {category: "Scontrino", name: "scontrino note riga 2"},
    "ScontrinoNote3": {category: "Scontrino", name: "scontrino note riga 3"},
    "Righeavanzamentocarta": {category: "Parametri Vendita", name: "righe avanzamento carta"},
    "Tg2460jamdelay": {category: "Parametri Vendita", name: "tg2460: ritardo filtro jam (sec)"},
    "Excludetg2460antijam": {category: "Parametri Vendita", name: "tg2460: esclusione movimento jam"},
    "Tg2460recuperocartaimmediato": {category: "Parametri Vendita", name: "tg2460: recupero carta immediato"},
    "PwdProgrammazione": {category: "Parametri Vendita", name: "password accesso programmazione"},
    "IDImprontaSpeciale1": {category: "Parametri Vendita", name: "id impronta speciale 1"},
    "IDImprontaSpeciale2": {category: "Parametri Vendita", name: "id impronta speciale 2"},
    "IDImprontaSpeciale3": {category: "Parametri Vendita", name: "id impronta speciale 3"},
    "IDImprontaSpeciale4": {category: "Parametri Vendita", name: "id impronta speciale 4"},
    "Idimprontaspeciale5": {category: "Parametri Vendita", name: "id impronta speciale 5"},
    "Idimprontaspecialedip1": {category: "Parametri Vendita", name: "id impronta speciale dipendente 1"},
    "Idimprontaspecialedip2": {category: "Parametri Vendita", name: "id impronta speciale dipendente 2"},
    "Idimprontaspecialedip3": {category: "Parametri Vendita", name: "id impronta speciale dipendente 3"},
    "Idimprontaspecialedip4": {category: "Parametri Vendita", name: "id impronta speciale dipendente 4"},
    "Idimprontaspecialedip5": {category: "Parametri Vendita", name: "id impronta speciale dipendente 5"},
    "QrImageFile" :{category: "Parametri Vendita", name: "file immagine QR"},
    "Cfspeciale1": {category: "Parametri Vendita", name: "tessera speciale 1"},
    "Cfspeciale2": {category: "Parametri Vendita", name: "tessera speciale 2"},
    "Cfspeciale3": {category: "Parametri Vendita", name: "tessera speciale 3"},
    "Cfspeciale4": {category: "Parametri Vendita", name: "tessera speciale 4"},
    "Cfspeciale5": {category: "Parametri Vendita", name: "tessera speciale 5"},
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
    "GatewayAddress": { category: "Rete", name: "Indirizzo gateway per IP statico" },
    "DnsPrimary": { category: "Rete", name: "DNS primario per IP statico" },
    "DnsSecondary": { category: "Rete", name: "DNS secondario per IP statico" },
    "FtpUrl": { category: "Rete", name: "URL connessione FTP" },
    "FtpPort": { category: "Rete", name: "Porta connessione FTP" },
    "Enablebrightnessdaynight": { category: "DISPLAY", name: "Abilita gestione luminosità" },
    "LumProfiloGiorno": { category: "DISPLAY", name: "Luminosità profilo giorno" },
    "LumProfiloNotte": { category: "DISPLAY", name: "Luminosità profilo notte" },
    "Inviocorrispettivomode": { category: "Corrispettivi", name: "Modalità di invio corrispettivo" },
    "AdeUniqueId": { category: "Corrispettivi", name: "Codice univoco" },
    "AdeLat": { category: "Corrispettivi", name: "Latitudine" },
    "AdeLon": { category: "Corrispettivi", name: "Longitudine" },
    "LookappUrl": { category: "Corrispettivi", name: "URL Web Services" },

    "FingerEnabled": { category: "Parametri Vendita", name: "Abilita impronta digitale" },
    "Fingerproductproposedmode": { category: "Parametri Vendita", name: "Modalità di proposta prodotto con impronta digitale" },
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

    "EnergySaving": { category: "energy", name: "Abilita risparmio energetico" },
    "Defaultvendlanguage": { category: "Lingua", name: "Lingua base di vendita" },
    "LogistaAbil": { category: "Corrispettivi", name: "Abilita Logista" },
    //"fingerproductproposemode": { category: "Impronte", name: "Modalità di proposta prodotto con impronta digitale" },
    "Intestazione1": { category: "Scontrino", name: "Scontrino intestazione rigo1" },
    "Intestazione2": { category: "Scontrino", name: "Scontrino intestazione rigo2" },
    "Intestazione3": { category: "Scontrino", name: "Scontrino intestazione rigo3" },
    "Isfiera": { category: "Parametri Vendita", name: "Distributore fiera" },
    "OrarioFineGiorno": { category: "Parametri Vendita", name: "Orario fine profilo giorno" },
    "OrarioInizioGiorno": { category: "Parametri Vendita", name: "Orario inizio profilo giorno" },
    "PolliciDisplay": { category: "Parametri Vendita", name: "Dimensione display" },
    "Reject05": { category: "Parametri Vendita", name: "rifiuto 5 centesimi" },
    "Reject10": { category: "Parametri Vendita", name: "rifiuto 10 centesimi" },
    "Reject20": { category: "Parametri Vendita", name: "rifiuto 20 centesimi" },
    "Reject50": { category: "Parametri Vendita", name: "rifiuto 50 centesimi" },
    "Reject100": { category: "Parametri Vendita", name: "rifiuto 1 euro" },
    "Reject200": { category: "Parametri Vendita", name: "rifiuto 2 euro" },
    "Rejectb5": { category: "Parametri Vendita", name: "rifiuto 5 euro" },
    "Rejectb10": { category: "Parametri Vendita", name: "rifiuto 10 euro" },
    "Rejectb20": { category: "Parametri Vendita", name: "rifiuto 20 euro" },
    "Rejectb50": { category: "Parametri Vendita", name: "rifiuto 50 euro" },
};

const fingerproductproposemode = {
    0:{name: "Ultimo acquisto"},
    1: {name: "Più acquistato"},
    2: {name: "Non proporre" },
}

const modCorrispettivi = {
    0: { name: "Automatico" },
    1: { name: "Manuale" },
}

const bpParam={
    "betpassionenable": {  name: "Abilita BetPassion" },
    "betpassionusername": { name: "BetPassion Username" },
    "betpassioncryptedpin": {  name: "BetPassion Pin" },
    "BetPassionSatispayEnable": { name: "Abilita pagamenti con Satispay" },
    "BetPassionPosEnable": {  name: "Abilita pagamenti con Carte/Bancomat" },
    "BetPassionMaxContantiValue": { name: "BetPassion valore massimo in contanti" },
    "BetPassionMaxVirtualValue": {  name: "BetPassion valore massimo in moneta virtuale" },
}

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
}

function convertToDateTime(dateTimeObj) {
    const offset = dateTimeObj.value;
    let scaleMultiplier = 1;

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
            return null;
    }

    // Calcola l'offset in millisecondi e crea la data/ora
    const millisecondsOffset = offset * scaleMultiplier * 3600000; // 3600000 millisecondi in un'ora
    const epochTime = Date.parse("1970-01-01T00:00:00Z"); // Tempo di riferimento (Epoch Unix)
    const resultDate = new Date(epochTime + millisecondsOffset);
    return resultDate;
}


function translateParam(inputObj) {

    const key = Object.keys(inputObj)[0];
    const mainObject = inputObj[key];
    const translation = EnumParam[key];
    let values=[];

    if (inputObj["BpParam"]) {
        for (const key of Object.keys(mainObject)) {
            values.push({
                name: bpParam[key].name,
                value: mainObject[key]
            });
        }
        return {
            category: "BETPASSION",
            value: values,
        };
    }

    if (inputObj["mpparam"]) {
        for (const key of Object.keys(mainObject)) {
            values.push({
                name: mpParam[key].name,
                value: mainObject[key]
            });
        }
        return {
            category: "MRPAY",
            value: values,
        };
    }

    if (inputObj["Device"]) {
        for (const key of Object.keys(mainObject)) {
            const value = mainObject[key];

            const canale = value.Channel !== undefined ? value.Channel : "";
            const seriale = value.DevSerialID !== undefined ? value.DevSerialID : "";

            if (value.DeviceType === "Am_Frigo") {
                const frigoParam = value.AmMocoFrigo.FrigoParamList;
                values.push({
                    name: value.DeviceType,
                    canale: canale,
                    qt: value.Molteplicity,
                    seriale: seriale,
                    params: frigoParam
                });
            }
            else {
                values.push({
                    name: value.DeviceType,
                    canale: canale,
                    qt: value.Molteplicity,
                    seriale: seriale,
                });
            }
        }
        return {
            category: "DEVICES",
            value: values,
        };
    }
    if (inputObj["FingerInfo"]) {
        for (const key of Object.keys(mainObject)) {
            const value = mainObject[key];
            values.push({
                qualita: value.EnrolledQuality,
                id: value.FingerID,
                cf: value.PeopleID,
                abilitato: value.BorsellinoEnabled,
            });
        }
        return {
            category: "Impronte",
            value: values,
        };
    }
    if (inputObj["ErogDevLayout"]) {
        for (const key of Object.keys(mainObject)) {
            const value = mainObject[key];
            const ingresso = value.InOutNumBase0 !== undefined ? value.InOutNumBase0+1 : 1;
            const capacity = value.TErogMotori !== undefined ? value.TErogMotori.Capacity : 0;
            values.push({
                tipo: value.ErogDevType,
                ingresso: ingresso,
                Name: value.Name,
                productCode: value.ProductCode,
                Capacity: capacity,
            });
        }
        return {
            category: "Motori",
            value: values,
        };
    }

    if (inputObj["fingerproductproposemode"]) {
        const value = mainObject[key];
        return {
            category: "Impronte",
            name: "Modalità di proposta prodotto con impronta digitale",
            value: fingerproductproposemode[value],
        };
    }

    if (inputObj["MoneyLineAcceptParam"]) {
        for (const key of Object.keys(mainObject)) {
            const value = mainObject[key];
            values.push({
                gestione_a_tempo: value.TimeFeatureEnabled,
                Valore_taglio: value.LineValue,
                Numero_pezzi: value.PcsFilterLimit,
                Tempo_filtro_media_mobile_min: value.WindowFilter,
                Tempo_blocco_min: value.TimeDisable,
            });
        }
        return {
            category: "Sicurezza Speciale",
            value: values,
        };
    }

    if (inputObj["HopperParam"]) {
        for (const key of Object.keys(mainObject)) {
            const value = mainObject[key];
            const ingresso = value.InOutNumBase0 !== undefined ? value.InOutNumBase0+1 : 1;
            values.push({
                name: value.Name,
                canale_smistamento: value.CoinSorter,
                ingresso: ingresso,
                Valore_moneta:value.CoinValue,
            });
        }
        return {
            category: "Hopper",
            value: values,
        };
    }

    if (inputObj["TsParam"]) {
        for (const key of Object.keys(mainObject)) {
            const value = mainObject[key];
            const visibile = value.Visibile !== undefined ?  value.Visibile : false;
            values.push({
                Name: value.Name,
                numero_massimo: value.NumMaxItem,
                visibile: visibile
            });
        }
        return {
            category: "Pannelli",
            value: values,
        };
    }

    if (inputObj["VTEContractPackages"]) {
        for (const key of Object.keys(mainObject)) {
            const value = mainObject[key];
            values.push({
                Name: value.name,
                inizio: value.datastart,
                fine: value.dataend,
            });
        }
        return {
            category: "VTE",
            value: values,
        };
    }

    if (inputObj["VolumeDays"]) {
        for (const key of Object.keys(mainObject)) {
            const value = mainObject[key];
            values.push({
                giorno: value.Day,
                volume_giorno: value.VolProfiloGiorno,
                volume_notte: value.VolProfiloNotte,
            });
        }
        return {
            category: "Volume",
            value: values,
        };
    }

    if (inputObj["OrarioAccensioneDeluxe"] || inputObj["OrarioFineGiorno"] || inputObj["OrarioInizioGiorno"] || inputObj["OrarioInvioVenditore"] || inputObj["OrarioSpegnimentoDeluxe"]) {
        const orario = mainObject.value === "-1" ? "Orario non settato" : convertToDateTime(mainObject);
        return {
            category: translation.category,
            value: orario,
        };
    }

    if (inputObj["InvioCorrispettiviMode"]) {
        const value = mainObject[key];
        return {
            category: "Corrispettivi",
            name: "Modalita di invio corrispettivo",
            value: panelBehaviour[value],
        };
    }

    if (inputObj["lampadadeluxeworkmode"]) {
        const value = mainObject[key];
        return {
            category: "Parametri Vendita",
            name: "comportamento pannello",
            value: modCorrispettivi[value],
        };
    }

    if (inputObj["moderesto"]) {
        const value = mainObject[key];
        return {
            category: "Parametri Vendita",
            name: "priorità erogatori resto",
            value: prioErog[value],
        };
    }


    if (inputObj["peoplegoneonspeech"]) {
        const value = mainObject[key];
        return {
            category: "Comando Vocale",
            name: "comportamento su persona che va via",
            value: peoplegoneonspeech[value],
        };
    }

    if (inputObj["PhotoLevel"]) {
        return {
            category: "Fotocellule",
            name: "livello fotocellule",
            value: photolevel[inputObj.PhotoLevel].name,
        };

    }


    if (!translation) {
        return null;
    }
    return {
        category: translation.category,
        name: translation.name,
        value: mainObject,
    };
};

export{ translateParam, EnumParam };